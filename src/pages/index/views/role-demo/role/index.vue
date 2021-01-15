<template>
  <div>
    <el-alert
      effect="dark"
      :closable="false"
      title="由于是模拟数据，所以只提供了两种不同权限的角色，开发者可根据实际情况自行改造结合。"
      type="info"
      style="margin-bottom: 20px;"
    />

    <div class="search__example--wrap">
      <com-search
        :data="searchData"
        @search-submit="searchSubmit"
        @reset-submit="resetSubmit"
      />
    </div>

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
    >
      <template #remark="scope">
        <span>模拟</span>
        <el-tag
          :type="scope.row.roleName === 'admin' ? 'success' : 'warning'"
          style="margin: 0 15px;"
        >{{ scope.row.roleName === 'admin' ? '前端' : '后端' }}</el-tag>
        <span>角色</span>
      </template>

      <template #action="scope">
        <el-button type="primary" size="mini" @click="open(scope.row)">编辑</el-button>
      </template>
    </com-table>

    <com-dialog v-model="dialogVisible" :title="title">
      <info-write
        v-if="comName === 'InfoWrite' && dialogVisible"
        :info="info"
        @close="toggleVisible"
        @success="success"
      />
      <info-write2
        v-if="comName === 'InfoWrite2' && dialogVisible"
        :info="info"
        @close="toggleVisible"
        @success="success"
      />
    </com-dialog>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'

import { useExample } from '@/hooks/useExample'

import { getRoleListApi } from './api'

import InfoWrite from './components/InfoWrite.vue'
import InfoWrite2 from './components/InfoWrite2.vue'

const searchData = [
  {
    label: '角色名',
    value: '',
    itemType: 'input',
    field: 'roleName',
    placeholder: '请输入角色名',
    clearable: true
  }
]

const columns = [
  {
    field: 'roleName',
    label: '角色名'
  },
  {
    label: '备注',
    slots: {
      default: 'remark'
    }
  },
  {
    field: 'action',
    label: '操作',
    width: '80px',
    slots: {
      default: 'action'
    }
  }
]

export default defineComponent({
  name: 'Role',
  components: {
    InfoWrite,
    InfoWrite2
  },
  setup() {
    const info = ref<any>(null)

    const {
      defalutParams,
      tableData,
      loading,
      total,
      dialogVisible,
      title,
      currentChange,
      sizeChange,
      comName,
      toggleVisible
    } = useExample()

    // 请求数据
    async function getRoleList(data?: any): Promise<void> {
      try {
        const res = await getRoleListApi({
          params: Object.assign(defalutParams, data || {})
        })
        if (res) {
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
      getRoleList(data)
    }

    // 重置
    function resetSubmit(data: any) {
      // 该方法重置了一些默认参数
      currentChange(1)
      getRoleList(data)
    }

    // 展示多少条
    function handleSizeChange(val: number) {
      // 该方法重置了一些默认参数
      sizeChange(val)
      getRoleList()
    }

    // 展示第几页
    function handleCurrentChange(val: number) {
      // 该方法重置了一些默认参数
      currentChange(val)
      getRoleList()
    }

    // 打开弹窗
    function open(row: any) {
      comName.value = row.roleName === 'admin' ? 'InfoWrite' : 'InfoWrite2'
      title.value = !row ? '新增' : '编辑'
      info.value = row || null
      toggleVisible(true)
    }

    // 成功之后的回调
    function success(type: string) {
      if (type === 'add') {
        currentChange(1)
      }
      toggleVisible()
      getRoleList()
    }

    getRoleList()

    return {
      searchData,
      columns,
      info,
      defalutParams,
      tableData,
      loading,
      total,
      dialogVisible,
      title,
      currentChange,
      sizeChange,
      comName,
      toggleVisible,
      searchSubmit,
      resetSubmit,
      handleSizeChange,
      handleCurrentChange,
      open,
      success
    }
  }
})
</script>

<style>
</style>
