<script setup lang="tsx">
import { ContentWrap } from '@/components/ContentWrap'
import { useI18n } from '@/hooks/web/useI18n'
import { Table, TableColumn } from '@/components/Table'
import { getTableListApi } from '@/api/table'
import { TableData } from '@/api/table/types'
import { ref } from 'vue'
import { ElTag, ElPagination } from 'element-plus'
import { BaseButton } from '@/components/Button'
import TableColumns from './modules/TableColumn'

interface Params {
  pageIndex?: number
  pageSize?: number
}

const { t } = useI18n()

const columns: TableColumn[] = [
  ...TableColumns,
  {
    field: 'action',
    label: '操作',
    slots: {
      default: (data) => {
        return (
          <div class="flex gap-2">
            <BaseButton type="primary" onClick={() => actionFn(data)}>
              操作
            </BaseButton>
            <BaseButton type="danger" onClick={() => handleDelete(data)}>
              删除
            </BaseButton>
          </div>
        )
      }
    }
  }
]

const loading = ref(true)

const tableDataList = ref<TableData[]>([])

// 分页相关数据
const currentPage = ref(1)
const pageSize = ref(10)
const total = ref(0)

const getTableList = async (params?: Params) => {
  loading.value = true
  const res = await getTableListApi(
    params || {
      pageIndex: currentPage.value,
      pageSize: pageSize.value
    }
  )
    .catch(() => {})
    .finally(() => {
      loading.value = false
    })
  if (res) {
    tableDataList.value = res.data.list
    total.value = res.data.total // 设置总数
  }
}

// 分页方法
const handleSizeChange = (val: number) => {
  pageSize.value = val
  getTableList()
}

const handleCurrentChange = (val: number) => {
  currentPage.value = val
  getTableList()
}

// 初始加载
getTableList()

const actionFn = (data: any) => {
  console.log(data)
}

// 添加删除方法
const handleDelete = (data: any) => {
  console.log('删除', data)
}
</script>

<template>
  <ContentWrap :title="t('tableDemo.table')" :message="t('tableDemo.tableDes')">
    <div class="table-container">
      <Table
        :columns="columns"
        :data="tableDataList"
        :loading="loading"
        :defaultSort="{ prop: 'display_time', order: 'descending' }"
      />

      <div class="pagination-container">
        <el-pagination
          v-model:current-page="currentPage"
          v-model:page-size="pageSize"
          :page-sizes="[10, 20, 50, 100]"
          :total="total"
          layout="total, sizes, prev, pager, next, jumper"
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
        />
      </div>
    </div>
  </ContentWrap>
</template>

<style lang="less" scoped>
.table-container {
  .pagination-container {
    margin-top: 20px;
    display: flex;
    justify-content: flex-end;
  }
}
</style>
