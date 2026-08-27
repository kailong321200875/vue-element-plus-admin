# Configuration and Environment Variables

## Configuration layers

Project configuration is divided into three layers:

| Layer | File | Purpose |
| --- | --- | --- |
| Build environment | `apps/admin/.env.*` | API URLs, deployment paths, and build output |
| Application flags | `apps/admin/src/config/app.ts` | UI capabilities such as Breadcrumb, TagsView, theme, and footer |
| Runtime state | `apps/admin/src/store/modules/app.ts` | Current layout, collapse state, theme, and mobile state |

Put build-time constants in environment variables, product flags that do not vary by environment in `appConfig`, and state that users can change at runtime in the Store.

## Build modes

| Mode        | File        | Output directory   | Base          |
| ----------- | ----------- | ------------------ | ------------- |
| Local       | `.env.base` | Development server | `/`           |
| Development | `.env.dev`  | `dist-dev`         | `/dist-dev/`  |
| Test        | `.env.test` | `dist-test`        | `/dist-test/` |
| Production  | `.env.pro`  | `dist-pro`         | `/`           |

The environment files live under `apps/admin` because that application—not the repository root—is Vite's working directory.

## Environment variables

| Variable             | Description                                   |
| -------------------- | --------------------------------------------- |
| `VITE_API_BASE_PATH` | Axios `baseURL`                               |
| `VITE_BASE_PATH`     | Vite public base path                         |
| `VITE_APP_TITLE`     | Document title and application title          |
| `VITE_SOURCEMAP`     | Whether to emit sourcemaps                    |
| `VITE_OUT_DIR`       | Build output directory                        |
| `VITE_USE_MOCK`      | Whether to enable the development Mock plugin |
| `VITE_USE_CSS_SPLIT` | Whether to split CSS                          |

Only variables whose names begin with `VITE_` are exposed to browser code. When adding a variable, update `apps/admin/types/env.d.ts` as well:

```ts
interface ImportMetaEnv {
  readonly VITE_EXAMPLE: string
}
```

Environment variables are always read as strings. Convert boolean settings consistently with `value === 'true'`; do not rely on string truthiness.

## Application UI configuration

`src/config/app.ts` contains capability flags that users cannot change. The fields currently connected to the layout are:

```ts
export const appConfig = {
  title: import.meta.env.VITE_APP_TITLE,
  ui: {
    breadcrumb: true,
    breadcrumbIcon: true,
    hamburger: true,
    theme: true,
    locale: true,
    tagsViewIcon: true,
    footer: true,
    uniqueOpened: false
  }
} as const
```

When `uniqueOpened` is `true`, only one top-level branch of a vertical menu can remain expanded at a time.

## Runtime state

The App Store contains:

- `layout`: `sidebar | top | mixed | dual`
- `collapse`: whether the sidebar is collapsed
- `isDark`: whether dark mode is active
- `mobile`: whether the current viewport is narrower than 768px
- `pageLoading`: route-transition loading state

`layout`, `collapse`, and `isDark` are persisted to `vea-app-v2`; `mobile` and `pageLoading` belong only to the current session.

## API proxy

By default, the development server proxies `/api` to `http://127.0.0.1:8000`:

```ts
server: {
  proxy: {
    '/api': {
      target: 'http://127.0.0.1:8000',
      changeOrigin: true,
      rewrite: (path) => path.replace(/^\/api/, '')
    }
  }
}
```

In a real project, `VITE_API_BASE_PATH` is commonly set to `/api`. The development proxy handles cross-origin requests locally, while the production gateway forwards them after deployment.

## Changing the deployment subpath

When deploying to `https://example.com/admin/`, set:

```dotenv
VITE_BASE_PATH=/admin/
```

The Router currently uses Hash History, so the static server does not need an HTML fallback for every business URL. It must, however, serve static assets from the configured Base path.
