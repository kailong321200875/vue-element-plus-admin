<div align="center">
  <a href="https://github.com/kailong321200875/vue-element-plus-admin">
    <img width="96" src="./apps/admin/public/logo.png" alt="ElementAdmin logo">
  </a>

  <h1>ElementAdmin v3</h1>

  <p>A lean, extensible Vue 3 admin starter for real-world applications.</p>

[![CI](https://github.com/kailong321200875/vue-element-plus-admin/actions/workflows/ci.yml/badge.svg?branch=release)](https://github.com/kailong321200875/vue-element-plus-admin/actions/workflows/ci.yml) [![license](https://img.shields.io/github/license/kailong321200875/vue-element-plus-admin.svg)](./LICENSE) [![last commit](https://img.shields.io/github/last-commit/kailong321200875/vue-element-plus-admin.svg)](https://github.com/kailong321200875/vue-element-plus-admin/commits/v3) [![stars](https://img.shields.io/github/stars/kailong321200875/vue-element-plus-admin.svg)](https://github.com/kailong321200875/vue-element-plus-admin/stargazers)
</div>

**English** | [中文](./README.zh-CN.md)

## About v3

ElementAdmin v3 is a Vue 3 and Element Plus admin template focused on stable infrastructure rather than a large collection of demo pages. It keeps the capabilities most admin applications need—session recovery, server-driven routes, layouts, TagsView, requests, forms, CRUD state, themes and internationalization—while leaving business UI and domain models to each application.

The repository uses a pnpm workspace. Shared, application-independent capabilities live in `packages`, so future applications can reuse them without importing Admin-specific routes, stores or assets.

## Highlights

- **Server-driven routes**: business routes come from the API and are registered at runtime; no second frontend role-filtered route table.
- **Four layouts**: classic sidebar, top navigation, mixed navigation and dual sidebar, all driven by the same route tree.
- **Responsive shell**: desktop layouts automatically fall back to a mobile sidebar below 768px.
- **Focused packages**: reusable components, CRUD/Form hooks, request client and theme variables have explicit boundaries.
- **Offline icons**: each app statically registers only the Iconify icons it uses; production does not depend on a CDN.
- **Instant locale and theme switching**: Vue I18n, Element Plus, document language and persisted state stay synchronized.
- **Lean UI layer**: no BaseButton or configuration-heavy Table/Search/Dialog/Detail wrappers.
- **Independent documentation app**: VitePress documentation with responsive design, dark mode and local search.

## Tech stack

- Vue 3.5
- Vite 8
- TypeScript
- Element Plus 2
- Vue Router 5
- Pinia 4
- Vue I18n 11
- UnoCSS
- Axios
- ECharts 6
- VitePress 1
- Oxlint, Prettier and Stylelint

## Workspace

```text
apps/
├─ admin/          Admin application
└─ docs/           v3 documentation

packages/
├─ components/     Small cross-app UI primitives
├─ hooks/          UI-independent useCrud and useForm
├─ request/        Business-independent Axios client
└─ styles/         Shared reset and theme variables
```

The packages currently export workspace source code and are compiled by each Vite application. They are not prebuilt npm packages.

## Requirements

- Node.js `^20.19.0 || ^22.13.0 || >=24.0.0`
- pnpm `>=9.5.0` (`pnpm@9.15.3` is pinned by the repository)
- Git

## Quick start

```bash
git clone --branch v3 --single-branch https://github.com/kailong321200875/vue-element-plus-admin.git
cd vue-element-plus-admin
pnpm install
pnpm dev:admin
```

Admin runs at `http://localhost:4000/` by default.

```text
username: admin
password: admin
```

The built-in Mock API runs through the development mock server locally. When `VITE_USE_MOCK=true`, production builds include the browser-side mock adapter as well, so the static demo remains fully usable without a backend.

## Commands

| Command                 | Description                            |
| ----------------------- | -------------------------------------- |
| `pnpm dev:admin`        | Start the Admin development server     |
| `pnpm build:admin`      | Build Admin with the production mode   |
| `pnpm build:admin:dev`  | Build Admin with development variables |
| `pnpm build:admin:test` | Build Admin with test variables        |
| `pnpm preview:admin`    | Preview the Admin production build     |
| `pnpm typecheck:admin`  | Run Vue and TypeScript type checking   |
| `pnpm dev:docs`         | Start the documentation app            |
| `pnpm build:docs`       | Build the documentation app            |
| `pnpm preview:docs`     | Preview the documentation build        |
| `pnpm lint`             | Run Oxlint across the workspace        |

Package tests:

```bash
pnpm --filter @vea/hooks test
pnpm --filter @vea/request test
```

## Documentation

- Online demo: [element-plus-admin.cn](https://element-plus-admin.cn/)
- v3 documentation: [docs.element-plus-admin.cn](https://docs.element-plus-admin.cn/)

Start the v3 documentation locally:

```bash
pnpm dev:docs
```

It runs at `http://localhost:4002/` by default.

- [Getting started](./apps/docs/guide/getting-started.md)
- [Architecture](./apps/docs/guide/architecture.md)
- [Dynamic routing](./apps/docs/core/dynamic-routing.md)
- [Request management](./apps/docs/core/request.md)
- [CRUD](./apps/docs/capabilities/crud.md)
- [Forms](./apps/docs/capabilities/form.md)
- [Build and deployment](./apps/docs/development/build-deploy.md)

The former site at [element-plus-admin-doc.cn](https://element-plus-admin-doc.cn/) documents the legacy architecture. New projects should use the v3 documentation and current branch code.

## Dynamic route contract

Only the root layout, login, redirect and error shell routes are static. After authentication, the API returns the complete route tree available to the current user.

| `component` value          | Meaning                              |
| -------------------------- | ------------------------------------ |
| `#`                        | Admin Layout                         |
| `##`                       | Route group without a page component |
| `views/Dashboard/Analysis` | Page under `apps/admin/src/views`    |

Route icons must be registered by the consuming app, and route names must be globally unique.

## Development conventions

- Put business APIs and models in `apps/admin`; shared packages must not import application code.
- Add code to `packages` only after it has a stable, application-independent contract.
- Import Element Plus components explicitly; component styles are added on demand during the build.
- Use Oxlint instead of adding ESLint configuration.
- Keep route metadata, locale keys and the app icon registry synchronized with the backend route contract.

Commits are checked by Husky, vue-tsc, lint-staged and Commitlint. Conventional Commit examples:

```text
feat: add user management
fix: resolve dynamic route refresh
docs: update deployment guide
refactor: simplify request client
```

## Contributing

Issues and pull requests are welcome.

1. Fork the repository.
2. Create a branch: `git checkout -b feat/your-feature`.
3. Commit your changes using a Conventional Commit message.
4. Push the branch and open a pull request against `master`.

See the [change log](./CHANGELOG.md) for project history.

## Browser support

Modern browsers are supported. Internet Explorer is not supported.

## Sponsor

If this project helps you, sponsorship is welcome.

[PayPal](https://www.paypal.com/paypalme/ckl94)

<img width="240" src="https://github.com/kailong321200875/my-image/raw/master/pay.jpg" alt="Sponsor QR code">

## License

[MIT](./LICENSE)
