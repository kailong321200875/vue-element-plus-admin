# State Management

Admin uses Pinia and persists only the data that must survive a reload through `pinia-plugin-persistedstate`.

## Store overview

| Store        | Responsibility                                                | Persisted |
| ------------ | ------------------------------------------------------------- | --------- |
| `app`        | Layout, collapse state, theme, page loading, and mobile state | Partly    |
| `user`       | Token, user information, and remembered account               | Yes       |
| `locale`     | Current language                                              | Yes       |
| `permission` | Dynamic routes and menus for the current session              | No        |
| `tagsView`   | Tabs and the KeepAlive include list                           | No        |

## Persistence principles

Persist only the smallest amount of state that is safe to serialize and remains valid after a reload:

```ts
persist: {
  key: 'vea-app-v2',
  pick: ['collapse', 'layout', 'isDark']
}
```

Do not persist:

- Vue Router records and component functions.
- Page-loading state or mobile media-query state.
- Complete RouteLocation objects from TagsView.
- Request loading flags, errors, or temporary form data.

## Using stores inside and outside the application

Use the standard hook directly inside a component's `setup`:

```ts
const appStore = useAppStore()
```

Outside components, such as in navigation guards and Request interceptors, use the method bound to the global Pinia instance:

```ts
const appStore = useAppStoreWithOut()
```

Do not call `useAppStore()` outside a component and rely on an implicit active Pinia. It can fail when the startup order changes.

## User sessions

The User Store considers a user signed in only when both the token and user information are available:

```ts
isAuthenticated(): boolean {
  return Boolean(this.token && this.userInfo)
}
```

Call `setSession()` after a successful sign-in and `logout()` when signing out. `clearSession()` is the single entry point for complete session cleanup; it also resets permission routes, TagsView, and Router.

The current User Store writes the token, `userInfo`, `rememberMe`, and `rememberedUsername` to localStorage and does not implement token expiry or refresh. This is suitable for a template demonstration and ordinary admin applications, but localStorage tokens are exposed to XSS risks. Security-sensitive products should evaluate HttpOnly cookies, short-lived in-memory tokens, a refresh mechanism, and CSP together with their backend capabilities instead of adopting the template's session defaults unchanged.

## Permission state

The Permission Store contains:

- `routers`: constant routes plus dynamic routes, used by menus.
- `addRouters`: business routes added dynamically for the current session.
- `isAddRouters`: prevents duplicate requests and registrations.

After a page reload, dynamic routes are requested again from the persisted User Store session. The Permission Store is not restored from local storage.

## TagsView state

`visitedViews` and `cachedViews` are always updated together through Store actions. Components must not call `push` or `splice` on either array directly, because the KeepAlive include list could then diverge from the tabs.

## Locale state

The Locale Store stores only the language code. Locale messages and the Element Plus locale come from `localeRegistry`:

```ts
state: () => ({ lang: DEFAULT_LOCALE })
```

Persisted data therefore contains no large objects and cannot drift from the version of locale messages in the source code.

## State versions

The shared template does not include migrations for legacy localStorage data. Persistence keys use a version suffix. When the state shape changes incompatibly, prefer incrementing the key and falling back to defaults. If a deployed product must migrate existing data, implement a one-time migration in that application instead of making the shared Store carry historical compatibility branches indefinitely.

## Adding a Store

```ts
import { defineStore } from 'pinia'
import { store } from '../index'

export const useExampleStore = defineStore('example', {
  state: () => ({ value: '' }),
  actions: {
    reset() {
      this.$reset()
    }
  }
})

export const useExampleStoreWithOut = () => useExampleStore(store)
```

Export a `WithOut` variant only when the Store genuinely needs to be used outside components.
