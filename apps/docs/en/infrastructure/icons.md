# Icon registration

Icons use an offline architecture with a shared renderer and static registration in each application:

```text
@vea/components/Icon     Rendering only
          ↑
apps/admin/src/icons.ts  Imports only the icons used by Admin
```

When a second app is added, the shared Icon component will not cause it to bundle every Admin icon.

## Register an icon

Import the icon statically in the application's own `src/icons.ts`:

```ts
import account from '@iconify-icons/mdi/account'
import type { IconRegistry } from '@vea/components'

export const icons = {
  'mdi:account': account
} satisfies IconRegistry
```

Register it when Admin starts:

```ts
import { Icon, registerIcons } from '@vea/components'
import { icons } from '@/icons'

registerIcons(icons)
app.component('Icon', Icon)
```

It can then be used in any template:

```vue
<Icon icon="mdi:account" :size="20" />
```

`size` controls both width and height. `color` is optional, and the icon inherits the current text color by default.

## Dynamic route icons

Server routes send only the icon name, not the icon data:

```json
{
  "path": "dashboard",
  "meta": {
    "title": "router.dashboard",
    "icon": "mdi:view-dashboard"
  }
}
```

The name must therefore exist in the current app's `icons` registry. If it does not, the menu text can still render but the icon remains empty.

It is best for the frontend and backend to share an allowlist of icon names so the API cannot return arbitrary strings.

## Icon dependencies in shared components

Shared components no longer import icons implicitly. For example, `LocaleDropdown` uses `mdi:translate`, so an app that consumes it must add that icon to its own registry. This makes the dependency explicit and prevents an application without language switching from paying the resource cost.

## Bundle behavior

The project uses `@iconify/vue/offline` and statically imports icon data one at a time from `@iconify-icons/mdi/<name>`:

- Icon data enters the application bundle at build time.
- Runtime code does not access the Iconify CDN.
- Icons that are not imported do not enter that app's dependency graph.
- Each app can own an independent allowlist.

Do not switch to runtime-computed module paths or an online API. A bundler cannot reliably analyze dynamic strings, and the application would no longer work fully offline.

## Naming recommendations

- Keep the complete Iconify name as the registration key, such as `mdi:file-tree`.
- Use camelCase variable names, such as `fileTree`.
- Use the registration key consistently in routes, components, and documentation instead of maintaining a second alias system.
- After deleting a page, search for the icon name with `rg` and remove it from `icons.ts` only after confirming there are no references.

## Troubleshoot a missing icon

Check these items in order:

1. Confirm the icon data is statically imported by the current app's `icons.ts`.
2. Confirm the registration key exactly matches `meta.icon` in the template or route.
3. Confirm `registerIcons()` runs before the application is mounted.
4. Check whether padding or flex shrinking in the container compresses the icon.
5. Check whether its color matches the background or local CSS overrides it.

Menu layout should control menu icon size. Icon itself only provides explicit width and height, so a shared component does not have to guess the spacing required by each use case.
