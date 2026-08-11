import { useI18n } from 'vue-i18n'
import { Table, TableExpose, TableProps, TableSetProps, TableColumn } from '@/components/Table'
import { ElTable, ElMessageBox, ElMessage } from 'element-plus'
import { reactive, ref, unref, nextTick } from 'vue'
import {
  useCrud,
  type CrudKey,
  type CrudListParams,
  type CrudListResult,
  type CrudQuery
} from '@vea/hooks'

export interface UseTableConfig<Row, Query extends CrudQuery = CrudQuery> {
  immediate?: boolean
  initialQuery?: Query
  initialPageSize?: number
  fetchDataApi: (params: CrudListParams<Query>) => Promise<CrudListResult<Row>>
  fetchDelApi?: (ids: CrudKey[]) => Promise<unknown>
}

export const useTable = <Row = any, Query extends CrudQuery = CrudQuery>(
  config: UseTableConfig<Row, Query>
) => {
  const { t } = useI18n()

  const { state, actions } = useCrud<Row, Row, Query>({
    service: {
      list: (params) => config.fetchDataApi(params),
      remove: config.fetchDelApi ? (ids) => config.fetchDelApi!(ids) : undefined
    },
    immediate: config.immediate,
    initialQuery: config.initialQuery,
    initialPageSize: config.initialPageSize
  })

  const crudState = reactive({
    currentPage: state.page,
    pageSize: state.pageSize,
    total: state.total,
    dataList: state.items,
    query: state.query,
    loading: state.listLoading,
    mutating: state.mutationLoading,
    error: state.listError
  })

  const crudMethods = {
    getList: actions.fetchList,
    refresh: (resetPage = false) => actions.refresh({ resetPage }),
    search: actions.search,
    resetSearch: actions.resetSearch,
    create: actions.create,
    update: actions.update,
    remove: actions.remove
  }

  const tableRef = ref<typeof Table & TableExpose>()
  const elTableRef = ref<ComponentRef<typeof ElTable>>()

  const register = (ref: typeof Table & TableExpose, elRef: ComponentRef<typeof ElTable>) => {
    tableRef.value = ref
    elTableRef.value = unref(elRef)
  }

  const getTable = async () => {
    await nextTick()
    const table = unref(tableRef)
    if (!table) {
      console.error('The table is not registered. Please use the register method to register')
    }
    return table
  }

  const methods = {
    ...crudMethods,

    setProps: async (props: TableProps = {}) => {
      const table = await getTable()
      table?.setProps(props)
    },

    setColumn: async (columnProps: TableSetProps[]) => {
      const table = await getTable()
      table?.setColumn(columnProps)
    },

    addColumn: async (tableColumn: TableColumn, index?: number) => {
      const table = await getTable()
      table?.addColumn(tableColumn, index)
    },

    delColumn: async (field: string) => {
      const table = await getTable()
      table?.delColumn(field)
    },

    getElTableExpose: async () => {
      await getTable()
      return unref(elTableRef)
    },

    delList: async (ids: CrudKey[]) => {
      if (!config.fetchDelApi) {
        console.warn('fetchDelApi is undefined')
        return false
      }
      if (ids.length === 0) return false

      try {
        await ElMessageBox.confirm(t('common.delMessage'), t('common.delWarning'), {
          confirmButtonText: t('common.delOk'),
          cancelButtonText: t('common.delCancel'),
          type: 'warning'
        })
      } catch {
        return false
      }

      await crudMethods.remove(ids)
      ElMessage.success(t('common.delSuccess'))
      return true
    }
  }

  return {
    tableRegister: register,
    tableMethods: methods,
    tableState: crudState
  }
}
