<template>
  <div>
    <com-table
      :columns="columns"
      :row-key="record => record.sid"
      :data-source="data"
      :pagination="pagination"
      :loading="loading"
      @change="handleTableChange"
    >
      <template #name="{ text }"> {{ text }} </template>
    </com-table>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, onMounted } from 'vue'
import ComTable from '_c/Table'
import api from '_p/index/api'

const columns = [
  {
    title: 'Name',
    dataIndex: 'name',
    sorter: true,
    // sortDirections: ['ascend', 'descend'],
    width: '20%',
    slots: { customRender: 'name' }
  },
  {
    title: 'Text',
    dataIndex: 'text',
    filters: [
      { text: 'Male', value: 'male' },
      { text: 'Female', value: 'female' }
    ],
    width: '60%'
  },
  {
    title: 'Passtime',
    dataIndex: 'passtime'
  }
]

export default defineComponent({
  // name: 'TableLoad',
  components: {
    ComTable
  },
  setup() {
    const loading = ref<boolean>(true)
    const data = ref<any[]>([])
    const pagination = ref<Object>({})

    onMounted(() => {
      fetch()
    })

    function handleTableChange(pagination: any, filters: any, sorter: any) {
      console.log(sorter)
      const pager: any = { ...pagination }
      pager.current = pagination.current
      pagination.value = pager
      fetch({
        count: pagination.pageSize,
        page: pagination.current,
        sortField: sorter.field,
        sortOrder: sorter.order,
        ...filters
      })
    }

    async function fetch(params = {
      page: 1,
      count: 10
    }) {
      try {
        loading.value = true
        const res = await api.common.getList({
          params
        })
        if (res) {
          const pager: any = { ...pagination.value }
          pager.total = 200
          data.value = res.result
          pagination.value = pager
        }
      } catch (e) {
        console.log(e)
      } finally {
        loading.value = false
      }
    }

    return {
      loading,
      columns,
      data,
      pagination,
      handleTableChange
    }
  }
})
</script>

<style>
</style>
