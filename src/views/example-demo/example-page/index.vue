<template>
  <div>
    <div class="search__example--wrap">
      <com-search :data="searchData" @search-submit="searchSubmit" @reset-submit="resetSubmit" />
    </div>

    <div class="button__example--wrap">
      <el-button type="primary" icon="el-icon-circle-plus-outline" @click="open(null)">
        新增
      </el-button>
      <el-button type="danger" icon="el-icon-delete" @click="dels">删除</el-button>
    </div>

    <com-table
      v-loading="loading"
      selection
      :columns="columns"
      :data="tableData"
      :pagination="{
        currentPage: defaultParams.pageIndex,
        total: total,
        onSizeChange: handleSizeChange,
        onCurrentChange: handleCurrentChange
      }"
      @selection-change="handleSelectionChange"
    >
      <template #importance="scope">
        <el-tag
          :type="
            scope.row.importance === 3
              ? 'success'
              : scope.row.importance === 2
              ? 'warning'
              : 'danger'
          "
        >
          {{ scope.row.importance === 3 ? '重要' : scope.row.importance === 2 ? '良好' : '一般' }}
        </el-tag>
      </template>
      <template #action="scope">
        <el-button type="primary" size="mini" @click="open(scope.row)">编辑</el-button>
        <el-button type="success" size="mini" @click="open(scope.row, 'Detail')">查看</el-button>
        <el-button type="danger" size="mini" @click="dels(scope.row)">删除</el-button>
      </template>
    </com-table>
  </div>
</template>

<script setup lang="ts" name="ExampleDialog">
import { onBeforeUnmount } from 'vue'
import { getExampleListApi, delsExampApi } from './api'
import { useWork } from '@/hooks/work/useWork'
import { useRouter } from 'vue-router'
const { push } = useRouter()
import bus from '@/vue-bus'
const {
  defaultParams,
  tableData,
  loading,
  total,
  handleSizeChange,
  handleCurrentChange,
  handleSelectionChange,
  getList,
  searchSubmit,
  resetSubmit,
  refreshTable,
  dels
} = useWork({
  listFun: getExampleListApi,
  delFun: delsExampApi
})

const searchData = [
  {
    label: '标题',
    value: '',
    itemType: 'input',
    field: 'title',
    placeholder: '请输入标题',
    clearable: true
  }
]

const columns = [
  {
    field: 'title',
    label: '标题',
    showOverflowTooltip: true
  },
  {
    field: 'author',
    label: '作者'
  },
  {
    field: 'display_time',
    label: '创建时间'
  },
  {
    field: 'importance',
    label: '重要性',
    slots: {
      default: 'importance'
    }
  },
  {
    field: 'pageviews',
    label: '阅读数'
  },
  {
    field: 'action',
    label: '操作',
    width: '220px',
    slots: {
      default: 'action'
    }
  }
]

function open(row: Nullable<IObj>, component?: string) {
  push(
    !row
      ? `/example-demo/example-add`
      : component
      ? `/example-demo/example-detail?id=${row.id}`
      : `/example-demo/example-edit?id=${row.id}`
  )
}

getList()

bus.$on('success', (type: string) => {
  refreshTable(type)
})

onBeforeUnmount(() => {
  bus.$off('success')
})
</script>
