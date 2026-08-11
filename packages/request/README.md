# @vea/request

UI-independent Axios client for shared request behavior.

```ts
import { createRequest } from '@vea/request'

const request = createRequest({
  axiosConfig: { baseURL: '/api', timeout: 60_000 },
  beforeRequest: (config) => ({
    ...config,
    headers: { ...config.headers, Authorization: getToken() }
  }),
  transformResponse: (response) => response.data,
  onError: (error) => reportError(error)
})

const user = await request.get<User>({ url: '/users/1' })
```

Use `AbortSignal` for local cancellation, `cancelRequest` for a request key and `cancelAllRequest` for application-wide teardown. Authentication stores, UI messages, business success codes and logout behavior belong to the consuming application.
