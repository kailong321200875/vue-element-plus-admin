# CRUD

`@vea/hooks` 的 `useCrud` 只封装列表、详情、增删改、分页、查询和选择状态，不渲染 Table、Search、Dialog 或 Detail。页面可以自由选择 Element Plus、移动端卡片或其他 UI，而不用绕过组件内部的业务假设。

## 先定义 Service

Service 是页面数据与后端接口之间唯一的适配层：

```ts
import type { CrudService } from '@vea/hooks'
import request from '@/request'

interface User {
  id: number
  name: string
  status: 'enabled' | 'disabled'
}

interface UserQuery extends Record<string, unknown> {
  keyword: string
  status?: User['status']
}

interface CreateUserInput {
  name: string
}

type UpdateUserInput = Partial<CreateUserInput> & Pick<User, 'status'>

export const userService: CrudService<
  User,
  User,
  UserQuery,
  CreateUserInput,
  UpdateUserInput,
  number
> = {
  async list(params, { signal }) {
    const response = await request.get<{ list: User[]; total: number }>({
      url: '/users',
      params,
      signal
    })
    return response.data
  },
  async detail(id, { signal }) {
    const response = await request.get<User>({ url: `/users/${id}`, signal })
    return response.data
  },
  create: (data, { signal }) => request.post({ url: '/users', data, signal }),
  update: (id, data, { signal }) => request.put({ url: `/users/${id}`, data, signal }),
  remove: (ids, { signal }) => request.delete({ url: '/users', data: { ids }, signal })
}
```

接口字段不一致时在 Service 中转换，不要把后端协议塞进通用 Hook。

## 在页面中使用

```ts
import { useCrud } from '@vea/hooks'
import { userService } from './service'

const { state, actions } = useCrud({
  service: userService,
  initialQuery: { keyword: '', status: undefined },
  initialPageSize: 20
})

const search = (keyword: string) => {
  return actions.search({ ...state.query.value, keyword })
}

const removeSelected = () => actions.remove(state.selectedKeys.value)
```

默认在组件挂载时加载列表。非组件环境会立即加载；传入 `immediate: false` 可以改为手动调用 `actions.fetchList()`。

## 状态

| 状态                                        | 含义                     |
| ------------------------------------------- | ------------------------ |
| `page`、`pageSize`、`total`                 | 分页状态                 |
| `items`、`query`                            | 当前列表与查询条件       |
| `current`、`currentKey`                     | 当前详情与主键           |
| `selectedKeys`                              | 当前选中的主键，自动去重 |
| `listLoading`、`detailLoading`              | 列表与详情请求状态       |
| `mutationLoading`、`mutationType`           | 增改删请求状态与当前类型 |
| `listError`、`detailError`、`mutationError` | 三类请求各自的错误       |

列表、详情和写操作的 loading/error 分开，避免一个保存请求把整个列表错误态覆盖掉。

## 常用动作

| 动作 | 作用 |
| --- | --- |
| `fetchList()` | 使用当前查询与分页加载列表 |
| `refresh({ resetPage })` | 刷新，可选回到第一页 |
| `search(query)` / `resetSearch()` | 替换查询条件并从第一页加载 |
| `fetchDetail(key)` / `clearDetail()` | 加载或清空详情 |
| `create(input)` | 新增后刷新列表 |
| `update(key, input)` | 更新后刷新列表 |
| `remove(keys)` | 批量删除、清理选择并修正末页页码 |
| `setPage()` / `setPageSize()` | 更新分页并自动请求 |
| `setSelection()`、`select()`、`unselect()`、`toggle()` | 管理选择状态 |
| `cancel(scope)` | 取消 `list`、`detail`、`mutation` 或全部请求 |
| `reset({ fetch })` | 恢复初始状态，可选重新加载 |

## 控制写操作后的刷新

新增、更新、删除默认成功后刷新列表：

```ts
await actions.update(id, input, { refresh: false })
await actions.create(input, { resetPage: true })
```

当页面已在本地可靠地更新列表时可关闭刷新；否则优先重新请求，保持服务端为数据真相来源。

## 并发与取消

- 新的列表请求会取消旧列表请求，新的详情请求也会取消旧详情请求。
- 即使底层请求库未响应取消，旧请求结果也不会覆盖更新的数据。
- Service 的每个方法都收到 `AbortSignal`，应继续传给请求层。
- 组件作用域销毁时，进行中的请求会自动取消。
- 多个写操作可以并行，`mutationLoading` 会在全部结束后才恢复。

取消产生的 `AbortError` 不会写入错误状态，但 Promise 仍会 reject；主动调用动作时可按业务需要捕获。

## 能力按需配置

只有 `list` 是必需的。只读页面可以不配置 `create`、`update`、`remove`；没有详情时也可以省略 `detail`。如果调用了未配置的动作，Hook 会抛出明确错误，便于尽早发现接线问题。

## 使用边界

`useCrud` 不负责：

- 决定搜索区、表格和弹窗长什么样。
- 映射业务响应码或展示全局错误消息。
- 定义按钮权限和字段权限。
- 自动推断主键字段。

这些职责分别属于页面、应用 Request、权限系统和业务 Service。保持边界清楚，CRUD 才能在多个应用复用。
