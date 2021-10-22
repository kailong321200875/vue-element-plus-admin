<template>
  <div>
    <el-alert
      effect="dark"
      :closable="false"
      title="由于是模拟数据，所以只提供了两种不同权限的角色，开发者可根据实际情况自行改造结合。"
      type="info"
      style="margin-bottom: 20px"
    />

    <div class="search__example--wrap">
      <com-search :data="searchData" @search-submit="searchSubmit" @reset-submit="resetSubmit" />
    </div>

    <com-table
      v-loading="loading"
      :columns="columns"
      :data="tableData"
      :pagination="{
        currentPage: defaultParams.pageIndex,
        total: total,
        onSizeChange: handleSizeChange,
        onCurrentChange: handleCurrentChange
      }"
    >
      <template #remark="scope">
        <span>模拟</span>
        <el-tag
          :type="scope.row.roleName === 'admin' ? 'success' : 'warning'"
          style="margin: 0 15px"
        >
          {{ scope.row.roleName === 'admin' ? '前端' : '后端' }}
        </el-tag>
        <span>角色</span>
      </template>

      <template #action="scope">
        <el-button
          type="primary"
          size="mini"
          @click="open(scope.row, scope.row.roleName === 'admin' ? 'InfoWrite' : 'InfoWrite2')"
        >
          编辑
        </el-button>
      </template>
    </com-table>

    <com-dialog v-model="dialogVisible" :title="dialogTitle">
      <info-write
        v-if="comName === 'InfoWrite' && dialogVisible"
        :info="rowData"
        @close="toggleVisible"
        @success="refreshTable"
      />
      <info-write2
        v-if="comName === 'InfoWrite2' && dialogVisible"
        :info="rowData"
        @close="toggleVisible"
        @success="refreshTable"
      />
    </com-dialog>
  </div>
</template>

<script setup lang="ts" name="Role">
import { getRoleListApi } from './api'
import { useWork } from '@/hooks/work/useWork'
import InfoWrite from './components/InfoWrite.vue'
import InfoWrite2 from './components/InfoWrite2.vue'
const {
  defaultParams,
  tableData,
  loading,
  total,
  dialogVisible,
  dialogTitle,
  comName,
  rowData,
  handleSizeChange,
  handleCurrentChange,
  toggleVisible,
  getList,
  searchSubmit,
  resetSubmit,
  open,
  refreshTable
} = useWork({
  listFun: getRoleListApi
})

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

getList()
</script>
