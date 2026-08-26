# Frequently asked questions

## Why does local startup report no route for `/dashboard/analysis`?

Dynamic routes are registered from the API after the authenticated session is restored. Common causes include:

1. The browser has an old token, but Mock or the backend did not return routes correctly.
2. Initial navigation occurred before `router.addRoute()`.
3. A server-provided component string does not match an available page.
4. State from an older version remains persisted after the route structure changed.

Inspect `/mock/role/list` or the real route API first, then clear `vea-session-v1` and log in again. The current startup flow should run `setupPermission()` before installing Router and replace the current location after registration.

Do not hide the problem by adding a static `/dashboard/analysis` route. The dashboard is also supplied by the server as a dynamic route.

## Vue Router warns that the `next() callback is deprecated`

Navigation guards should return directly:

```ts
router.beforeEach(async (to) => {
  if (!isLoggedIn) return '/login'
  if (!routesReady) {
    await loadRoutes()
    return { ...to, replace: true }
  }
  return true
})
```

Do not keep using the third `next` parameter. The project currently uses return-style guards. If the warning appears again, search `beforeEach`, `beforeResolve`, and `beforeEnter` for old callbacks.

## Why does a nested menu in mixed navigation open a 404 page?

Check that child route paths are relative, parent redirects target real leaf routes, and the mixed layout joins the complete parent path correctly. Directory nodes should use `component: '##'` and must not be treated as navigable pages.

## Why does a dynamic route menu have text but no icon?

The server returns only an icon name. The current app must still register that icon statically in `src/icons.ts`. The names must match exactly, for example `mdi:file-document-outline`.

See [Icon registration](/en/infrastructure/icons).

## Why does an icon still look small after increasing `size`?

The problem is usually not Icon's width or height. Padding, fixed dimensions, or `flex-shrink` on a parent can compress the available space. Inspect the icon's final box model in the browser, give its container an explicit size and `flex: none`, and use an appropriate gap. Fix the menu component that owns the layout instead of changing every layout.

## Why does a vertical menu jump when expanding or collapsing?

An active background, border, padding, or icon placeholder may exist only in the expanded state and change the element height. Keep menu item height, horizontal padding, icon slot width, and arrow slot width fixed in every state. Animate only the submenu height or opacity.

## Why did language switching previously require a refresh?

An older implementation may have changed only the persisted value without synchronizing vue-i18n and Element Plus. In v3, `changeLocale()` updates the i18n locale, Store, HTML `lang`, and ConfigProvider, so the change should be immediate.

If an individual string does not update, check whether setup stored it as a plain string instead of reading it through `t()`, a computed value, or a render function.

## Why do Mock APIs stop working in the production bundle?

This is intentional. `vite-plugin-mock` serves local development only and is not registered in production builds. A deployed environment must provide real backend APIs.

## Why are BaseButton, Table, Search, Dialog, and Detail missing?

Most of these abstractions merely forward presentation-layer properties or turn highly configurable page templates into complicated props. v3 keeps only reusable logic such as `useCrud`, `useForm`, and Request, while pages compose Element Plus directly.

## Why is there no `web` directory under Hooks?

There are currently few Hooks, so the extra directory does not express a new boundary. `src/hooks/useLocale.ts` is more direct than `src/hooks/web/useLocale.ts`. Add a directory only when a real platform split such as native or server appears.

## Does Request return business data or the full response?

Admin APIs return `ApiResponse<Data>`:

```ts
const response = await loginApi(params)
const loginResult = response.data
```

Blob responses are the exception and return the original AxiosResponse. Authorization currently sends the token directly and does not add `Bearer ` automatically.

## Why do static assets return 404 after deployment under a subdirectory?

Set `VITE_BASE_PATH` to the real subdirectory, beginning and ending with `/`, and rebuild. Changing only the server directory cannot alter asset URLs already written into the generated HTML.

## Why do commands from the old documentation fail?

The old documentation describes the v2 architecture. v3 has moved to `apps + packages`, and root commands are now `pnpm dev:admin`, `pnpm build:admin`, and similar variants. Node, Vite, routes, icons, linting, and component boundaries have also changed.

Follow this site and the current `package.json`. Do not continue using legacy instructions such as `pnpm dev`, `pnpm build:pro`, `src/axios`, ESLint, online icons, or client-side role-based route filtering.
