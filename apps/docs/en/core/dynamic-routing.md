# Dynamic Routing and Permissions

v3 does not maintain business routes as static frontend routes, nor does it keep a complete route table and filter it in the browser. After sign-in, the server returns the routes available to the current user. The frontend converts them into Vue Router records and registers them dynamically.

## Route sources

Constant routes contain only the application shell:

- `/`: the Layout container and home-page redirect
- `/login`: the sign-in page
- `/redirect/*`: the redirect page used to refresh a TagsView tab
- `/404`: the error page
- `/:pathMatch(.*)*`: the catch-all route

Business pages such as the dashboard and nested menus come from `getRouteListApi()`. In the mock environment, the corresponding endpoint is `/mock/role/list`.

## API contract

The core structure of a server-provided route is:

```ts
interface AppCustomRouteRecordRaw {
  path: string
  name: string
  component: string
  redirect?: string
  meta: {
    title?: string
    icon?: string
    hidden?: boolean
    alwaysShow?: boolean
    noCache?: boolean
    breadcrumb?: boolean
    affix?: boolean
    activeMenu?: string
    noTagsView?: boolean
  }
  children?: AppCustomRouteRecordRaw[]
}
```

Example:

```json
{
  "path": "/dashboard",
  "name": "Dashboard",
  "component": "#",
  "redirect": "/dashboard/analysis",
  "meta": {
    "title": "router.dashboard",
    "icon": "mdi:view-dashboard"
  },
  "children": [
    {
      "path": "analysis",
      "name": "Analysis",
      "component": "views/Dashboard/Analysis",
      "meta": {
        "title": "router.dashboard",
        "affix": true,
        "noCache": true
      }
    }
  ]
}
```

## `component` rules

| Value                      | Meaning                                                         |
| -------------------------- | --------------------------------------------------------------- |
| `#`                        | Uses the admin Layout, usually for a top-level directory        |
| `##`                       | A route-only group that does not render an additional component |
| `views/Dashboard/Analysis` | Maps to `src/views/Dashboard/Analysis.vue` or `.tsx`            |

Page components are allowlisted through `import.meta.glob('../views/**/*.{vue,tsx}')`. The API cannot return an arbitrary module path; it must match a file that actually exists under `views`.

::: warning Path casing

Component paths must match the file system's casing exactly. The default macOS file system may not expose a mismatch, while a Linux build will fail.

:::

## `meta` fields

| Field        | Purpose                                                       |
| ------------ | ------------------------------------------------------------- |
| `title`      | The i18n key used by menus, breadcrumbs, and TagsView         |
| `icon`       | An Iconify name registered by the current application         |
| `hidden`     | Hides the route from the menu                                 |
| `alwaysShow` | Keeps the parent menu even when it has only one visible child |
| `noCache`    | Excludes the page from KeepAlive                              |
| `breadcrumb` | Controls whether the route appears in breadcrumbs             |
| `affix`      | Pins the route in TagsView so it cannot be closed             |
| `activeMenu` | Marks another menu path as active                             |
| `noTagsView` | Prevents a tab from being created                             |

## Registration flow

```text
Restore the session
   ↓
getRouteListApi
   ↓
generateRoutesByServer
   ↓
permissionStore.generateRoutes
   ↓
router.addRoute × N
   ↓
Re-enter the target URL
```

`ensureDynamicRoutes()` uses `isAddRouters` to prevent duplicate registration. When routes are first registered in the navigation guard, it returns `{ path: to.fullPath, replace: true }` so that Router resolves the destination again with the updated route table.

The navigation guard uses the return-value style recommended by Vue Router instead of the deprecated `next()` callback:

```ts
router.beforeEach(async (to) => {
  if (!userStore.isAuthenticated) {
    return { path: '/login', query: { redirect: to.fullPath } }
  }

  const routesAdded = await ensureDynamicRoutes()
  if (routesAdded) return { path: to.fullPath, replace: true }

  return true
})
```

## Adding a business page

1. Create the page component under `src/views`.
2. Give the component and route `name` a stable, unique value.
3. Have the backend return the corresponding `component` path.
4. Add the key used by `meta.title` to the locale messages.
5. If the route has an icon, register it in `src/icons.ts`.
6. Sign out and sign in again, or perform a complete route reset before fetching the routes again.

Calling only `permissionStore.reset()` does not remove records that have already been registered with Vue Router. A manual route refresh must at least call `resetRouter()`, reset the Permission Store, clear TagsView when needed, and then call `ensureDynamicRoutes()`. Signing in again, or rebuilding the session after `userStore.clearSession()`, is currently the safer entry point.

## Nested menus

Use relative paths for child routes whenever possible:

```text
/level
└─ menu1
   └─ menu1-1
      └─ menu1-1-1
```

The final path is `/level/menu1/menu1-1/menu1-1-1`. `pathResolve()` joins parent and child paths while preserving absolute paths and external links.

## Sign-out and reset

Signing out performs all of the following:

1. Clears the token and user information.
2. Resets the Permission Store.
3. Clears TagsView and the KeepAlive include list.
4. Calls `resetRouter()` to remove dynamically registered business routes.
5. Navigates to the sign-in page.

Do not persist dynamic route objects. Page-component functions cannot be serialized reliably; after a refresh, request the routes again from the persisted session state.

## External links

Paths beginning with `http:`, `https:`, `mailto:`, or `tel:` are treated as external links. They open through `window.open` and are not registered as local page components.
