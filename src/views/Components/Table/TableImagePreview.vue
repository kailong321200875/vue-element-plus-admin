<script setup lang="tsx">
import { ContentWrap } from '@/components/ContentWrap'
import { useI18n } from '@/hooks/web/useI18n'
import { Table, TableColumn } from '@/components/Table'
import { getTableListApi } from '@/api/table'
import { TableData } from '@/api/table/types'
import { ref } from 'vue'
import { ElTag } from 'element-plus'

interface Params {
  pageIndex?: number
  pageSize?: number
}

const { t } = useI18n()

const columns: TableColumn[] = [
  {
    field: 'title',
    label: t('tableDemo.title')
  },
  {
    field: 'image_uri',
    label: t('tableDemo.preview')
  },
  {
    field: 'author',
    label: t('tableDemo.author')
  },
  {
    field: 'display_time',
    label: t('tableDemo.displayTime')
  },
  {
    field: 'importance',
    label: t('tableDemo.importance'),
    formatter: (_: Recordable, __: TableColumn, cellValue: number) => {
      return (
        <ElTag type={cellValue === 1 ? 'success' : cellValue === 2 ? 'warning' : 'danger'}>
          {cellValue === 1
            ? t('tableDemo.important')
            : cellValue === 2
            ? t('tableDemo.good')
            : t('tableDemo.commonly')}
        </ElTag>
      )
    }
  },
  {
    field: 'pageviews',
    label: t('tableDemo.pageviews')
  }
]

const loading = ref(true)

let tableDataList = ref<TableData[]>([])

const getTableList = async (params?: Params) => {
  const res = await getTableListApi(
    params || {
      pageIndex: 1,
      pageSize: 10
    }
  )
    .catch(() => {})
    .finally(() => {
      loading.value = false
    })
  if (res) {
    tableDataList.value = res.data.list
  }
}

getTableList()
</script>

<template>
  <ContentWrap :title="t('router.PicturePreview')">
    <Table :columns="columns" :data="tableDataList" :loading="loading" :preview="['image_uri']" />
  </ContentWrap>
</template>
