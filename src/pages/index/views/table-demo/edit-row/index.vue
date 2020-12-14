<template>
  <div>
    <com-table :columns="columns" :data-source="data" bordered>
      <template v-for="col in ['name', 'age', 'address']" #[col]="{ text, record }" :key="col">
        <div :key="col">
          <a-input
            v-if="record.editable"
            style="margin: -5px 0"
            :value="text"
            @change="e => handleChange(e.target.value, record.key, col)"
          />
          <template v-else>
            {{ text }}
          </template>
        </div>
      </template>
      <template #operation="{ record }">
        <div class="editable-row-operations">
          <span v-if="record.editable">
            <a @click="save(record.key)">Save</a>
            <a-popconfirm title="Sure to cancel?" @confirm="cancel(record.key)">
              <a>Cancel</a>
            </a-popconfirm>
          </span>
          <span v-else>
            <a v-bind="editingKey !== '' ? { disabled: 'disabled' } : {}" @click="edit(record.key)">
              Edit
            </a>
          </span>
        </div>
      </template>
    </com-table>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'
import ComTable from '_c/Table'

const columns = [
  {
    title: 'name',
    dataIndex: 'name',
    width: '25%',
    slots: { customRender: 'name' }
  },
  {
    title: 'age',
    dataIndex: 'age',
    width: '15%',
    slots: { customRender: 'age' }
  },
  {
    title: 'address',
    dataIndex: 'address',
    width: '40%',
    slots: { customRender: 'address' }
  },
  {
    title: 'operation',
    dataIndex: 'operation',
    slots: { customRender: 'operation' }
  }
]

const dataList: any[] = []
for (let i = 0; i < 100; i++) {
  dataList.push({
    key: i.toString(),
    name: `Edrward ${i}`,
    age: 32,
    address: `London Park no. ${i}`
  })
}

export default defineComponent({
  // name: 'EditRow',
  components: {
    ComTable
  },
  setup() {
    const cacheData = ref<any[]>(dataList.map(item => ({ ...item })))
    const editingKey = ref<string>('')
    const data = ref<any[]>(dataList)

    function handleChange(value: string, key: string, column: string) {
      const newData = [...data.value]
      const target: any[] = newData.filter((item: any) => key === item.key)[0]
      if (target) {
        target[column] = value
        data.value = newData
      }
    }
    function edit(key: string) {
      const newData = [...data.value]
      const target: any = newData.filter((item: any) => key === item.key)[0]
      editingKey.value = key
      if (target) {
        target.editable = true
        data.value = newData
      }
    }
    function save(key: string) {
      const newData = [...data.value]
      const newCacheData = [...cacheData.value]
      const target: any = newData.filter((item: any) => key === item.key)[0]
      const targetCache: any[] = newCacheData.filter((item: any) => key === item.key)[0]
      if (target && targetCache) {
        delete target.editable
        data.value = newData
        Object.assign(targetCache, target)
        cacheData.value = newCacheData
      }
      editingKey.value = ''
    }
    function cancel(key: string) {
      const newData = [...data.value]
      const target: any = newData.filter((item: any) => key === item.key)[0]
      editingKey.value = ''
      if (target) {
        Object.assign(target, cacheData.value.filter((item: any) => key === item.key)[0])
        delete target.editable
        data.value = newData
      }
    }

    return {
      columns,
      data,
      editingKey,
      handleChange, edit, save, cancel
    }
  }
})
</script>

<style lang="less" scoped>
.editable-row-operations a {
  margin-right: 8px;
}
</style>
