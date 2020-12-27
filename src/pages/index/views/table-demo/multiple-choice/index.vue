<template>
  <div>
    <el-alert
      effect="dark"
      :closable="false"
      title="基于 Element 的 Table 组件进行二次封装，实现数据驱动，支持所有 Table 参数 -- 多选"
      type="info"
      style="margin-bottom: 20px;"
    />
    <com-table
      ref="multipleTable"
      v-loading="loading"
      selection
      :columns="columns"
      :data="tableData"
      @selection-change="handleSelectionChange"
    />

    <div style="margin-top: 20px">
      <el-button @click="toggleSelection([tableData[1], tableData[2]])">切换第二、第三行的选中状态</el-button>
      <el-button @click="toggleSelection()">取消选择</el-button>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, unref } from 'vue'

const columns = [
  {
    field: 'date',
    label: '日期'
  },
  {
    field: 'name',
    label: '姓名'
  },
  {
    field: 'address',
    label: '地址'
  }
]

const tableData = [
  {
    date: '2016-05-02',
    name: '王小虎',
    address: '上海市普陀区金沙江路 1518 弄'
  }, {
    date: '2016-05-04',
    name: '王小虎',
    address: '上海市普陀区金沙江路 1517 弄'
  }, {
    date: '2016-05-01',
    name: '王小虎',
    address: '上海市普陀区金沙江路 1519 弄'
  }, {
    date: '2016-05-03',
    name: '王小虎',
    address: '上海市普陀区金沙江路 1516 弄'
  }
]

export default defineComponent({
  // name: 'MultipleChoice',
  setup() {
    const loading = ref<boolean>(true)
    setTimeout(() => {
      loading.value = false
    }, 1000)

    const multipleTable = ref<HTMLElement | null>(null)
    function toggleSelection(rows: any[]) {
      const multipleTableRef = unref(multipleTable as any).getTableRef()
      if (rows) {
        rows.forEach(row => {
          multipleTableRef.toggleRowSelection(row)
        })
      } else {
        multipleTableRef.clearSelection()
      }
    }
    function handleSelectionChange(val: any) {
      console.log(val)
    }

    return {
      columns,
      tableData,
      loading,
      multipleTable, toggleSelection, handleSelectionChange
    }
  }
})
</script>

<style>
</style>
