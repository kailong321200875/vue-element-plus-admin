<template>
  <div>
    <div class="search__example--wrap">
      <com-search
        :data="searchData"
        @search-submit="searchSubmit"
        @reset-submit="resetSubmit"
      />
    </div>

    <div class="button__example--wrap">
      <el-button type="primary" icon="el-icon-circle-plus-outline" @click="open(false)">新增</el-button>
      <el-button
        type="danger"
        icon="el-icon-delete"
        @click="dels"
      >删除</el-button>
    </div>

    <com-table
      v-loading="loading"
      selection
      :columns="columns"
      :data="tableData"
      :pagination="{
        currentPage: defalutParams.pageIndex,
        total: total,
        onSizeChange: handleSizeChange,
        onCurrentChange: handleCurrentChange
      }"
      @selection-change="handleSelectionChange"
    >
      <template #importance="scope">
        <el-tag
          :type="scope.row.importance === 3
            ? 'success'
            : (scope.row.importance === 2
              ? 'warning'
              : 'danger')"
        >{{ scope.row.importance === 3
          ? '重要'
          : (scope.row.importance === 2
            ? '良好'
            : '一般') }}
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

<script lang="ts">
import { defineComponent, onMounted, onUnmounted } from 'vue'
import { useRouter } from 'vue-router'
import vueBus from '@/vue-bus'
import { useExample } from '@/hooks/useExample'
import { Message } from '_c/Message'

import { getExampleListApi, delsExampApi } from './api'

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

export default defineComponent({
  name: 'ExamplePage',
  setup() {
    const { push } = useRouter()

    const {
      defalutParams,
      tableData,
      loading,
      total,
      currentChange,
      sizeChange,
      handleSelectionChange,
      selectionData,
      delData
    } = useExample()

    // 请求数据
    async function getExampleList(data?: any): Promise<void> {
      try {
        const res = await getExampleListApi({
          params: Object.assign(defalutParams, data || {})
        })
        if (res.code === '0000') {
          total.value = res.data.total
          tableData.value = res.data.list
        }
      } finally {
        loading.value = false
      }
    }

    // 查询
    function searchSubmit(data: any) {
      // 该方法重置了一些默认参数
      currentChange(1)
      getExampleList(data)
    }

    // 重置
    function resetSubmit(data: any) {
      // 该方法重置了一些默认参数
      currentChange(1)
      getExampleList(data)
    }

    // 展示多少条
    function handleSizeChange(val: number) {
      // 该方法重置了一些默认参数
      sizeChange(val)
      getExampleList()
    }

    // 展示第几页
    function handleCurrentChange(val: number) {
      // 该方法重置了一些默认参数
      currentChange(val)
      getExampleList()
    }

    // 删除多选
    function dels(item?: any) {
      delData(async() => {
        let ids: string[]
        if (item.id) {
          ids = [item.id]
        } else {
          ids = selectionData.value.map((v: any) => {
            return v.id
          })
        }
        const res = await delsExampApi({
          data: { ids }
        })
        if (res.code === '0000') {
          Message.success('删除成功！')
          getExampleList()
        }
      }, { hiddenVerify: item.id })
    }

    // 打开新页面
    function open(row: any, component?: string) {
      push(!row
        ? `/example-demo/example-add`
        : (component
          ? `/example-demo/example-detail?id=${row.id}`
          : `/example-demo/example-edit?id=${row.id}`))
    }

    getExampleList()

    onMounted(() => {
      vueBus.$on('success', (type: string) => {
        if (type === 'add') {
          currentChange(1)
        }
        getExampleList()
      })
    })

    onUnmounted(() => {
      vueBus.$off('success')
    })

    return {
      open,
      searchData, searchSubmit, resetSubmit,
      columns,
      defalutParams,
      loading,
      tableData,
      total,
      handleSizeChange,
      handleCurrentChange,
      handleSelectionChange,
      dels
    }
  }
})
</script>

<style>
</style>
