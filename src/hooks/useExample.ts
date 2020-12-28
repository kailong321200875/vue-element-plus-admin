// 常用的增删改查 hook
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

export function useExample() {
  // 请求接口的基本参数
  const defalutParams = reactive<DefalutParams>({
    pageIndex: 1,
    pageSize: 10
  })

  // 多选数据
  const selectionData = ref<any[]>([])

  // 表格数据
  const tableData = ref<any[]>([])

  // 表格加载状态
  const loading = ref<boolean>(true)

  // 表格总条数
  const total = ref<number>(0)

  // 是否展示弹窗
  const dialogVisible = ref<boolean>(false)

  // 弹窗标题
  const title = ref<string>('')

  // 组件名称
  const comName = ref<string>('')

  // 表格展示条目改变时候重置基本参数
  function sizeChange(val: number) {
    loading.value = true
    defalutParams.pageIndex = 1
    defalutParams.pageSize = val
  }

  // 表格分页改变时候重置基本参数
  function currentChange(val: number) {
    loading.value = true
    defalutParams.pageIndex = val
  }

  // 删除多选
  function delData(callBack: Function, config?: DelsParmas) {
    if (selectionData.value.length === 0 && !config?.hiddenVerify) {
      Message.warning(config?.noDataText || '请选择需要删除的数据！')
      return
    }
    ElMessageBox.confirm(config?.text || '此操作将永久删除选中数据, 是否继续?', '提示', {
      confirmButtonText: '确定',
      cancelButtonText: '取消',
      type: 'warning'
    }).then(async() => {
      await callBack()
    })
  }

  // 多选变化的时候
  function handleSelectionChange(selection: any[]) {
    selectionData.value = selection
  }

  // 改变弹窗dialogVisible
  function toggleVisible(val = false) {
    dialogVisible.value = val
  }

  return {
    defalutParams,
    tableData,
    selectionData,
    loading,
    total,
    dialogVisible,
    title,
    comName,
    sizeChange,
    currentChange,
    delData,
    handleSelectionChange,
    toggleVisible
  }
}
