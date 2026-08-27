# Project Structure and Architecture

## Workspace structure

```text
vue-element-plus-admin/
├─ apps/
│  ├─ admin/                 # Admin application
│  └─ docs/                  # Current documentation site
├─ packages/
│  ├─ components/            # Foundational UI shared across applications
│  ├─ hooks/                 # CRUD and form-state capabilities
│  ├─ request/               # Request client independent of UI and business logic
│  └─ styles/                # Shared styles and theme variables
├─ package.json              # Workspace commands and tooling dependencies
├─ pnpm-workspace.yaml       # apps/* and packages/*
└─ pnpm-lock.yaml            # The single dependency lockfile
```

## Dependency direction

```text
apps/admin ─────┬──> @vea/components
                ├──> @vea/hooks
                ├──> @vea/request
                └──> @vea/styles

packages/*  ────X──> apps/admin
```

Applications may depend on shared packages, but shared packages must never depend on a particular application. This rule ensures that adding `apps/merchant` or `apps/portal` later does not pull in Admin's session state, routes, or business copy.

## Admin directory

```text
apps/admin/
├─ mock/                     # Development-time Mock APIs
├─ public/                   # Static assets copied as-is
├─ src/
│  ├─ api/                   # Domain APIs and types
│  ├─ assets/                # Image assets processed by the build
│  ├─ components/            # Layout and feature components used only by Admin
│  ├─ config/                # Application and locale configuration
│  ├─ hooks/                 # Hooks coupled to the Admin Store or DOM
│  ├─ layout/                # Four admin layouts
│  ├─ locales/               # Business translation messages
│  ├─ plugins/               # Element Plus, ECharts, and I18n initialization
│  ├─ request/               # Admin request instance and business response handling
│  ├─ router/                # Constant routes only
│  ├─ store/                 # Pinia state modules
│  ├─ utils/                 # Currently contains only route-related utilities
│  └─ views/                 # Route pages
├─ types/                    # Environment, route, and component type extensions
└─ vite.config.ts
```

## Startup sequence

`src/main.ts` performs the following steps in order:

1. Create the Vue application.
2. Register Pinia and load persisted state for the current version.
3. Restore the login session and preload dynamic routes.
4. Register return-style navigation guards.
5. Create the Vue I18n instance.
6. Register application icons and the global `Icon` component.
7. Register Element Plus directive capabilities.
8. Install Vue Router and mount the application.

Dynamic routes must be ready before the Router performs its first navigation. Otherwise, refreshing a business URL triggers `No match found` before the route can be registered. The current startup sequence is designed to prevent that problem.

## What belongs in Packages

Consider moving a capability into a shared package only when it meets all of these conditions:

- It does not read the Admin Store, Router, environment variables, or business APIs.
- Its inputs and outputs can be expressed through props, parameters, and return values.
- At least two applications may use it in the same way.
- Its API remains stable when business requirements change.

For example, `@vea/request` handles request lifecycles and cancellation without knowing how the token is stored. `apps/admin/src/request` then integrates the user Store and Element Plus notifications.

## What belongs in Admin

- Layout, Menu, TagsView, and Breadcrumb.
- The login page, Dashboard, and business pages.
- User, permission, locale, and layout Stores.
- Route API contracts and component-path resolution.
- Application behavior strongly coupled to Element Plus or the browser DOM.

## Adding an application

When adding an application:

1. Create a separate `package.json` under `apps/<name>`.
2. Declare only the workspace packages the application actually uses.
3. Create its own request instance, icon allowlist, routes, and Store.
4. Do not import files directly from `apps/admin/src`.
5. Extract an implementation into `packages` only after the duplication has become stable.

This approach lets multiple applications share foundational capabilities while preserving independent builds and on-demand bundling.
