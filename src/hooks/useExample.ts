// 常用的增删改查 hook
import { reactive, ref } from 'vue'

interface DefalutParams {
  pageIndex: number
  pageSize: number
}

export function useExample() {
  const defalutParams = reactive<DefalutParams>({
    pageIndex: 1,
    pageSize: 10
  })
  
  const tableData = ref<any[]>([])
  
  const loading = ref<boolean>(true)

  const total = ref<number>(0)
  
  function sizeChange(val: number) {
    loading.value = true
    defalutParams.pageIndex = 1
    defalutParams.pageSize = val
  }
  
  function currentChange(val: number) {
    loading.value = true
    defalutParams.pageIndex = val
  }

  return {
    defalutParams,
    tableData,
    loading,
    total,
    sizeChange,
    currentChange
  }
}
