<template>
  <div>
    <com-table
      :columns="columns"
      :data-source="data"
      bordered
    >
      <template #name="{ text }">
        <a>{{ text }}</a>
      </template>
      <template #title>
        Header
      </template>
      <template #footer>
        Footer
      </template>
    </com-table>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'
import ComTable from '_c/Table'

const columns = [
  {
    title: 'Name',
    dataIndex: 'name',
    slots: { customRender: 'name' }
  },
  {
    title: 'Cash Assets',
    className: 'column-money',
    dataIndex: 'money'
  },
  {
    title: 'Address',
    dataIndex: 'address'
  }
]

const data = [
  {
    key: '1',
    name: 'John Brown',
    money: '￥300,000.00',
    address: 'New York No. 1 Lake Park'
  },
  {
    key: '2',
    name: 'Jim Green',
    money: '￥1,256,000.00',
    address: 'London No. 1 Lake Park'
  },
  {
    key: '3',
    name: 'Joe Black',
    money: '￥120,000.00',
    address: 'Sidney No. 1 Lake Park'
  }
]

export default defineComponent({
  // name: 'TableBorder',
  components: {
    ComTable
  },
  setup() {
    const loading = ref<boolean>(true)
    setTimeout(() => {
      loading.value = false
    }, 1000)
    return {
      loading,
      columns,
      data
    }
  }
})
</script>

<style lang="less" scoped>
@{deep}(th.column-money),
@{deep}(td.column-money) {
  text-align: right;
}
</style>
