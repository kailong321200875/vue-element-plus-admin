<template>
  <div>
    <com-table
      v-loading="loading"
      :columns="columns"
      :data="tableData"
      :pagination="{
        currentPage: defalutParams.pageIndex,
        total: total,
        onSizeChange: handleSizeChange,
        onCurrentChange: handleCurrentChange
      }"
    />
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import ComTable from '_c/Table/index.vue'
import Search from '_c/Search/index.vue'
import { useExample } from '@/hooks/useExample'

import api from '_p/index/api'

const columns = [
  {
    key: 'title',
    label: '标题',
    showOverflowTooltip: true
  },
  {
    key: 'author',
    label: '作者'
  },
  {
    key: 'display_time',
    label: '创建时间'
  },
  {
    key: 'importance',
    label: '重要性'
  },
  {
    key: 'pageviews',
    label: '阅读数'
  }
]

export default defineComponent({
  // name: 'Example',
  components: {
    ComTable,
    Search
  },
  setup() {
    const { defalutParams, tableData, loading, total, currentChange, sizeChange } = useExample()

    async function getExampleList() {
      try {
        const res = await api.example.getExampleList({
          params: defalutParams
        })
        if (res) {
          total.value = res.data.total
          tableData.value = res.data.list
        }
      } finally {
        loading.value = false
      }
    }

    function handleSizeChange(val: number) {
      // 该方法重置了一些默认参数
      sizeChange(val)
      getExampleList()
    }

    function handleCurrentChange(val: number) {
      // 该方法重置了一些默认参数
      currentChange(val)
      getExampleList()
    }

    getExampleList()

    return {
      columns,
      defalutParams,
      loading,
      tableData,
      total,
      handleSizeChange,
      handleCurrentChange
    }
  }
})
</script>

<style>
</style>
