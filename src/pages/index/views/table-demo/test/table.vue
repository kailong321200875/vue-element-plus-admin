<template>
  <a-table :data-source="data" :columns="columns">
    <template #filterDropdown="{ setSelectedfields, selectedfields, confirm, clearFilters, column }">
      <div style="padding: 8px">
        <a-input
          :ref="c => (searchInput = c)"
          :placeholder="`Search ${column.dataIndex}`"
          :value="selectedfields[0]"
          style="width: 188px; margin-bottom: 8px; display: block;"
          @change="e => setSelectedfields(e.target.value ? [e.target.value] : [])"
          @pressEnter="handleSearch(selectedfields, confirm, column.dataIndex)"
        />
        <el-button
          type="primary"
          size="small"
          style="width: 90px; margin-right: 8px"
          @click="handleSearch(selectedfields, confirm, column.dataIndex)"
        >
          <template #icon><SearchOutlined /></template>
          Search
        </el-button>
        <el-button size="small" style="width: 90px" @click="handleReset(clearFilters)">
          Reset
        </el-button>
      </div>
    </template>
    <template #filterIcon="filtered">
      <search-outlined :style="{ color: filtered ? '#108ee9' : undefined }" />
    </template>
    <template #customRender="{ text, record, index, column }">
      <span v-if="searchText && searchedColumn === column.dataIndex">
        <template
          v-for="(fragment, i) in text
            .toString()
            .split(new RegExp(`(?<=${searchText})|(?=${searchText})`, 'i'))"
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
  </a-table>
</template>

<script>
import { SearchOutlined } from '@ant-design/icons-vue';
const data = [
  {
    field: '1',
    name: 'John Brown',
    age: 32,
    address: 'New York No. 1 Lake Park',
  },
  {
    field: '2',
    name: 'Joe Black',
    age: 42,
    address: 'London No. 1 Lake Park',
  },
  {
    field: '3',
    name: 'Jim Green',
    age: 32,
    address: 'Sidney No. 1 Lake Park',
  },
  {
    field: '4',
    name: 'Jim Red',
    age: 32,
    address: 'London No. 2 Lake Park',
  },
];

export default {
  components: {
    SearchOutlined,
  },
  data() {
    return {
      data,
      searchText: '',
      searchInput: null,
      searchedColumn: '',
      columns: [
        {
          title: 'Name',
          dataIndex: 'name',
          field: 'name',
          slots: {
            filterDropdown: 'filterDropdown',
            filterIcon: 'filterIcon',
            customRender: 'customRender',
          },
          onFilter: (value, record) =>
            record.name
              .toString()
              .toLowerCase()
              .includes(value.toLowerCase()),
          onFilterDropdownVisibleChange: visible => {
            if (visible) {
              setTimeout(() => {
                console.log(this.searchInput);
                this.searchInput.focus();
              }, 0);
            }
          },
        },
        {
          title: 'Age',
          dataIndex: 'age',
          field: 'age',
          slots: {
            filterDropdown: 'filterDropdown',
            filterIcon: 'filterIcon',
            customRender: 'customRender',
          },
          onFilter: (value, record) =>
            record.age
              .toString()
              .toLowerCase()
              .includes(value.toLowerCase()),
          onFilterDropdownVisibleChange: visible => {
            if (visible) {
              setTimeout(() => {
                this.searchInput.focus();
              });
            }
          },
        },
        {
          title: 'Address',
          dataIndex: 'address',
          field: 'address',
          slots: {
            filterDropdown: 'filterDropdown',
            filterIcon: 'filterIcon',
            customRender: 'customRender',
          },
          onFilter: (value, record) =>
            record.address
              .toString()
              .toLowerCase()
              .includes(value.toLowerCase()),
          onFilterDropdownVisibleChange: visible => {
            if (visible) {
              setTimeout(() => {
                this.searchInput.focus();
              });
            }
          },
        },
      ],
    };
  },
  methods: {
    handleSearch(selectedfields, confirm, dataIndex) {
      confirm();
      console.log(selectedfields[0]);
      this.searchText = selectedfields[0];
      this.searchedColumn = dataIndex;
      this.$forceUpdate();
    },

    handleReset(clearFilters) {
      clearFilters();
      this.searchText = '';
    },
  },
};
</script>
<style lang="less" scoped>
::v-deep.highlight {
  background-color: rgb(255, 192, 105);
  padding: 0px;
}
</style>
