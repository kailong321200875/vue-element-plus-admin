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
    </com-table>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, h } from 'vue'
import ComTable from '_c/Table'

const renderContent = ({ text, index }: any) => {
  const obj: any = {
    children: text,
    props: {}
  }
  if (index === 4) {
    obj.props.colSpan = 0
  }
  return obj
}

const data = [
  {
    key: '1',
    name: 'John Brown',
    age: 32,
    tel: '0571-22098909',
    phone: 18889898989,
    address: 'New York No. 1 Lake Park'
  },
  {
    key: '2',
    name: 'Jim Green',
    tel: '0571-22098333',
    phone: 18889898888,
    age: 42,
    address: 'London No. 1 Lake Park'
  },
  {
    key: '3',
    name: 'Joe Black',
    age: 32,
    tel: '0575-22098909',
    phone: 18900010002,
    address: 'Sidney No. 1 Lake Park'
  },
  {
    key: '4',
    name: 'Jim Red',
    age: 18,
    tel: '0575-22098909',
    phone: 18900010002,
    address: 'London No. 2 Lake Park'
  },
  {
    key: '5',
    name: 'Jake White',
    age: 18,
    tel: '0575-22098909',
    phone: 18900010002,
    address: 'Dublin No. 2 Lake Park'
  }
]

export default defineComponent({
  // name: 'TableMerge',
  components: {
    ComTable
  },
  setup() {
    const columns = ref<any[]>([
      {
        title: 'Name',
        dataIndex: 'name',
        customRender: ({ text, index }: any) => {
          if (index < 4) {
            return h('a', {
              attrs: {
                href: 'javascript:;'
              }
            }, text)
          }
          return {
            children: h('a', {
              attrs: {
                href: 'javascript:;'
              }
            }, text),
            props: {
              colSpan: 5
            }
          }
        }
      },
      {
        title: 'Age',
        dataIndex: 'age',
        customRender: renderContent
      },
      {
        title: 'Home phone',
        colSpan: 2,
        dataIndex: 'tel',
        customRender: ({ text, index }: any) => {
          const obj: any = {
            children: text,
            props: {}
          }
          if (index === 2) {
            obj.props.rowSpan = 2
          }
          // These two are merged into above cell
          if (index === 3) {
            obj.props.rowSpan = 0
          }
          if (index === 4) {
            obj.props.colSpan = 0
          }
          return obj
        }
      },
      {
        title: 'Phone',
        colSpan: 0,
        dataIndex: 'phone',
        customRender: renderContent
      },
      {
        title: 'Address',
        dataIndex: 'address',
        customRender: renderContent
      }
    ])
    return {
      data,
      columns
    }
  }
})
</script>

<style>
</style>
