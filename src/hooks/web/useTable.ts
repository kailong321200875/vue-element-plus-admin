import { Table, TableExpose } from '@/components/Table'
import { ElTable } from 'element-plus'
import { ref, reactive, watch, computed, unref, nextTick } from 'vue'
import { AxiosPromise } from 'axios'
import { get, assign } from 'lodash-es'
import type { TableProps } from '@/components/Table/src/types'

interface UseTableConfig<T, L> {
  getListApi: (option: L) => AxiosPromise<T>
  // 返回数据格式配置
  response: {
    list: string
    total?: string
  }
}

interface TableObject<K, L> {
  pageSize: number
  currentPage: number
  total: number
  tableList: K[]
  parmasObj: L
  loading: boolean
}

export const useTable = <T, K, L extends AxiosConfig = AxiosConfig>(
  config?: UseTableConfig<T, L>
) => {
  const tableObject = reactive<TableObject<K, L>>({
    // 页数
    pageSize: 10,
    // 当前页
    currentPage: 1,
    // 总条数
    total: 10,
    // 表格数据
    tableList: [],
    // AxiosConfig 配置
    parmasObj: {} as L,
    // 加载中
    loading: true
  })

  const parmasObj = computed(() => {
    return assign(
      {
        params: {
          pageSize: tableObject.pageSize,
          pageIndex: tableObject.currentPage
        }
      },
      tableObject.parmasObj
    )
  })

  watch(
    () => tableObject.currentPage,
    () => {
      methods.getList()
    }
  )

  watch(
    () => tableObject.pageSize,
    () => {
      tableObject.currentPage = 1
      methods.getList()
    }
  )

  // Table实例
  const tableRef = ref<typeof Table & TableExpose>()

  // ElTable实例
  const elTableRef = ref<ComponentRef<typeof ElTable>>()

  const register = (ref: typeof Table & TableExpose, elRef: ComponentRef<typeof ElTable>) => {
    tableRef.value = ref
    elTableRef.value = elRef
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
    getList: async () => {
      tableObject.loading = true
      const res = await config
        ?.getListApi(unref(parmasObj) as L)
        .catch(() => {})
        .finally(() => {
          tableObject.loading = false
        })
      if (res) {
        tableObject.tableList = get(res.data || {}, config?.response.list as string)
        tableObject.total = get(res.data || {}, config?.response?.total as string) || 0
      }
    },
    setProps: async (props: TableProps = {}) => {
      const table = await getTable()
      table?.setProps(props)
    }
  }

  return {
    register,
    tableObject,
    methods
  }
}
