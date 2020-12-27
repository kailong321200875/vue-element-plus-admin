<template>
  <div>
    <el-alert
      effect="dark"
      :closable="false"
      title="基于 Element 的 Table 组件进行二次封装，实现数据驱动，支持所有 Table 参数 -- 自定义表头"
      type="info"
      style="margin-bottom: 20px;"
    />
    <com-table
      v-loading="loading"
      :columns="columns"
      :data="tableData.filter(data => !search || data.name.toLowerCase().includes(search.toLowerCase()))"
    >
      <template #actionHeader>
        <el-input
          v-model="search"
          size="mini"
          placeholder="输入关键字搜索"
        />
      </template>
      <template #action="scope">
        <el-button
          size="mini"
          @click="handleEdit(scope.$index, scope.row)"
        >Edit</el-button>
        <el-button
          size="mini"
          type="danger"
          @click="handleDelete(scope.$index, scope.row)"
        >Delete</el-button>
      </template>
    </com-table>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'

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
    field: 'action',
    slots: {
      header: 'actionHeader',
      default: 'action'
    }
  }
]

const tableData = [
  {
    date: '2016-05-02',
    name: '王小虎1',
    address: '上海市普陀区金沙江路 1518 弄'
  }, {
    date: '2016-05-04',
    name: '王小虎2',
    address: '上海市普陀区金沙江路 1517 弄'
  }, {
    date: '2016-05-01',
    name: '王小虎3',
    address: '上海市普陀区金沙江路 1519 弄'
  }, {
    date: '2016-05-03',
    name: '王小虎4',
    address: '上海市普陀区金沙江路 1516 弄'
  }
]

export default defineComponent({
  // name: 'CustomHeader',
  setup() {
    const loading = ref<boolean>(true)
    setTimeout(() => {
      loading.value = false
    }, 1000)

    const search = ref<string>('')

    function handleEdit(index: number, row: any) {
      console.log(index, row)
    }
    function handleDelete(index: number, row: any) {
      console.log(index, row)
    }

    return {
      columns,
      tableData,
      loading,
      search,
      handleEdit, handleDelete
    }
  }
})
</script>

<style>
</style>
