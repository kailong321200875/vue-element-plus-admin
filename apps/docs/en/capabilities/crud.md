# CRUD

`useCrud` from `@vea/hooks` handles only list and detail loading, create/update/delete operations, pagination, search, and selection state. It does not render a Table, Search area, Dialog, or Detail view. Pages can freely choose Element Plus, mobile cards, or another UI without working around business assumptions hidden inside a component.

## Define a Service first

The Service is the only adapter between page data and backend APIs:

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

When API fields differ, adapt them in the Service rather than putting a backend protocol into the shared hook.

## Using it in a page

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

The list loads when the component mounts by default. Outside a component context, it loads immediately. Pass `immediate: false` to load manually with `actions.fetchList()` instead.

## State

| State | Meaning |
| --- | --- |
| `page`, `pageSize`, `total` | Pagination state |
| `items`, `query` | Current list and search criteria |
| `current`, `currentKey` | Current detail and primary key |
| `selectedKeys` | Selected primary keys, automatically deduplicated |
| `listLoading`, `detailLoading` | Loading state for list and detail requests |
| `mutationLoading`, `mutationType` | Loading state and current type of write operation |
| `listError`, `detailError`, `mutationError` | Independent errors for the three request categories |

List, detail, and write operations keep separate loading and error states, so a save request cannot overwrite the entire list's error state.

## Common actions

| Action | Purpose |
| --- | --- |
| `fetchList()` | Loads the list with the current query and pagination |
| `refresh({ resetPage })` | Refreshes the list and can return to the first page |
| `search(query)` / `resetSearch()` | Replaces the query and loads from the first page |
| `fetchDetail(key)` / `clearDetail()` | Loads or clears the current detail |
| `create(input)` | Creates an item and refreshes the list |
| `update(key, input)` | Updates an item and refreshes the list |
| `remove(keys)` | Deletes in bulk, clears selection, and corrects the last-page index |
| `setPage()` / `setPageSize()` | Updates pagination and requests data automatically |
| `setSelection()`, `select()`, `unselect()`, `toggle()` | Manages selection state |
| `cancel(scope)` | Cancels `list`, `detail`, `mutation`, or all requests |
| `reset({ fetch })` | Restores initial state and can reload the list |

## Controlling refresh after writes

Create, update, and delete operations refresh the list after success by default:

```ts
await actions.update(id, input, { refresh: false })
await actions.create(input, { resetPage: true })
```

Disable the refresh when the page has already updated the list reliably in memory. Otherwise, prefer fetching again so the server remains the source of truth.

## Concurrency and cancellation

- A new list request cancels the previous list request; the same applies to detail requests.
- Even if the underlying request library does not react to cancellation, a stale result cannot overwrite newer data.
- Every Service method receives an `AbortSignal` and should pass it to the request layer.
- In-progress requests are cancelled automatically when the component scope is disposed.
- Multiple write operations may run concurrently; `mutationLoading` returns to `false` only after all of them finish.

An `AbortError` produced by cancellation is not stored in error state, but the Promise still rejects. Catch it when invoking an action directly if the business flow requires it.

## Configure only the capabilities you need

Only `list` is required. A read-only page can omit `create`, `update`, and `remove`; a page without detail data can omit `detail`. Calling an action that has not been configured throws an explicit error so wiring mistakes surface early.

## Responsibility boundaries

`useCrud` does not:

- Decide the appearance of the search area, table, or dialog.
- Map business response codes or display global error messages.
- Define button-level or field-level permissions.
- Infer the primary-key field automatically.

Those responsibilities belong to the page, the application Request layer, the permission system, and the business Service respectively. Clear boundaries are what make CRUD reusable across applications.
