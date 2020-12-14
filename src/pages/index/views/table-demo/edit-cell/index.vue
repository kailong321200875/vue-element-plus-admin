<template>
  <div>
    <a-button class="editable-add-btn" @click="handleAdd">
      Add
    </a-button>
    <com-table bordered :data-source="dataSource" :columns="columns">
      <template #name="{ text, record }">
        <editable-cell :text="text" @change="val => onCellChange(record.key, 'name', val)" />
      </template>
      <template #operation="{ record }">
        <a-popconfirm
          v-if="dataSource.length"
          title="Sure to delete?"
          @confirm="onDelete(record.key)"
        >
          <a>Delete</a>
        </a-popconfirm>
      </template>
    </com-table>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'
import ComTable from '_c/Table'
import EditableCell from './EditableCell.vue'
export default defineComponent({
  // name: 'EditCell',
  components: {
    ComTable,
    EditableCell
  },
  setup() {
    const count = ref<number>(2)
    const dataSource = ref<any[]>([
      {
        key: '0',
        name: 'Edward King 0',
        age: '32',
        address: 'London, Park Lane no. 0'
      },
      {
        key: '1',
        name: 'Edward King 1',
        age: '32',
        address: 'London, Park Lane no. 1'
      }
    ])

    const columns = ref<any[]>([
      {
        title: 'name',
        dataIndex: 'name',
        width: '30%',
        slots: { customRender: 'name' }
      },
      {
        title: 'age',
        dataIndex: 'age'
      },
      {
        title: 'address',
        dataIndex: 'address'
      },
      {
        title: 'operation',
        dataIndex: 'operation',
        slots: { customRender: 'operation' }
      }
    ])

    function onCellChange(key: string, dataIndex: string, value: string) {
      const newDataSource = [...dataSource.value]
      const target: any[] = newDataSource.find((item: any) => item.key === key)
      if (target) {
        target[dataIndex] = value
        dataSource.value = newDataSource
      }
    }
    function onDelete(key: string) {
      const newDataSource = [...dataSource.value]
      dataSource.value = newDataSource.filter((item: any) => item.key !== key)
    }
    function handleAdd() {
      const newData = {
        key: count.value,
        name: `Edward King ${count.value}`,
        age: 32,
        address: `London, Park Lane no. ${count.value}`
      }
      dataSource.value = [...dataSource.value, newData]
      count.value = count.value + 1
    }

    return {
      count, dataSource, columns,
      onCellChange, onDelete, handleAdd
    }
  }
})
</script>

<style>
</style>
