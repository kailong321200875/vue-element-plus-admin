import { Table, TableExpose, TableProps, TableSetProps, TableColumn } from '@/components/Table'
import { ElTable } from 'element-plus'
import { ref, watch, unref, nextTick, onMounted } from 'vue'

interface UseTableConfig {
  /**
   * 是否初始化的时候请求一次
   */
  immediate?: boolean
  fetchDataApi: () => Promise<{
    list: any[]
    total: number
  }>
}

export const useTable = (config: UseTableConfig) => {
  const { immediate = true } = config

  const loading = ref(false)
  const currentPage = ref(1)
  const pageSize = ref(10)
  const total = ref(0)
  const dataList = ref<any[]>([])

  watch(
    () => currentPage.value,
    () => {
      methods.getList()
    }
  )

  watch(
    () => pageSize.value,
    () => {
      // 当前页不为1时，修改页数后会导致多次调用getList方法
      if (unref(currentPage) === 1) {
        methods.getList()
      } else {
        currentPage.value = 1
        methods.getList()
      }
    }
  )

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
    /**
     * 获取表单数据
     */
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
    },

    /**
     * @description 设置table组件的props
     * @param props table组件的props
     */
    setProps: async (props: TableProps = {}) => {
      const table = await getTable()
      table?.setProps(props)
    },

    /**
     * @description 设置column
     * @param columnProps 需要设置的列
     */
    setColumn: async (columnProps: TableSetProps[]) => {
      const table = await getTable()
      table?.setColumn(columnProps)
    },

    /**
     * @description 新增column
     * @param tableColumn 需要新增数据
     * @param index 在哪里新增
     */
    addColumn: async (tableColumn: TableColumn, index?: number) => {
      const table = await getTable()
      table?.addColumn(tableColumn, index)
    },

    /**
     * @description 删除column
     * @param field 删除哪个数据
     */
    delColumn: async (field: string) => {
      const table = await getTable()
      table?.delColumn(field)
    },

    /**
     * @description 获取ElTable组件的实例
     * @returns ElTable instance
     */
    getElTableExpose: async () => {
      await getTable()
      return unref(elTableRef)
    },

    refresh: () => {
      methods.getList()
    }
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
    tableMethods: methods,
    tableState: {
      currentPage,
      pageSize,
      total,
      dataList,
      loading
    }
  }
}
