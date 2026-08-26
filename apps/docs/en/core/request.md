# Request Management

Request handling is split into a shared client and Admin-specific configuration:

```text
packages/request          Shared lifecycle, cancellation, and hooks
        ↑
apps/admin/src/request    baseURL, token, response codes, and UI error messages
        ↑
apps/admin/src/api        Domain APIs and business types
```

## Why use two layers?

`@vea/request` does not read Pinia state, display messages, or know the application's success code. It can therefore be reused by multiple applications.

`@/request` belongs to Admin and is responsible for:

- Reading `baseURL` from environment variables.
- Setting the timeout and JSON Content-Type.
- Injecting the token from the User Store.
- Parsing the shared business response.
- Handling 401 responses and clearing the session.
- Displaying errors through Element Plus.

## Response contract

Admin uses this response structure by default:

```ts
export interface ApiResponse<Data = unknown> {
  code: number
  data: Data
  message?: string
}
```

`code === 0` indicates success. A Blob response returns the AxiosResponse directly without applying the business-code check.

## Defining an API

Group endpoints by domain under `src/api`:

```ts
import request from '@/request'
import type { User } from './types'

export const getUsersApi = (pageIndex: number, pageSize: number) => {
  return request.get<User[]>({
    url: '/users',
    params: { pageIndex, pageSize }
  })
}
```

API URLs are relative to `VITE_API_BASE_PATH`. For example, with a baseURL of `/api` and `/users` here, the final request URL is `/api/users`. Do not repeat the prefix in both places.

The call result keeps the shared response type:

```ts
const { data } = await getUsersApi(1, 20)
```

Keep domain types in a sibling `types.ts` file instead of maintaining every business model in the Request layer.

## Available methods

The application instance provides:

```ts
request.get<Data>(config)
request.post<Data>(config)
request.put<Data>(config)
request.delete<Data>(config)
request.cancelRequest(url)
request.cancelAllRequest()
```

`config` extends AxiosRequestConfig, so native options such as `params`, `data`, `headers`, `signal`, and `responseType` remain available.

## Shared client configuration

`createRequest()` supports:

| Option              | Purpose                                |
| ------------------- | -------------------------------------- |
| `axiosConfig`       | Passed to `axios.create`               |
| `beforeRequest`     | Asynchronously prepares request config |
| `transformResponse` | Applies a shared response transform    |
| `onError`           | Handles errors in one place            |
| `getRequestKey`     | Creates the key used for cancellation  |

Create an application-specific instance for every additional application:

```ts
import { createRequest } from '@vea/request'

export const client = createRequest({
  axiosConfig: { baseURL: import.meta.env.VITE_API_BASE_PATH },
  beforeRequest: (config) => ({
    ...config,
    headers: { ...config.headers, Authorization: getToken() }
  })
})
```

Do not modify `packages/request` to accommodate one backend's fields.

## Request cancellation

Every request creates an AbortController. You can use Axios's native `signal` option:

```ts
const controller = new AbortController()

request.get({ url: '/users', signal: controller.signal })
controller.abort()
```

You can also cancel requests by URL:

```ts
request.cancelRequest('/users')
request.cancelRequest(['/users', '/roles'])
request.cancelAllRequest()
```

Admin removes the `/mock` prefix from a mock URL when creating the cancellation key. Development mocks and real APIs therefore share the same business key.

## Working with CRUD

A CRUD Service receives an `AbortSignal` and passes it directly to Request:

```ts
const service = {
  async list(params, { signal }) {
    const { data } = await request.get<User[]>({
      url: '/users',
      params,
      signal
    })
    return { list: data }
  }
}
```

This lets route changes, repeated searches, and scope disposal actually terminate the underlying network request.

## Error-handling boundaries

- The application Request layer reports network errors, timeouts, and business errors.
- Pages handle only errors that need to change the business flow.
- Cancelled requests do not display an error message.
- A 401 clears the session; subsequent navigation returns to the sign-in page.
- Do not add repetitive `try/catch` blocks to every API when they only print the error.
