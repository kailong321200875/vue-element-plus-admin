import assert from 'node:assert/strict'
import { effectScope, nextTick } from 'vue'
import { useCrud, type CrudListResult } from '../src/useCrud'

type Row = { id: number; name: string }
type Query = { name?: string }

const test = async (name: string, run: () => Promise<void>) => {
  await run()
  console.log(`✓ ${name}`)
}

await test('covers list, detail, mutations, pagination and selection', async () => {
  const rows: Row[] = [
    { id: 1, name: 'one' },
    { id: 2, name: 'two' },
    { id: 3, name: 'three' }
  ]
  const requests: Array<Query & { pageIndex: number; pageSize: number }> = []
  const scope = effectScope()
  const crud = scope.run(() =>
    useCrud<Row, Row, Query, Row, Pick<Row, 'name'>, number>({
      immediate: false,
      initialPage: 3,
      initialPageSize: 1,
      service: {
        list: async (params) => {
          requests.push(params)
          const filtered = params.name
            ? rows.filter(({ name }) => name.includes(params.name!))
            : rows
          const start = (params.pageIndex - 1) * params.pageSize
          return {
            list: filtered.slice(start, start + params.pageSize),
            total: filtered.length
          }
        },
        detail: async (id) => rows.find((row) => row.id === id)!,
        create: async (row) => {
          rows.push(row)
        },
        update: async (id, input) => {
          const row = rows.find((item) => item.id === id)!
          Object.assign(row, input)
        },
        remove: async (ids) => {
          ids.forEach((id) => {
            const index = rows.findIndex((row) => row.id === id)
            if (index >= 0) rows.splice(index, 1)
          })
        }
      }
    })
  )!
  const { state, actions } = crud

  await actions.fetchList()
  assert.deepEqual(state.items.value, [{ id: 3, name: 'three' }])

  await actions.fetchDetail(2)
  assert.deepEqual(state.current.value, { id: 2, name: 'two' })
  assert.equal(state.currentKey.value, 2)

  actions.select([2, 3, 3])
  actions.toggle(2)
  actions.select(1)
  assert.deepEqual(state.selectedKeys.value, [3, 1])
  assert.equal(actions.isSelected(3), true)

  await actions.create({ id: 4, name: 'four' })
  assert.equal(state.total.value, 4)

  await actions.update(3, { name: 'updated' })
  assert.deepEqual(state.items.value, [{ id: 3, name: 'updated' }])

  await actions.remove([3, 4, 4])
  assert.equal(state.page.value, 2)
  assert.deepEqual(state.items.value, [{ id: 2, name: 'two' }])
  assert.deepEqual(state.selectedKeys.value, [1])

  await actions.search({ name: 'two' })
  assert.equal(state.page.value, 1)
  assert.equal(requests.at(-1)?.name, 'two')
  assert.deepEqual(state.items.value, [{ id: 2, name: 'two' }])

  await actions.reset({ fetch: true })
  assert.equal(state.page.value, 3)
  assert.deepEqual(state.query.value, {})
  assert.deepEqual(state.selectedKeys.value, [])

  scope.stop()
})

await test('ignores stale requests and exposes AbortSignal to services', async () => {
  type Pending = {
    context: { signal: AbortSignal }
    resolve: (result: CrudListResult<Row>) => void
  }
  const pending: Pending[] = []
  const scope = effectScope()
  const crud = scope.run(() =>
    useCrud<Row>({
      immediate: false,
      service: {
        list: (_params, context) =>
          new Promise((resolve) => {
            pending.push({ context, resolve })
          })
      }
    })
  )!

  const first = crud.actions.fetchList()
  const second = crud.actions.fetchList()
  assert.equal(pending[0].context.signal.aborted, true)
  assert.equal(pending[1].context.signal.aborted, false)

  pending[1].resolve({ list: [{ id: 2, name: 'latest' }], total: 1 })
  await second
  pending[0].resolve({ list: [{ id: 1, name: 'stale' }], total: 1 })
  await assert.rejects(first, { name: 'AbortError' })

  assert.deepEqual(crud.state.items.value, [{ id: 2, name: 'latest' }])
  assert.equal(crud.state.listLoading.value, false)
  assert.equal(crud.state.listError.value, null)
  scope.stop()
})

await test('separates errors and supports opting out of refresh', async () => {
  let listCalls = 0
  const listError = new Error('list failed')
  const mutationError = new Error('create failed')
  const scope = effectScope()
  const crud = scope.run(() =>
    useCrud<Row, Row, Query, Row>({
      immediate: false,
      service: {
        list: async () => {
          listCalls += 1
          if (listCalls === 1) throw listError
          return { list: [], total: 0 }
        },
        create: async ({ id }) => {
          if (id === 1) throw mutationError
        }
      }
    })
  )!

  await assert.rejects(crud.actions.fetchList(), listError)
  assert.equal(crud.state.listError.value, listError)
  assert.equal(crud.state.mutationError.value, null)

  await assert.rejects(crud.actions.create({ id: 1, name: 'one' }), mutationError)
  assert.equal(crud.state.mutationError.value, mutationError)
  assert.equal(crud.state.listError.value, listError)

  await crud.actions.create({ id: 2, name: 'two' }, { refresh: false })
  assert.equal(listCalls, 1)

  crud.actions.setPage(2)
  await nextTick()
  await Promise.resolve()
  assert.equal(listCalls, 2)
  scope.stop()
})
