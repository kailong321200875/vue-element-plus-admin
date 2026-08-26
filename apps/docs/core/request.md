# Request 请求管理

请求能力分为共享客户端和 Admin 应用配置两层：

```text
packages/request          通用生命周期、取消、Hooks
        ↑
apps/admin/src/request    baseURL、token、响应码、UI 错误提示
        ↑
apps/admin/src/api        领域接口和业务类型
```

## 为什么分两层

`@vea/request` 不读取 Pinia、不弹消息，也不知道业务成功码。它可以被多个应用复用。

`@/request` 属于 Admin，负责：

- 从环境变量读取 `baseURL`。
- 设置超时时间与 JSON Content-Type。
- 从 User Store 注入 token。
- 解析统一业务响应。
- 处理 401 并清理会话。
- 使用 Element Plus 展示错误。

## 响应契约

Admin 默认响应结构：

```ts
export interface ApiResponse<Data = unknown> {
  code: number
  data: Data
  message?: string
}
```

`code === 0` 表示成功。Blob 响应会直接返回 AxiosResponse，不执行该业务码判断。

## 定义 API

接口按领域放在 `src/api`：

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

API URL 相对于 `VITE_API_BASE_PATH`。例如 baseURL 为 `/api`、这里写 `/users`，最终请求地址就是 `/api/users`，不要在两处重复前缀。

调用结果保持统一响应类型：

```ts
const { data } = await getUsersApi(1, 20)
```

领域类型写在同级 `types.ts`，不要在 Request 层维护所有业务模型。

## 可用方法

应用实例提供：

```ts
request.get<Data>(config)
request.post<Data>(config)
request.put<Data>(config)
request.delete<Data>(config)
request.cancelRequest(url)
request.cancelAllRequest()
```

`config` 继承 AxiosRequestConfig，可使用 `params`、`data`、`headers`、`signal`、`responseType` 等原生选项。

## 通用客户端配置

`createRequest()` 支持：

| 选项                | 作用                   |
| ------------------- | ---------------------- |
| `axiosConfig`       | 传给 `axios.create`    |
| `beforeRequest`     | 请求前异步加工配置     |
| `transformResponse` | 统一转换响应           |
| `onError`           | 统一错误处理           |
| `getRequestKey`     | 生成取消请求使用的 key |

如果新增另一个应用，应创建自己的实例：

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

不要直接修改 `packages/request` 来适配单个后端的字段。

## 取消请求

每次请求都会创建 AbortController。可以使用 Axios 原生 `signal`：

```ts
const controller = new AbortController()

request.get({ url: '/users', signal: controller.signal })
controller.abort()
```

也可以按 URL 取消：

```ts
request.cancelRequest('/users')
request.cancelRequest(['/users', '/roles'])
request.cancelAllRequest()
```

Admin 会把 Mock URL 的 `/mock` 前缀移除后作为取消 key，保证开发 Mock 和真实接口切换时使用相同的业务 key。

## 与 CRUD 配合

CRUD Service 会收到 `AbortSignal`，直接传给 Request：

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

这样页面切换、重复查询和作用域销毁时，可以真正终止底层网络请求。

## 错误处理边界

- 网络错误、超时和业务错误由应用 Request 统一提示。
- 页面只处理需要改变业务流程的错误。
- 取消请求不会显示错误消息。
- 401 会清空会话，后续导航回到登录页。
- 不要在每个 API 中重复 `try/catch` 后只打印错误。
