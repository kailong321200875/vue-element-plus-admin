<template>
  <div>
    <com-table :data-source="data" :columns="columns">
      <template #filterDropdown="{ setSelectedKeys, selectedKeys, confirm, clearFilters, column }">
        <div style="padding: 8px">
          <a-input
            :ref="c => (searchInput = c)"
            v-model:value="selectedKeys[0]"
            :placeholder="`Search ${column.dataIndex}`"
            style="width: 188px; margin-bottom: 8px; display: block;"
            @change="e => setSelectedKeys(e.target.value ? [e.target.value] : [])"
            @pressEnter="handleSearch(selectedKeys, confirm, column.dataIndex)"
          />
          <a-button
            type="primary"
            size="small"
            style="width: 90px; margin-right: 8px"
            @click="handleSearch(selectedKeys, confirm, column.dataIndex)"
          >
            <template #icon><SearchOutlined /></template>
            Search
          </a-button>
          <a-button size="small" style="width: 90px" @click="handleReset(clearFilters)">
            Reset
          </a-button>
        </div>
      </template>
      <template #filterIcon="filtered">
        <search-outlined :style="{ color: filtered ? '#108ee9' : undefined }" />
      </template>
      <template #customRender="{ text, column }">
        <span v-if="searchText && searchedColumn === column.dataIndex">
          <template
            v-for="(fragment, i) in text
              .toString()
              .split(new RegExp(`(?<=${searchText})|(?=${searchText})`, 'i'))"
            :key="i"
          >
            <mark v-if="fragment.toLowerCase() === searchText.toLowerCase()" class="highlight">
              {{ fragment }}
            </mark>
            <template v-else>{{ fragment }}</template>
          </template>
        </span>
        <template v-else>
          {{ text }}
        </template>
      </template>
    </com-table>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, getCurrentInstance } from 'vue'
import ComTable from '_c/Table'
import { SearchOutlined } from '@ant-design/icons-vue'

const data = [
  {
    key: '1',
    name: 'John Brown',
    age: 32,
    address: 'New York No. 1 Lake Park'
  },
  {
    key: '2',
    name: 'Joe Black',
    age: 42,
    address: 'London No. 1 Lake Park'
  },
  {
    key: '3',
    name: 'Jim Green',
    age: 32,
    address: 'Sidney No. 1 Lake Park'
  },
  {
    key: '4',
    name: 'Jim Red',
    age: 32,
    address: 'London No. 2 Lake Park'
  }
]

export default defineComponent({
  // name: 'CustomMenu',
  components: {
    ComTable,
    SearchOutlined
  },
  setup() {
    const { ctx } = getCurrentInstance() as any

    const searchText = ref<string>('')
    const searchInput = ref<any>(null)
    const searchedColumn = ref<string>('')

    const columns = ref<any[]>([
      {
        title: 'Name',
        dataIndex: 'name',
        key: 'name',
        slots: {
          filterDropdown: 'filterDropdown',
          filterIcon: 'filterIcon',
          customRender: 'customRender'
        },
        onFilter: (value: string, record: any) =>
          record.name
            .toString()
            .toLowerCase()
            .includes(value.toLowerCase()),
        onFilterDropdownVisibleChange: (visible: boolean) => {
          if (visible) {
            setTimeout(() => {
              console.log(searchInput.value)
              searchInput.value.focus()
            }, 0)
          }
        }
      },
      {
        title: 'Age',
        dataIndex: 'age',
        key: 'age',
        slots: {
          filterDropdown: 'filterDropdown',
          filterIcon: 'filterIcon',
          customRender: 'customRender'
        },
        onFilter: (value: string, record: any) =>
          record.age
            .toString()
            .toLowerCase()
            .includes(value.toLowerCase()),
        onFilterDropdownVisibleChange: (visible: boolean) => {
          if (visible) {
            setTimeout(() => {
              searchInput.value.focus()
            })
          }
        }
      },
      {
        title: 'Address',
        dataIndex: 'address',
        key: 'address',
        slots: {
          filterDropdown: 'filterDropdown',
          filterIcon: 'filterIcon',
          customRender: 'customRender'
        },
        onFilter: (value: string, record: any) =>
          record.address
            .toString()
            .toLowerCase()
            .includes(value.toLowerCase()),
        onFilterDropdownVisibleChange: (visible: boolean) => {
          if (visible) {
            setTimeout(() => {
              searchInput.value.focus()
            })
          }
        }
      }
    ])

    function handleSearch(selectedKeys: string[], confirm: Function, dataIndex: string) {
      confirm()
      searchText.value = selectedKeys[0]
      searchedColumn.value = dataIndex
      ctx.$forceUpdate()
    }

    function handleReset(clearFilters: Function) {
      clearFilters()
      searchText.value = ''
    }

    return {
      data,
      columns,
      searchText,
      searchInput,
      searchedColumn,
      handleSearch,
      handleReset
    }
  }
})
</script>

<style lang="less" scoped>
@{deep}(.highlight) {
  background-color: rgb(255, 192, 105);
  padding: 0px;
}
</style>
