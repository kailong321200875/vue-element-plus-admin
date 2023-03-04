<script setup lang="ts">
import { ContentWrap } from '@/components/ContentWrap'
import { useI18n } from '@/hooks/web/useI18n'
import { Table } from '@/components/Table'
import { getUserListApi } from '@/api/login'
import { UserType } from '@/api/login/types'
import { ref, h } from 'vue'
import { ElButton } from 'element-plus'
import { TableColumn, TableSlotDefault } from '@/types/table'

interface Params {
  pageIndex?: number
  pageSize?: number
}

const { t } = useI18n()

const columns: TableColumn[] = [
  {
    field: 'index',
    label: t('userDemo.index'),
    type: 'index'
  },
  {
    field: 'username',
    label: t('userDemo.username')
  },
  {
    field: 'password',
    label: t('userDemo.password')
  },
  {
    field: 'role',
    label: t('userDemo.role')
  },
  {
    field: 'remark',
    label: t('userDemo.remark'),
    formatter: (row: UserType) => {
      return h(
        'span',
        row.username === 'admin' ? t('userDemo.remarkMessage1') : t('userDemo.remarkMessage2')
      )
    }
  },
  {
    field: 'action',
    label: t('userDemo.action')
  }
]

const loading = ref(true)

let tableDataList = ref<UserType[]>([])

const getTableList = async (params?: Params) => {
  const res = await getUserListApi({
    params: params || {
      pageIndex: 1,
      pageSize: 10
    }
  })
  // .catch(() => {})
  // .finally(() => {
  //   loading.value = false
  // })
  if (res) {
    tableDataList.value = res.data.list
    loading.value = false
  }
}

getTableList()

const actionFn = (data: TableSlotDefault) => {
  console.log(data)
}
</script>

<template>
  <ContentWrap :title="t('userDemo.title')" :message="t('userDemo.message')">
    <Table :columns="columns" :data="tableDataList" :loading="loading" :selection="false">
      <template #action="data">
        <ElButton type="primary" @click="actionFn(data as TableSlotDefault)">
          {{ t('tableDemo.action') }}
        </ElButton>
      </template>
    </Table>
  </ContentWrap>
</template>
