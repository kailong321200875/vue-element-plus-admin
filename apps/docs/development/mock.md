# Mock 与接口联调

Admin 使用 `vite-plugin-mock` 提供开发期接口，当前覆盖登录、退出、动态路由和首页分析数据。

## 启用条件

环境文件需要：

```dotenv
VITE_USE_MOCK=true
```

Mock 只在开发服务器中生效：

```bash
pnpm dev:admin
```

执行任何生产构建时都不会注册 Mock Server，即使 `.env.pro` 中设置了 `VITE_USE_MOCK=true` 也不例外。生产环境必须提供真实后端接口。

## 目录

```text
apps/admin/mock/
├─ user/index.mock.ts      # 登录、退出
├─ role/index.mock.ts      # 动态路由
└─ analysis/index.mock.ts  # 首页统计与图表
```

以下划线开头的文件会被插件忽略。

## 编写接口

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

Mock 也要遵循 Admin 的统一响应协议：

```ts
interface ApiResponse<Data> {
  code: number
  data: Data
  message?: string
}
```

成功码为 `0`。

## 当前测试账号

| 用户名  | 密码    |
| ------- | ------- |
| `admin` | `admin` |
| `test`  | `test`  |

Mock token 仅用于本地演示，没有过期时间和刷新机制。

## 与真实接口切换

关闭本地 Mock：

```dotenv
VITE_USE_MOCK=false
VITE_API_BASE_PATH=/api
```

`VITE_USE_MOCK=false` 只关闭本地请求拦截，不会改写 API URL。当前模板的接口路径是 `/mock/user/...`、`/mock/role/...` 和 `/mock/analysis/...`；如果真实后端不提供相同路径，还需要同步修改 `src/api` 中的 URL。

更理想的业务接入方式，是从一开始让 Mock 与真实后端使用同一组 URL，例如 Request 的 `baseURL` 设为 `/api`，API 模块只写 `/users`，Mock 也拦截 `/users`。这样环境切换才只需要配置，不需要改业务代码。

开发服务器会把 `/api` 代理到 `http://127.0.0.1:8000` 并移除 `/api` 前缀。换后端地址时修改 `vite.config.ts` 的 proxy，生产环境由网关或 Web Server 转发。

Request 的 `normalizeRequestKey()` 只移除取消 key 中的 `/mock` 前缀，不会改变实际请求地址。

## 动态路由 Mock

`role/index.mock.ts` 返回的是完整可访问路由树，而不是前端角色列表。至少确保：

- 顶层页面使用 `component: '#'` 挂载 Layout。
- 纯目录使用 `component: '##'`。
- 页面组件使用 `views/...`，不带扩展名。
- 子路由 path 使用相对写法。
- route name 全局唯一。
- `meta.icon` 已在当前 app 注册。

详见[动态路由与权限](/core/dynamic-routing)。

## 使用边界

Mock 用来缩短前后端并行开发反馈，不应模拟完整数据库、权限引擎或生产故障系统。复杂到需要维护状态机时，优先使用真实测试环境或独立 Mock 服务。

当前虽然安装了 `mockjs`，现有 Mock 没有使用它的数据生成 API。没有随机数据需求时，直接返回清晰的固定对象更容易调试。
