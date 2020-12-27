import { Table } from 'ant-design-vue'
import { defineComponent } from 'vue'

const columns = [
  {
    dataIndex: 'name',
    field: 'name',
    // slots: { title: 'customTitle', customRender: 'name' }
  },
  {
    title: 'Age',
    dataIndex: 'age',
    field: 'age'
  },
  {
    title: 'Address',
    dataIndex: 'address',
    field: 'address'
  }
]

const data = [
  {
    field: '1',
    name: 'John Brown',
    age: 32,
    address: 'New York No. 1 Lake Park',
    tags: ['nice', 'developer']
  },
  {
    field: '2',
    name: 'Jim Green',
    age: 42,
    address: 'London No. 1 Lake Park',
    tags: ['loser']
  },
  {
    field: '3',
    name: 'Joe Black',
    age: 32,
    address: 'Sidney No. 1 Lake Park',
    tags: ['cool', 'teacher']
  }
]

export default defineComponent({
  name: 'Test',
  setup() {
    return () => {
      return (
        <Table columns={columns} dataSource={data} v-slots={{
          title: () => (<div>哈哈</div>)
        }}>
        </Table>
      )
    }
  }
})
