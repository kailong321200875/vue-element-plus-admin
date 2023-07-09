import { Table, TableExpose, TableProps, TableSetProps } from '@/components/Table'
import { ElTable, ElMessageBox, ElMessage } from 'element-plus'
import { ref, reactive, watch, computed, unref, nextTick, onMounted } from 'vue'
import { get } from 'lodash-es'
import { useI18n } from '@/hooks/web/useI18n'

const { t } = useI18n()

interface TableResponse<T = any> {
  total: number
  list: T[]
  pageNumber: number
  pageSize: number
}

interface UseTableConfig {
  // 是否初始化请求一次
  immediate?: boolean
  // 获取数据字段映射
  props?: {
    list?: string
    total?: string
  }
  fetchDataApi: () => Promise<{
    list: any[]
    total: number
  }>
  // getListApi: (option: any) => Promise<IResponse<TableResponse<T>>>
  // delListApi?: (option: any) => Promise<IResponse>
  // 返回数据格式配置
  // response: {
  //   list: string
  //   total?: string
  // }
  // 默认传递的参数
  // defaultParams?: Recordable
  // props?: TableProps
}

interface TableObject<T = any> {
  pageSize: number
  currentPage: number
  total: number
  list: T[]
  params: any
  loading: boolean
  currentRow: Nullable<T>
}

export const useTable = (config: UseTableConfig) => {
  const { immediate = true } = config

  const loading = ref(false)
  const pageIndex = ref(1)
  const pageSize = ref(10)
  const total = ref(0)
  const dataList = ref<any[]>([])

  const tableObject = reactive<TableObject>({
    // 页数
    pageSize: 10,
    // 当前页
    currentPage: 1,
    // 总条数
    total: 10,
    // 表格数据
    list: [],
    // AxiosConfig 配置
    params: {
      // ...(config?.defaultParams || {})
    },
    // 加载中
    loading: true,
    // 当前行的数据
    currentRow: null
  })

  const paramsObj = computed(() => {
    return {
      ...tableObject.params,
      pageSize: tableObject.pageSize,
      pageIndex: tableObject.currentPage
    }
  })

  // watch(
  //   () => tableObject.currentPage,
  //   () => {
  //     methods.getList()
  //   }
  // )

  // watch(
  //   () => tableObject.pageSize,
  //   () => {
  //     // 当前页不为1时，修改页数后会导致多次调用getList方法
  //     if (tableObject.currentPage === 1) {
  //       methods.getList()
  //     } else {
  //       tableObject.currentPage = 1
  //       methods.getList()
  //     }
  //   }
  // )

  onMounted(() => {
    if (immediate) {
      methods.getList()
    }
  })

  // Table实例
  const tableRef = ref<typeof Table & TableExpose>()

  // ElTable实例
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

  // const delData = async (ids: string[] | number[]) => {
  //   const res = await (config?.delListApi && config?.delListApi(ids))
  //   if (res) {
  //     ElMessage.success(t('common.delSuccess'))

  //     // 计算出临界点
  //     const currentPage =
  //       tableObject.total % tableObject.pageSize === ids.length || tableObject.pageSize === 1
  //         ? tableObject.currentPage > 1
  //           ? tableObject.currentPage - 1
  //           : tableObject.currentPage
  //         : tableObject.currentPage

  //     tableObject.currentPage = currentPage
  //     methods.getList()
  //   }
  // }

  const methods = {
    getList: async () => {
      loading.value = true
      try {
        const res = await config?.fetchDataApi()
        console.log('fetchDataApi res', res)
        if (res) {
          dataList.value = res.list
          total.value = res.total
        }
      } catch (err) {
        console.log('fetchDataApi error')
      } finally {
        loading.value = false
      }
      // const res = await config?.getListApi(unref(paramsObj)).finally(() => {
      //   tableObject.loading = false
      // })
      // if (res) {
      //   tableObject.list = get(res.data || {}, config?.response.list as string)
      //   tableObject.total = get(res.data || {}, config?.response?.total as string) || 0
      // }
    }
    // setProps: async (props: TableProps = {}) => {
    //   const table = await getTable()
    //   table?.setProps(props)
    // },
    // setColumn: async (columnProps: TableSetProps[]) => {
    //   const table = await getTable()
    //   table?.setColumn(columnProps)
    // },
    // getSelections: async () => {
    //   const table = await getTable()
    //   return (table?.selections || []) as T[]
    // },
    // // 与Search组件结合
    // setSearchParams: (data: Recordable) => {
    //   tableObject.currentPage = 1
    //   tableObject.params = Object.assign(tableObject.params, {
    //     pageSize: tableObject.pageSize,
    //     pageIndex: tableObject.currentPage,
    //     ...data
    //   })
    //   methods.getList()
    // },
    // // 删除数据
    // delList: async (ids: string[] | number[], multiple: boolean, message = true) => {
    //   const tableRef = await getTable()
    //   if (multiple) {
    //     if (!tableRef?.selections.length) {
    //       ElMessage.warning(t('common.delNoData'))
    //       return
    //     }
    //   } else {
    //     if (!tableObject.currentRow) {
    //       ElMessage.warning(t('common.delNoData'))
    //       return
    //     }
    //   }
    //   if (message) {
    //     ElMessageBox.confirm(t('common.delMessage'), t('common.delWarning'), {
    //       confirmButtonText: t('common.delOk'),
    //       cancelButtonText: t('common.delCancel'),
    //       type: 'warning'
    //     }).then(async () => {
    //       await delData(ids)
    //     })
    //   } else {
    //     await delData(ids)
    //   }
    // }
  }

  return {
    tableRegister: register,
    elTableRef,
    tableObject,
    methods,
    tableState: {
      pageIndex,
      pageSize,
      total,
      dataList,
      loading
    }
  }
}
