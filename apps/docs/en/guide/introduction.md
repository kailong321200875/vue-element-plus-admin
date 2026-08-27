# Introduction

ElementAdmin v3 is a Vue admin template designed for further development. It keeps the runtime foundation that admin projects commonly need, while leaving presentation components, page examples, and domain logic—which vary significantly between products—to each application.

## Positioning

v3 addresses four categories of stable concerns:

- Establishing, restoring, and ending login sessions.
- Server-driven dynamic routes, menus, and access control.
- Four desktop layouts with mobile adaptation.
- Shared Request, CRUD, form, icon, and styling foundations for multiple applications.

It is not a low-code platform, nor does it attempt to describe every table, dialog, and detail page with a single schema. Building business pages directly with Vue and Element Plus is usually easier to understand and maintain.

## Technology stack

| Area                 | Solution                                                       |
| -------------------- | -------------------------------------------------------------- |
| Application          | Vue 3 + TypeScript                                             |
| Build tool           | Vite                                                           |
| UI                   | Element Plus                                                   |
| State                | Pinia + pinia-plugin-persistedstate                            |
| Routing              | Vue Router with business routes delivered by the server        |
| Styling              | UnoCSS + Less + CSS Variables                                  |
| Internationalization | Vue I18n + Element Plus locale                                 |
| Requests             | Axios with separate shared-client and app configuration layers |
| Charts               | ECharts with module-based registration                         |
| Code quality         | Oxlint, Prettier, Stylelint, and Husky                         |
| Monorepo             | pnpm workspace                                                 |

Refer to `package.json` and `pnpm-lock.yaml` in the repository for exact versions. The documentation does not duplicate a version table that would quickly become outdated.

## How v3 differs from the previous version

The previous documentation described an integrated admin solution with many wrapped components and demos. v3 is positioned as a shared template instead, with the following major changes:

| Previous approach | v3 approach |
| --- | --- |
| Static routes, client-side filtering, and dynamic routes coexist | Business routes come exclusively from the server |
| Presentation components such as Form, Table, Search, and Dialog are uniformly wrapped | Only UI-agnostic form and CRUD state capabilities remain |
| Icon capabilities live inside shared components | Shared packages render icons; each application registers its own offline icons |
| A single application directory | `apps/*` + `packages/*`, with explicit boundaries for multiple applications |
| Numerous Hooks and Utils | Only cross-application capabilities with stable, concrete use cases remain |
| ESLint | Oxlint |

::: info Previous documentation

The previous documentation remains useful for understanding the project's history, but its code examples and directory structure do not apply to v3. Treat the current documentation and current branch as the source of truth.

:::

## Defaults

- Default username: `admin`
- Default password: `admin`
- Default language: Simplified Chinese
- Default layout: classic sidebar
- Default routes: fetched from `/mock/role/list` after login
- Default icons: an offline allowlist owned by the application

## What is not included

Applications should add the following capabilities only when needed; the template does not provide them by default:

- Complex Table, Search, Dialog, and Detail page abstractions.
- Presentation components for rich text, QR codes, video, waterfall layouts, and similar use cases.
- A concrete RBAC data model, button permissions, or data-permission rules.
- Upload, message center, profile, or organization pages.
- API generators tied to a particular backend framework.

Move an implementation into `packages` only after multiple applications share the same stable solution. Do not introduce abstractions in advance for unknown requirements.

## Next steps

Run the project with [Getting Started](/en/guide/getting-started), then read [Project Structure and Architecture](/en/guide/architecture) and [Dynamic Routing and Permissions](/en/core/dynamic-routing).
