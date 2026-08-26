# Package design

The repository uses a pnpm workspace to separate applications from reusable capabilities:

```text
apps/
├─ admin/          # Admin app: business logic, routes, layouts, APIs, and Store
└─ docs/           # Current documentation site

packages/
├─ components/     # A small set of cross-app components
├─ hooks/          # UI-independent logic Hooks
├─ request/        # Business-agnostic Axios client
└─ styles/         # Base styles and theme variables
```

## Current package responsibilities

| Package | Provides | Must not contain |
| --- | --- | --- |
| `@vea/components` | `Icon`, `LocaleDropdown`, `ThemeSwitch` | Pages, business state, or a full icon set |
| `@vea/hooks` | `useCrud`, `useForm`, `required` | Element Plus, API fields, or dialog layout |
| `@vea/request` | Axios lifecycle, transforms, errors, cancellation | Token Store, business success codes, or message components |
| `@vea/styles` | Reset, Element Plus dark variables, design variables | Page-specific styles |

These packages currently export TypeScript and Less source files directly, which workspace applications compile through Vite. They do not have independent build artifacts and should not be described as a published npm component library.

## Dependency direction

Keep dependencies flowing in one direction:

```text
apps/*  ──────>  packages/*
                       │
packages/components ───┴─> Vue / Element Plus (peer) + @iconify/vue
packages/hooks ───────────> Vue (peer)
packages/request ─────────> Axios
```

Shared packages must not import from `apps/admin`. If a capability needs the Admin Store, router, or environment variables, it belongs in the application layer.

## Dependency ownership and versions

- The root `package.json` declares only repository-wide tools such as Commitlint, Oxlint, Prettier, Stylelint, and PostCSS. It does not declare Vue application runtime dependencies.
- Each app declares its own runtime dependencies and build tools instead of relying on packages hoisted from the root to fill missing declarations.
- Each package declares its direct dependencies and uses `peerDependencies` to express the Vue, Element Plus, or other runtime environment that consumers must provide.
- Development versions shared by several workspaces are centralized through the `catalog` in `pnpm-workspace.yaml`. Public package peer compatibility ranges remain independently declared.
- The root `.npmrc` disables automatic peer installation. The workspace that actually uses a dependency must declare it explicitly instead of letting pnpm silently introduce unused framework adapters. Missing peers are ignored only for unused ESLint integrations and VitePress Algolia search.

`catalog:` only centralizes the source of a version. It does not automatically make an undeclared dependency available to a workspace. A new app must still declare every dependency it actually uses.

## Why not wrap every component

Presentation components such as Table, Search, Dialog, and Detail may look similar, but their field permissions, mobile layouts, edit flows, and API contracts are usually different. Forcing them into packages leads to an ever-growing configuration API and ultimately replaces readable page templates with a harder-to-understand DSL.

Code is usually a good candidate for packages only when all of the following are true:

1. It already has two real consumers.
2. Its API does not depend on a specific business entity.
3. It does not read an application's private Store, router, or environment variables.
4. Reusing it does not force applications to bundle a large amount of unused code.
5. It can be tested independently, or at least explained with a very small example.

“It might be reused later” is not enough.

## Create a shared package

Define a workspace source entry in `packages/example/package.json`:

```json
{
  "name": "@vea/example",
  "version": "1.0.0",
  "private": true,
  "type": "module",
  "exports": {
    ".": {
      "import": "./src/index.ts",
      "types": "./src/index.ts"
    }
  }
}
```

Declare the workspace dependency in the application:

```json
{
  "dependencies": {
    "@vea/example": "workspace:*"
  }
}
```

Then import from the package name instead of using a cross-directory relative path into its source:

```ts
import { example } from '@vea/example'
```

## Control resources in a multi-app repository

Shared packages contain renderers and contracts, while each app registers its concrete resources. Icons demonstrate this principle in practice: Admin statically imports only the icons it uses, and another app can register a completely different allowlist without being forced to bundle the entire shared resource set.

The same principle applies to requests. The request package provides only a client factory; each app configures its own baseURL, token, response codes, and UI messages.

## Requirements before publishing

Before publishing packages outside the workspace, add at least:

- Independent builds and generated type declarations.
- Explicit `exports` and a CSS publication strategy.
- `peerDependencies` and minimum-version tests.
- A package-level README, changelog, and release workflow.
- Consumer bundling tests that verify tree-shaking and style behavior.

There is no need to introduce this maintenance cost while the current monorepo is the only consumer.
