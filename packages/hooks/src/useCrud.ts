import {
  getCurrentInstance,
  getCurrentScope,
  nextTick,
  onMounted,
  onScopeDispose,
  ref,
  watch,
  type Ref
} from 'vue'

export type CrudKey = string | number
export type CrudQuery = Record<string, unknown>
export type CrudMutation = 'create' | 'update' | 'remove'
export type CrudRequestScope = 'list' | 'detail' | 'mutation' | 'all'

export interface CrudPagination {
  pageIndex: number
  pageSize: number
}

export type CrudListParams<Query extends CrudQuery> = Query & CrudPagination

export interface CrudListResult<Row> {
  list: Row[]
  total?: number
}

export interface CrudRequestContext {
  signal: AbortSignal
}

export interface CrudService<
  Row,
  Detail = Row,
  Query extends CrudQuery = CrudQuery,
  CreateInput = Partial<Row>,
  UpdateInput = Partial<Row>,
  Key extends CrudKey = CrudKey
> {
  list: (params: CrudListParams<Query>, context: CrudRequestContext) => Promise<CrudListResult<Row>>
  detail?: (key: Key, context: CrudRequestContext) => Promise<Detail>
  create?: (input: CreateInput, context: CrudRequestContext) => Promise<unknown>
  update?: (key: Key, input: UpdateInput, context: CrudRequestContext) => Promise<unknown>
  remove?: (keys: Key[], context: CrudRequestContext) => Promise<unknown>
}

export interface UseCrudOptions<
  Row,
  Detail = Row,
  Query extends CrudQuery = CrudQuery,
  CreateInput = Partial<Row>,
  UpdateInput = Partial<Row>,
  Key extends CrudKey = CrudKey
> {
  service: CrudService<Row, Detail, Query, CreateInput, UpdateInput, Key>
  immediate?: boolean
  initialQuery?: Query
  initialPage?: number
  initialPageSize?: number
}

export interface CrudRefreshOptions {
  resetPage?: boolean
}

export interface CrudMutationOptions extends CrudRefreshOptions {
  refresh?: boolean
}

export interface CrudResetOptions {
  fetch?: boolean
}

const abortError = () =>
  Object.assign(new Error('The operation was aborted'), { name: 'AbortError' })

const isAbortError = (error: unknown) => error instanceof Error && error.name === 'AbortError'

const normalizePageValue = (value: number) =>
  Number.isFinite(value) ? Math.max(1, Math.trunc(value)) : 1

export const useCrud = <
  Row,
  Detail = Row,
  Query extends CrudQuery = CrudQuery,
  CreateInput = Partial<Row>,
  UpdateInput = Partial<Row>,
  Key extends CrudKey = CrudKey
>(
  options: UseCrudOptions<Row, Detail, Query, CreateInput, UpdateInput, Key>
) => {
  const createInitialQuery = () => ({ ...(options.initialQuery ?? ({} as Query)) }) as Query
  const initialPage = normalizePageValue(options.initialPage ?? 1)
  const initialPageSize = normalizePageValue(options.initialPageSize ?? 10)

  const page = ref(initialPage)
  const pageSize = ref(initialPageSize)
  const total = ref(0)
  const items = ref<Row[]>([]) as Ref<Row[]>
  const query = ref(createInitialQuery()) as Ref<Query>
  const current = ref<Detail | null>(null) as Ref<Detail | null>
  const currentKey = ref<Key | null>(null) as Ref<Key | null>
  const selectedKeys = ref<Key[]>([]) as Ref<Key[]>

  const listLoading = ref(false)
  const detailLoading = ref(false)
  const mutationLoading = ref(false)
  const mutationType = ref<CrudMutation | null>(null)

  const listError = ref<unknown>(null)
  const detailError = ref<unknown>(null)
  const mutationError = ref<unknown>(null)

  let listRequest = 0
  let detailRequest = 0
  let listController: AbortController | undefined
  let detailController: AbortController | undefined
  let activeMutations = 0
  let skipNextPaginationFetch = false
  const mutationControllers = new Set<AbortController>()

  const fetchList = async () => {
    const request = ++listRequest
    listController?.abort()
    const controller = new AbortController()
    listController = controller
    listLoading.value = true
    listError.value = null

    try {
      const result = await options.service.list(
        {
          ...query.value,
          pageIndex: page.value,
          pageSize: pageSize.value
        } as CrudListParams<Query>,
        { signal: controller.signal }
      )

      if (controller.signal.aborted) throw abortError()
      if (request === listRequest) {
        items.value = result.list
        total.value = result.total ?? result.list.length
      }
      return result
    } catch (error) {
      if (request === listRequest && !isAbortError(error)) {
        listError.value = error
      }
      throw error
    } finally {
      if (request === listRequest) {
        listLoading.value = false
        listController = undefined
      }
    }
  }

  const refresh = async ({ resetPage = false }: CrudRefreshOptions = {}) => {
    if (resetPage && page.value !== 1) {
      skipNextPaginationFetch = true
      page.value = 1
      await nextTick()
    }
    return fetchList()
  }

  const search = async (params: Query) => {
    query.value = { ...params }
    return refresh({ resetPage: true })
  }

  const resetSearch = () => search(createInitialQuery())

  const fetchDetail = async (key: Key) => {
    if (!options.service.detail) {
      const error = new Error('detail is not configured')
      detailError.value = error
      throw error
    }

    const request = ++detailRequest
    detailController?.abort()
    const controller = new AbortController()
    detailController = controller
    currentKey.value = key
    detailLoading.value = true
    detailError.value = null

    try {
      const result = await options.service.detail(key, { signal: controller.signal })
      if (controller.signal.aborted) throw abortError()
      if (request === detailRequest) current.value = result
      return result
    } catch (error) {
      if (request === detailRequest && !isAbortError(error)) {
        detailError.value = error
      }
      throw error
    } finally {
      if (request === detailRequest) {
        detailLoading.value = false
        detailController = undefined
      }
    }
  }

  const runMutation = async <Result>(
    type: CrudMutation,
    action: ((context: CrudRequestContext) => Promise<Result>) | undefined,
    mutationOptions: CrudMutationOptions,
    afterSuccess = () => refresh({ resetPage: mutationOptions.resetPage })
  ) => {
    if (!action) {
      const error = new Error(`${type} is not configured`)
      mutationError.value = error
      throw error
    }

    const controller = new AbortController()
    mutationControllers.add(controller)
    activeMutations += 1
    mutationLoading.value = true
    mutationType.value = type
    mutationError.value = null

    let result: Result
    try {
      result = await action({ signal: controller.signal })
      if (controller.signal.aborted) throw abortError()
    } catch (error) {
      if (!isAbortError(error)) mutationError.value = error
      throw error
    } finally {
      mutationControllers.delete(controller)
      activeMutations -= 1
      mutationLoading.value = activeMutations > 0
      if (activeMutations === 0) mutationType.value = null
    }

    if (mutationOptions.refresh !== false) await afterSuccess()
    return result
  }

  const create = (input: CreateInput, mutationOptions: CrudMutationOptions = {}) =>
    runMutation(
      'create',
      options.service.create ? (context) => options.service.create!(input, context) : undefined,
      mutationOptions
    )

  const update = (key: Key, input: UpdateInput, mutationOptions: CrudMutationOptions = {}) =>
    runMutation(
      'update',
      options.service.update
        ? (context) => options.service.update!(key, input, context)
        : undefined,
      mutationOptions
    )

  const remove = async (keys: Key[], mutationOptions: CrudMutationOptions = {}) => {
    const uniqueKeys = [...new Set(keys)]
    if (uniqueKeys.length === 0) return undefined

    const result = await runMutation(
      'remove',
      options.service.remove
        ? (context) => options.service.remove!(uniqueKeys, context)
        : undefined,
      { ...mutationOptions, refresh: false }
    )

    const removed = new Set(uniqueKeys)
    selectedKeys.value = selectedKeys.value.filter((key) => !removed.has(key))

    if (mutationOptions.refresh !== false) {
      const lastPage = Math.max(
        1,
        Math.ceil(Math.max(0, total.value - uniqueKeys.length) / pageSize.value)
      )
      const targetPage = mutationOptions.resetPage ? 1 : Math.min(page.value, lastPage)

      if (page.value !== targetPage) {
        skipNextPaginationFetch = true
        page.value = targetPage
        await nextTick()
      }
      await fetchList()
    }

    return result
  }

  const setPage = (value: number) => {
    page.value = normalizePageValue(value)
  }

  const setPageSize = (value: number) => {
    pageSize.value = normalizePageValue(value)
  }

  const toKeys = (keys: Key | readonly Key[]) =>
    (Array.isArray(keys) ? keys : [keys]) as readonly Key[]

  const setSelection = (keys: readonly Key[]) => {
    selectedKeys.value = [...new Set(keys)]
  }

  const select = (keys: Key | readonly Key[]) => {
    setSelection([...selectedKeys.value, ...toKeys(keys)])
  }

  const unselect = (keys: Key | readonly Key[]) => {
    const removing = new Set(toKeys(keys))
    selectedKeys.value = selectedKeys.value.filter((key) => !removing.has(key))
  }

  const toggle = (key: Key) => {
    if (selectedKeys.value.includes(key)) unselect(key)
    else select(key)
  }

  const isSelected = (key: Key) => selectedKeys.value.includes(key)

  const clearSelection = () => {
    selectedKeys.value = []
  }

  const clearDetail = () => {
    detailRequest += 1
    detailController?.abort()
    detailController = undefined
    detailLoading.value = false
    detailError.value = null
    current.value = null
    currentKey.value = null
  }

  const cancel = (scope: CrudRequestScope = 'all') => {
    if (scope === 'list' || scope === 'all') {
      listRequest += 1
      listController?.abort()
      listController = undefined
      listLoading.value = false
    }
    if (scope === 'detail' || scope === 'all') {
      detailRequest += 1
      detailController?.abort()
      detailController = undefined
      detailLoading.value = false
    }
    if (scope === 'mutation' || scope === 'all') {
      mutationControllers.forEach((controller) => controller.abort())
    }
  }

  const reset = async ({ fetch = false }: CrudResetOptions = {}) => {
    cancel()
    const paginationChanged = page.value !== initialPage || pageSize.value !== initialPageSize
    if (paginationChanged) skipNextPaginationFetch = true

    page.value = initialPage
    pageSize.value = initialPageSize
    total.value = 0
    items.value = []
    query.value = createInitialQuery()
    current.value = null
    currentKey.value = null
    selectedKeys.value = []
    listError.value = null
    detailError.value = null
    mutationError.value = null
    await nextTick()

    if (fetch) return fetchList()
    return undefined
  }

  watch([page, pageSize], ([nextPage, nextSize], [, previousSize]) => {
    if (skipNextPaginationFetch) {
      skipNextPaginationFetch = false
      return
    }
    if (nextSize !== previousSize && nextPage !== 1) {
      page.value = 1
      return
    }
    void fetchList().catch(() => undefined)
  })

  const start = () => void fetchList().catch(() => undefined)
  if (options.immediate !== false) {
    if (getCurrentInstance()) onMounted(start)
    else start()
  }

  if (getCurrentScope()) onScopeDispose(() => cancel())

  return {
    state: {
      page,
      pageSize,
      total,
      items,
      query,
      current,
      currentKey,
      selectedKeys,
      listLoading,
      detailLoading,
      mutationLoading,
      mutationType,
      listError,
      detailError,
      mutationError
    },
    actions: {
      fetchList,
      refresh,
      search,
      resetSearch,
      fetchDetail,
      clearDetail,
      create,
      update,
      remove,
      setPage,
      setPageSize,
      setSelection,
      select,
      unselect,
      toggle,
      isSelected,
      clearSelection,
      cancel,
      reset
    }
  }
}
