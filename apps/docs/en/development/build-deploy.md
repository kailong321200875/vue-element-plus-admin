# Build and deployment

Admin and the documentation site are independent applications. They are built and deployed separately.

## Build Admin

```bash
pnpm build:admin
```

The default build uses `pro` mode and writes output to:

```text
apps/admin/dist-pro
```

Other build commands:

```bash
pnpm build:admin:dev   # apps/admin/dist-dev
pnpm build:admin:test  # apps/admin/dist-test
pnpm preview:admin     # Preview the pro build locally
```

Run at least the following checks before building:

```bash
pnpm typecheck:admin
pnpm lint
```

## Build the documentation

```bash
pnpm build:docs
pnpm preview:docs
```

Documentation output is written to:

```text
apps/docs/.vitepress/dist
```

The site uses VitePress's built-in local search and does not depend on an external search service.

The documentation configuration currently targets the domain root. When deploying under a subpath such as `/vue-element-plus-admin/`, also configure it in `.vitepress/config.ts`:

```ts
export default defineConfig({
  base: '/vue-element-plus-admin/'
})
```

Rebuild after changing it. The documentation's VitePress `base` and Admin's `VITE_BASE_PATH` are independent settings.

## Deploy Admin as static files

Admin uses Hash History, so a business URL looks like:

```text
https://example.com/#/dashboard/analysis
```

The hash is not sent to the server, so ordinary static hosting does not usually need a history fallback for business routes. The server only needs to serve `index.html` and static assets correctly.

Minimal Nginx example:

```nginx
server {
  listen 80;
  server_name example.com;
  root /srv/element-admin;
  index index.html;

  location / {
    try_files $uri $uri/ /index.html;
  }

  location /api/ {
    proxy_pass http://backend/;
    proxy_set_header Host $host;
    proxy_set_header X-Real-IP $remote_addr;
  }
}
```

Although Hash Router does not depend on a fallback, keeping the `index.html` fallback can support other site paths. If the server hosts other applications, narrow the `location` scope to the actual deployment path.

## Deploy under a subdirectory

When publishing to `https://example.com/admin/`, set:

```dotenv
VITE_BASE_PATH=/admin/
```

Then rebuild. An absolute site subpath should begin and end with `/`, otherwise static asset URLs are likely to be incorrect. Vite also supports `./` and complete CDN URLs; choose the value that matches the deployment method.

Use a same-origin prefix for the API when possible:

```dotenv
VITE_API_BASE_PATH=/api
```

Let the production gateway proxy `/api` to the backend. The frontend does not need to store the real service address, and browser CORS configuration is avoided.

## Build optimization

The current configuration includes:

- Pages are split by route through dynamic imports, while Vite/Rollup handles automatic chunking of third-party dependencies.
- ECharts modules are registered on demand.
- Icons are imported statically through an app-level allowlist.
- Environment variables control CSS splitting and source maps.

The template does not maintain a fixed `manualChunks` map. This prevents dependency upgrades or module-boundary changes from creating a giant common bundle or circular chunks. When bundle size looks abnormal, inspect build output and the real import graph instead of removing capabilities based only on dependency names.

## Mock and production

When `VITE_USE_MOCK=true`, the production build includes browser-side mocks. The static site can therefore demonstrate login, dynamic routes, and the dashboard without a backend.

Real applications should set `VITE_USE_MOCK=false` and connect to their API through `VITE_API_BASE_PATH` and the deployment gateway. Environment variables are embedded at build time, so rebuild after changing them.

## Recommended deployment architecture

v3 uses one release workflow and two independent Cloudflare Pages projects:

```text
Feature PR -> GitHub CI -> release
                         └─ Release Please PR
                            └─ GitHub Release
                               ├─ Admin Deploy Hook -> element-plus-admin.cn
                               └─ Docs Deploy Hook  -> docs.element-plus-admin.cn
```

GitHub Actions handles installation, linting, type checking, package tests, and both application builds on feature pull requests. After business code enters `release`, Release Please only creates or updates its Release PR. Production builds are triggered through two Deploy Hooks only after that Release PR is merged and the GitHub Release is created. Changelog preparation and publication remain separate stages, while the production sites build only once.

The root `.node-version` pins Node.js `22.19.0`, while `package.json` pins pnpm `9.15.3`. Cloudflare Pages Build System v3 does not infer the package-manager version from `package.json`, so set this environment variable on both projects:

```text
PNPM_VERSION=9.15.3
```

## Create the Cloudflare Pages projects

In Cloudflare **Workers & Pages**, choose **Create application > Pages > Import an existing Git repository**. Import the same GitHub repository twice with these settings:

| Setting              | Admin                            | Docs                             |
| -------------------- | -------------------------------- | -------------------------------- |
| Project name         | `element-plus-admin`             | `element-plus-admin-docs`        |
| Production branch    | `release`                        | `release`                        |
| Framework preset     | `None`                           | `None`                           |
| Root directory       | Leave empty; use repository root | Leave empty; use repository root |
| Build command        | `pnpm build:admin`               | `pnpm build:docs`                |
| Output directory     | `apps/admin/dist-pro`            | `apps/docs/.vitepress/dist`      |
| Environment variable | `PNPM_VERSION=9.15.3`            | `PNPM_VERSION=9.15.3`            |

Do not set Root directory to `apps/admin` or `apps/docs`. Both applications depend on the root lockfile and workspace configuration, and Admin also consumes `packages/*`.

After the first successful builds, bind these domains under each project's **Custom domains** page:

- Admin: `element-plus-admin.cn`
- Docs: `docs.element-plus-admin.cn`

The apex domain `element-plus-admin.cn` must be managed as a Cloudflare Zone and use Cloudflare nameservers. Pages creates the `docs` DNS record automatically when the zone is in the same account. With an external DNS provider, associate the subdomain in Pages first and then add the prompted CNAME pointing to `<project>.pages.dev`.

## Configure production Deploy Hooks

For both Pages projects, open **Settings > Builds > Branch control**:

- Turn off **Enable automatic production branch deployments**.
- Set **Preview branch** to `None`.

Then create a Deploy Hook named `github-release` for the `release` branch under **Settings > Builds > Deploy Hooks** in each project. Save the two URLs as GitHub Actions Secrets:

- `CLOUDFLARE_ADMIN_DEPLOY_HOOK`
- `CLOUDFLARE_DOCS_DEPLOY_HOOK`

A Deploy Hook URL is itself a credential. It does not require a separate Cloudflare API token and must not be committed or printed in logs.

In the GitHub repository, enable **Allow GitHub Actions to create and approve pull requests** under **Settings > Actions > General > Workflow permissions**. Release Please cannot create its Release PR without this setting.

## GitHub Actions verification

`.github/workflows/ci.yml` runs automatically only for pull requests targeting `release`, and it also supports manual runs:

```bash
pnpm install --frozen-lockfile
pnpm lint
pnpm typecheck:admin
pnpm --filter @vea/hooks test
pnpm --filter @vea/request test
pnpm build:admin
pnpm build:docs
```

Release Please uses the repository's built-in `GITHUB_TOKEN`, so creating or updating its Release PR does not recursively start CI. The generated PR contains only version, manifest, and Changelog changes. If `release` requires `Verify workspace`, configure a ruleset bypass for the GitHub Actions bot or run CI manually on the Release PR branch.

## Changelog and releases

`.github/workflows/release.yml` uses Release Please v4 and reads its settings from:

- `release-please-config.json` for release strategy, tags, and Changelog sections.
- `.release-please-manifest.json` for the current released version.

The current baseline is `2.10.0`. Because the v3 history contains a breaking change, the next Release PR will target `3.0.0`. The Admin and Docs Deploy Hooks run in parallel only when merging the Release PR produces `release_created=true`.

## Releases and rollback

Merging a business pull request into `release` does not publish either site. Admin and Docs are published together only after the generated Release PR is merged. Every Cloudflare Pages deployment is an isolated version, so a failed release can be rolled back to the previous successful deployment from the project's Deployments page.

## Release checklist

- Base path, API address, and title are correct in the environment files.
- The dynamic route API follows its contract for both unauthenticated and authenticated states.
- Every route icon used by the current app is registered.
- The login page, dashboard, and nested menu routes work after a direct refresh.
- Light and dark modes, language switching, and all four layouts work correctly.
- Both desktop and mobile widths below 768px have been verified.
- Source maps are not accidentally published to a public environment.
