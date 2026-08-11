# @vea/hooks

## useCrud

`useCrud` 是与 UI、请求库和业务模型无关的 Vue 3 CRUD 控制器。页面只负责把后端接口适配为 `CrudService`，表格、弹窗、确认提示、权限和表单校验留在应用层。

```ts
import { useCrud, type CrudService } from '@vea/hooks'

type User = { id: number; name: string }
type UserQuery = { keyword?: string }
type CreateUser = Pick<User, 'name'>
type UpdateUser = Partial<CreateUser>

const service: CrudService<User, User, UserQuery, CreateUser, UpdateUser, number> = {
  list: async (params, { signal }) => {
    const result = await request.get('/users', { params, signal })
    return { list: result.data.items, total: result.data.total }
  },
  detail: (id, { signal }) => request.get(`/users/${id}`, { signal }),
  create: (input, { signal }) => request.post('/users', input, { signal }),
  update: (id, input, { signal }) => request.put(`/users/${id}`, input, { signal }),
  remove: (ids, { signal }) => request.delete('/users', { data: ids, signal })
}

const { state, actions } = useCrud({
  service,
  initialQuery: { keyword: '' },
  initialPageSize: 20
})
```

状态按职责分开：

- 列表：`items`、`total`、`page`、`pageSize`、`query`
- 详情：`current`、`currentKey`
- 选择：`selectedKeys`
- 请求状态：`listLoading`、`detailLoading`、`mutationLoading` 及对应错误

动作覆盖列表与详情读取、查询重置、分页、增改删、选择、取消请求和整体重置。增改删默认在成功后刷新列表，可通过 `{ refresh: false }` 关闭；删除最后一页数据时会自动回退到有效页码。

控制器会取消同类旧请求，并阻止不支持 `AbortSignal` 的请求库用过期响应覆盖新数据。它不包含表格列、表单 schema、弹窗状态、消息提示、权限、缓存或乐观更新，这些能力应由应用层按需组合。

## useForm

`useForm` 管理表单值、字段校验、错误、脏值、提交和重置，不负责渲染具体表单组件。

```ts
import { required, useForm } from '@vea/hooks'

const { state, actions } = useForm({
  initialValues: { username: '', password: '' },
  rules: {
    username: required('请输入用户名'),
    password: required('请输入密码')
  }
})

await actions.submit((values) => loginApi(values))
```

服务端字段错误可通过 `setErrors` 写入；`validateField` 可用于失焦校验。表单模型采用浅层快照，嵌套对象应整体替换，以便正确计算 `dirtyFields`。
