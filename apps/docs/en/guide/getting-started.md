# Getting Started

## Requirements

- Node.js: `^20.19.0`, `^22.13.0`, or `>=24.0.0`
- pnpm: `>=9.5.0`
- Git: required to fetch the source and run Husky

The repository pins the pnpm major version through `packageManager`. If Corepack is enabled, run:

```bash
corepack enable
corepack prepare pnpm@9.15.3 --activate
```

## Clone and install

```bash
git clone --branch v3 --single-branch https://github.com/kailong321200875/vue-element-plus-admin.git
cd vue-element-plus-admin
pnpm install
```

Keep `pnpm-lock.yaml` under version control. If installation fails, first check your Node version, pnpm version, and network environment. Do not treat deleting the lockfile as the default fix.

## Start Admin

Run the following command from the repository root:

```bash
pnpm dev:admin
```

The default URL is `http://localhost:4000/`. Sign in with:

```text
Username: admin
Password: admin
```

If the port is already in use, Vite selects the next available port. Use the URL shown in the terminal.

## Start the documentation

```bash
pnpm dev:docs
```

The default URL is `http://localhost:4002/`. The documentation and Admin are independent workspaces and can run at the same time.

## Common commands

| Command                 | Description                                  |
| ----------------------- | -------------------------------------------- |
| `pnpm dev:admin`        | Start the Admin development server           |
| `pnpm build:admin`      | Build the production version                 |
| `pnpm build:admin:dev`  | Build with development environment variables |
| `pnpm build:admin:test` | Build with test environment variables        |
| `pnpm preview:admin`    | Preview the Admin production build           |
| `pnpm typecheck:admin`  | Run Vue and TypeScript type checking         |
| `pnpm dev:docs`         | Start the documentation site                 |
| `pnpm build:docs`       | Build the documentation site                 |
| `pnpm preview:docs`     | Preview the documentation build              |
| `pnpm lint`             | Check the entire workspace with Oxlint       |

## First-run checklist

After signing in, verify the following behavior:

1. The dashboard and nested menus are both generated from the dynamic route API.
2. Refreshing a nested-menu page does not redirect to a 404 page.
3. All four layouts can be selected, while mobile devices display only the sidebar layout.
4. Language changes take effect immediately without a refresh.
5. Light and dark theme preferences are persisted.
6. TagsView refresh, close, and pinned-tab behavior all work correctly.

## Recommended IDE setup

Use VS Code or a compatible editor with the following extensions:

- Vue - Official
- UnoCSS
- i18n Ally
- Prettier
- Stylelint
- DotENV

Oxlint runs from the command line and through Git Hooks, so the project does not need to maintain an additional ESLint configuration.

## Next steps

- To understand the code boundaries, read [Project Structure and Architecture](/en/guide/architecture).
- To connect a backend, read [Request Management](/en/core/request) and [Mocking and API Integration](/en/development/mock).
- To configure menus, read [Dynamic Routing and Permissions](/en/core/dynamic-routing).
