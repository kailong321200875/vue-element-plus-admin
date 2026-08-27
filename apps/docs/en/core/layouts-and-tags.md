# Layouts, Menus, and TagsView

All four desktop layouts share the same dynamic routes. Switching layouts only changes how routes are presented; it does not change URLs, permissions, or page components.

## Layout modes

| Store value | UI name | Best suited for |
| --- | --- | --- |
| `sidebar` | Classic sidebar | The most common admin layout, especially for clear menu hierarchies |
| `top` | Top navigation | A small number of top-level sections and a wider content area |
| `mixed` | Mixed navigation | Top-level sections across the top with their children on the left |
| `dual` | Dual sidebar | Many top-level modules, with modules separated from their menus |

The App Store persists the layout state under `vea-app-v2`. The layout switcher only calls `setLayout()`; the Layout component combines `PrimaryNav`, `Menu`, `ToolHeader`, and the content area according to the current state.

## How routes drive menus

The Permission Store's `routers` value is the single source of truth for menus:

```ts
const visibleRoutes = computed(() => permissionStore.routers.filter((route) => !route.meta?.hidden))
```

- The classic sidebar renders all visible routes directly.
- Top navigation uses a horizontal Menu.
- Mixed navigation and the dual sidebar first determine the active top-level route, then convert its children to absolute paths before passing them to the vertical Menu.
- Breadcrumbs and TagsView continue to read the current Router matches, so they keep their context when the layout changes.

## Mobile behavior

When the viewport is narrower than `768px`:

- `mobile` automatically becomes `true`.
- Every desktop layout falls back to the classic sidebar.
- The sidebar overlays the content as a drawer.
- Clicking the overlay closes the menu.
- The desktop layout preference remains stored and is restored on a larger screen.

`ConfigGlobal` handles viewport-width changes in one place, so business pages do not need to inspect the layout mode themselves.

## TagsView data

The TagsView Store maintains two sets of data:

| Field          | Description                                                    |
| -------------- | -------------------------------------------------------------- |
| `visitedViews` | Open tabs, including route paths, query parameters, and `meta` |
| `cachedViews`  | Names of route components that KeepAlive should cache          |

When a route is visited, TagsView adds or updates a tab by `path`. Changes to query parameters update the existing tab instead of creating duplicate tabs for the same path.

## Route `meta` and tabs

```ts
meta: {
  title: 'router.dashboard',
  icon: 'mdi:view-dashboard',
  affix: true,
  noCache: true,
  noTagsView: false
}
```

- `affix`: adds the page at startup and prevents its tab from being closed.
- `noCache`: excludes the page from KeepAlive.
- `noTagsView`: prevents a tab from being created for the page.
- `icon`: uses the icon of the current route or its nearest parent for the tab.

## Page caching

The content area uses:

```vue
<keep-alive :include="cachedViews">
  <component :is="Component" :key="route.fullPath" />
</keep-alive>
```

KeepAlive matches `include` against component names. A cacheable page therefore needs a stable component name that matches the route `name`:

```vue
<script setup lang="ts">
  defineOptions({ name: 'UserList' })
</script>
```

```json
{
  "name": "UserList",
  "component": "views/User/List",
  "meta": { "noCache": false }
}
```

## Refreshing a tab

Refreshing a tab does not reload the entire browser. Instead, it:

1. Temporarily removes the current component name from `cachedViews`.
2. Navigates to `/redirect<current-path>`.
3. Uses `replace` in the Redirect page to return to the original URL.
4. Recreates the current page component.

This keeps application state and other tabs intact while running the current page's lifecycle again.

## Closing strategies

TagsView supports:

- Closing the current tab.
- Closing tabs to the left, to the right, or all other tabs.
- Closing every tab that is not pinned.
- Always retaining pinned tabs.
- Navigating to the adjacent tab on the right after closing the active one, then falling back to the left tab or the default business route.

After every addition or removal, the Store rebuilds the cache include list through `syncCachedViews()`. This prevents tab state and KeepAlive state from drifting apart.

## Should TagsView be persisted?

It is not persisted currently. Dynamic routes are requested again after a refresh, and tab data also contains route information that may be non-serializable or no longer valid. If a product truly needs to restore tabs, save only a list of `fullPath` values, then validate and restore each one after dynamic route registration has completed.
