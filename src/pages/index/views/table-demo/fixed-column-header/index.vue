<template>
  <div>
    <el-alert
      effect="dark"
      :closable="false"
      title="基于 Element 的 Table 组件进行二次封装，实现数据驱动，支持所有 Table 参数 -- 固定列和表头"
      type="info"
      style="margin-bottom: 20px;"
    />
    <com-table
      v-loading="loading"
      :columns="columns"
      :data="tableData"
      border
      height="250"
      style="width: 820px;"
    >
      <template #action="scope">
        <el-button type="text" size="small" @click="handleClick(scope.row)">查看</el-button>
        <el-button type="text" size="small">编辑</el-button>
      </template>
    </com-table>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'

const columns = [
  {
    field: 'date',
    label: '日期',
    fixed: true,
    width: '150'
  },
  {
    field: 'name',
    label: '姓名',
    width: '120'
  },
  {
    field: 'province',
    label: '省份',
    width: '120'
  },
  {
    field: 'city',
    label: '市区',
    width: '120'
  },
  {
    field: 'address',
    label: '地址',
    width: '300'
  },
  {
    field: 'zip',
    label: '邮编',
    width: '120'
  },
  {
    field: 'action',
    label: '操作',
    width: '100',
    fixed: 'right',
    slots: {
      default: 'action'
    }
  }
]

const tableData = [
  {
    date: '2016-05-02',
    name: '王小虎',
    province: '上海',
    city: '普陀区',
    address: '上海市普陀区金沙江路 1518 弄',
    zip: 200333
  },
  {
    date: '2016-05-04',
    name: '王小虎',
    province: '上海',
    city: '普陀区',
    address: '上海市普陀区金沙江路 1517 弄',
    zip: 200333
  },
  {
    date: '2016-05-01',
    name: '王小虎',
    province: '上海',
    city: '普陀区',
    address: '上海市普陀区金沙江路 1519 弄',
    zip: 200333
  },
  {
    date: '2016-05-03',
    name: '王小虎',
    province: '上海',
    city: '普陀区',
    address: '上海市普陀区金沙江路 1516 弄',
    zip: 200333
  },
  {
    date: '2016-05-02',
    name: '王小虎',
    province: '上海',
    city: '普陀区',
    address: '上海市普陀区金沙江路 1518 弄',
    zip: 200333
  },
  {
    date: '2016-05-04',
    name: '王小虎',
    province: '上海',
    city: '普陀区',
    address: '上海市普陀区金沙江路 1517 弄',
    zip: 200333
  },
  {
    date: '2016-05-01',
    name: '王小虎',
    province: '上海',
    city: '普陀区',
    address: '上海市普陀区金沙江路 1519 弄',
    zip: 200333
  },
  {
    date: '2016-05-03',
    name: '王小虎',
    province: '上海',
    city: '普陀区',
    address: '上海市普陀区金沙江路 1516 弄',
    zip: 200333
  }
]

export default defineComponent({
  // name: 'FixedColumnHeader',
  setup() {
    const loading = ref<boolean>(true)
    setTimeout(() => {
      loading.value = false
    }, 1000)

    function handleClick(row: any) {
      console.log(row)
    }

    return {
      columns,
      tableData,
      loading,
      handleClick
    }
  }
})
</script>

<style>
</style>
