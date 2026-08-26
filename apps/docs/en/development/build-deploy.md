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

Production builds do not register the Mock Server. Before deployment, you must provide real login, dynamic route, and dashboard APIs; otherwise the application cannot finish starting.

## CI notes

The repository's current `.github/workflows` files are still legacy configurations with the following inconsistencies:

- They use Node 18, which does not satisfy the current engine.
- They invoke the removed root script `build:pro`.
- They publish the root `dist-pro`, while the actual output is under `apps/admin/dist-pro`.

Do not reuse them as-is. A corrected pipeline should use the current Node engine and pnpm 9, and run at least:

```bash
pnpm install --frozen-lockfile
pnpm typecheck:admin
pnpm lint
pnpm build:admin
pnpm build:docs
```

Upload the Admin and documentation output directories separately.

## Release checklist

- Base path, API address, and title are correct in the environment files.
- The dynamic route API follows its contract for both unauthenticated and authenticated states.
- Every route icon used by the current app is registered.
- The login page, dashboard, and nested menu routes work after a direct refresh.
- Light and dark modes, language switching, and all four layouts work correctly.
- Both desktop and mobile widths below 768px have been verified.
- Source maps are not accidentally published to a public environment.
