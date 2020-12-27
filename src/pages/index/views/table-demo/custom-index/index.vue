<template>
  <div>
    <el-alert
      effect="dark"
      :closable="false"
      title="基于 Element 的 Table 组件进行二次封装，实现数据驱动，支持所有 Table 参数 -- 自定义索引"
      type="info"
      style="margin-bottom: 20px;"
    />
    <com-table
      v-loading="loading"
      :columns="columns"
      :data="tableData"
    />
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'

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
  // name: 'CustomIndex',
  setup() {
    const loading = ref<boolean>(true)
    setTimeout(() => {
      loading.value = false
    }, 1000)

    const columns = ref<any[]>([
      {
        field: 'index',
        type: 'index',
        index: (index: number) => {
          return index * 2
        }
      },
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
    ])

    return {
      columns,
      tableData,
      loading
    }
  }
})
</script>

<style>
</style>
