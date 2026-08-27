# Mock APIs and backend integration

Admin uses `vite-plugin-mock` to provide development APIs for login, logout, dynamic routes, and dashboard analytics.

## Enable Mock

The environment file must contain:

```dotenv
VITE_USE_MOCK=true
```

Mock runs only in the development server:

```bash
pnpm dev:admin
```

It is never registered in a production build, even if `.env.pro` contains `VITE_USE_MOCK=true`. A production environment must provide real backend APIs.

## Directory structure

```text
apps/admin/mock/
├─ user/index.mock.ts      # Login and logout
├─ role/index.mock.ts      # Dynamic routes
└─ analysis/index.mock.ts  # Dashboard statistics and charts
```

The plugin ignores files whose names start with an underscore.

## Define an endpoint

```ts
import { SUCCESS_CODE } from '@/constants'
import type { MockMethod } from 'vite-plugin-mock'

export default [
  {
    url: '/mock/users',
    method: 'get',
    timeout: 300,
    response: ({ query }) => ({
      code: SUCCESS_CODE,
      data: {
        list: [{ id: 1, name: `User ${query.pageIndex ?? 1}` }],
        total: 1
      }
    })
  }
] satisfies MockMethod[]
```

Mock endpoints should follow Admin's standard response contract:

```ts
interface ApiResponse<Data> {
  code: number
  data: Data
  message?: string
}
```

The success code is `0`.

## Current test accounts

| Username | Password |
| -------- | -------- |
| `admin`  | `admin`  |
| `test`   | `test`   |

Mock tokens are for local demonstrations only. They do not expire and have no refresh mechanism.

## Switch to real APIs

Disable local Mock:

```dotenv
VITE_USE_MOCK=false
VITE_API_BASE_PATH=/api
```

`VITE_USE_MOCK=false` only disables local request interception; it does not rewrite API URLs. The template currently uses `/mock/user/...`, `/mock/role/...`, and `/mock/analysis/...`. If the real backend does not expose the same paths, also update the URLs in `src/api`.

A better integration is to make Mock and the real backend use the same URL set from the beginning. For example, set Request's `baseURL` to `/api`, use `/users` in the API module, and intercept `/users` in Mock. Environment switching then requires configuration only, without business-code changes.

The development server proxies `/api` to `http://127.0.0.1:8000` and removes the `/api` prefix. Change the proxy in `vite.config.ts` when using another backend. In production, a gateway or Web Server should handle the proxy.

Request's `normalizeRequestKey()` removes `/mock` only from the cancellation key; it does not change the actual request URL.

## Dynamic route Mock

`role/index.mock.ts` returns the complete accessible route tree, not a list of roles for client-side filtering. Ensure at least the following:

- Top-level pages use `component: '#'` to mount Layout.
- Pure directory nodes use `component: '##'`.
- Page components use `views/...` without a file extension.
- Child route paths are relative.
- Route names are globally unique.
- Every `meta.icon` is registered by the current app.

See [Dynamic Routing and Permissions](/en/core/dynamic-routing).

## Scope

Mock shortens the feedback loop while frontend and backend development run in parallel. It should not simulate an entire database, authorization engine, or production failure system. If it becomes complex enough to require a state machine, use a real test environment or an independent Mock service instead.

Although `mockjs` is installed, the current Mock endpoints do not use its data-generation APIs. When random data is unnecessary, clear fixed objects are easier to debug.
