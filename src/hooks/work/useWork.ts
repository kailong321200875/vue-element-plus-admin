import { reactive, ref } from 'vue'
import { ElMessageBox } from 'element-plus'
import { Message } from '_c/Message'

interface DefalutParams {
  pageIndex: number // 页码
  pageSize: number // 页数
}

interface DelsParmas {
  noDataText?: string // 没有选中数据时的提示
  text?: string // 删除前的提示
  hiddenVerify?: boolean // 是否隐藏前置判断
}

interface InitOption {
  listFun?: Fn
  delFun?: Fn
}

interface DilogOption {
  title?: string
  width?: string
}

export function useWork(option?: InitOption) {
  const listFun: Nullable<Fn> = option?.listFun || null

  const delFun: Nullable<Fn> = option?.delFun || null

  // 请求接口的基本参数
  const defaultParams = reactive<DefalutParams>({
    pageIndex: 1,
    pageSize: 10
  })

  // 多选数据
  const selectionData = ref<IObj>([])

  // 表格数据
  const tableData = ref<IObj>([])

  // 表格加载状态
  const loading = ref<boolean>(true)

  // 表格总条数
  const total = ref<number>(0)

  // 是否展示弹窗
  const dialogVisible = ref<boolean>(false)

  // 弹窗标题
  const dialogTitle = ref<string>('')

  // 组件名称
  const comName = ref<string>('')

  // 弹窗宽度
  const dialogWidth = ref<string>('')

  // 传送的数据
  const rowData = ref<Nullable<IObj>>(null)

  // 需要传给后端的其他参数
  const otherParams = ref<Nullable<IObj>>({})

  // 表格展示条目改变时候重置基本参数
  function sizeChange(val: number) {
    loading.value = true
    defaultParams.pageIndex = 1
    defaultParams.pageSize = val
  }

  // 表格分页改变时候重置基本参数
  function currentChange(val: number) {
    loading.value = true
    defaultParams.pageIndex = val
  }

  // 删除多选
  /**
   * @param {Object} callBack
   * @param {Object} config {
        noDataText?: string // 没有选中数据时的提示
        text?: string // 删除前的提示
        hiddenVerify?: boolean // 是否隐藏前置判断
      }
   */
  function delData(callBack: Fn, config: DelsParmas) {
    if (!selectionData.value.length && config && !config.hiddenVerify) {
      Message.warning((config && config.noDataText) || '请选择需要删除的数据！')
      return
    }
    ElMessageBox.confirm((config && config.text) || '此操作将永久删除选中数据, 是否继续?', '提示', {
      confirmButtonText: '确定',
      cancelButtonText: '取消',
      type: 'warning'
    }).then(async () => {
      await callBack()
    })
  }

  // 多选变化的时候
  function handleSelectionChange(selection: IObj) {
    selectionData.value = selection
  }

  // 改变弹窗dialogVisible
  function toggleVisible(val = false) {
    dialogVisible.value = val
  }

  // 以下都是业务逻辑混入
  // 请求数据
  async function getList(data?: IObj) {
    try {
      const res = await (listFun as Fn)({
        params: Object.assign(otherParams.value, data || {}, defaultParams)
      })
      if (res) {
        // 返回结果可以自己更改
        console.log(res)
        total.value = res.data.total
        tableData.value = res.data.list
      }
    } finally {
      loading.value = false
    }
  }

  // 查询
  function searchSubmit(data: IObj) {
    // 该方法重置了一些默认参数
    currentChange(1)
    getList(data)
  }

  // 重置
  function resetSubmit(data: IObj) {
    // 该方法重置了一些默认参数
    currentChange(1)
    getList(data)
  }

  // 展示多少条
  function handleSizeChange(val: number) {
    // 该方法重置了一些默认参数
    sizeChange(val)
    getList()
  }

  // 展示第几页
  function handleCurrentChange(val: number) {
    // 该方法重置了一些默认参数
    currentChange(val)
    getList()
  }

  // 删除多选
  function dels(item: IObj, single: boolean, callback: Fn) {
    delData(
      async () => {
        let ids: Nullable<IObj[]> = null
        if (item.id) {
          ids = single ? item.id : [item.id]
        } else {
          ids = selectionData.value.map((v: IObj) => {
            return v.id
          })
        }
        const res = await (delFun as Fn)({
          data: { ids }
        })
        if (res) {
          Message.success('删除成功')
          const pageIndex =
            total.value % defaultParams.pageSize === (ids as IObj[]).length ||
            defaultParams.pageSize === 1
              ? defaultParams.pageIndex > 1
                ? defaultParams.pageIndex - 1
                : defaultParams.pageIndex
              : defaultParams.pageIndex
          currentChange(pageIndex)
          getList()
          callback && callback instanceof Function && callback()
        }
      },
      { hiddenVerify: item.id }
    )
  }

  // 打开弹窗
  function open(row: IObj, component: string, options: DilogOption) {
    comName.value = component
    dialogTitle.value =
      (options && options.title) || (!row ? '新增' : component === 'Detail' ? '详情' : '编辑')
    dialogWidth.value = (options && options.width) || '55%'
    rowData.value = row || null
    toggleVisible(true)
  }

  // 成功之后的回调
  function refreshTable(type: string) {
    if (type === 'add') {
      currentChange(1)
    }
    toggleVisible()
    getList()
  }

  return {
    defaultParams,
    selectionData,
    tableData,
    loading,
    total,
    dialogVisible,
    dialogTitle,
    comName,
    dialogWidth,
    rowData,
    otherParams,
    // delData,
    handleSelectionChange,
    toggleVisible,
    getList,
    searchSubmit,
    resetSubmit,
    handleSizeChange,
    handleCurrentChange,
    dels,
    open,
    refreshTable
  }
}
