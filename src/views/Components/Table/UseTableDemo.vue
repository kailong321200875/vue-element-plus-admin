<script setup lang="ts">
import { ContentWrap } from '@/components/ContentWrap'
import { useI18n } from '@/hooks/web/useI18n'
import { Table } from '@/components/Table'
import { getTableListApi } from '@/api/table'
import { TableData } from '@/api/table/types'
import { ref, h } from 'vue'
import { ElTag, ElButton } from 'element-plus'
import { useTable } from '@/hooks/web/useTable'

const { register, tableObject, methods } = useTable<
  {
    total: number
    list: TableData[]
  },
  TableData
>({
  getListApi: getTableListApi,
  response: {
    list: 'list',
    total: 'total'
  }
})

const { getList } = methods

getList()

const { t } = useI18n()

const columns: TableColumn[] = [
  {
    field: 'index',
    label: t('tableDemo.index'),
    type: 'index'
  },
  {
    field: 'title',
    label: t('tableDemo.title')
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
      return h(
        ElTag,
        {
          type: cellValue === 1 ? 'success' : cellValue === 2 ? 'warning' : 'danger'
        },
        () =>
          cellValue === 1
            ? t('tableDemo.important')
            : cellValue === 2
            ? t('tableDemo.good')
            : t('tableDemo.commonly')
      )
    }
  },
  {
    field: 'pageviews',
    label: t('tableDemo.pageviews')
  },
  {
    field: 'action',
    label: t('tableDemo.action')
  }
]

const acitonFn = (data: TableSlotDefault) => {
  console.log(data)
}

const paginationObj = ref<Pagination>()

const showPagination = (show: boolean) => {
  if (show) {
    paginationObj.value = {
      total: tableObject.total
    }
  } else {
    paginationObj.value = undefined
  }
}

const reserveIndex = (custom: boolean) => {
  const { setProps } = methods
  setProps({
    reserveIndex: custom
  })
}

const showSelections = (show: boolean) => {
  const { setProps } = methods
  setProps({
    selection: show
  })
}
</script>

<template>
  <ContentWrap :title="`UseTable ${t('tableDemo.operate')}`">
    <ElButton @click="showPagination(true)">
      {{ t('tableDemo.show') }} {{ t('tableDemo.pagination') }}
    </ElButton>
    <ElButton @click="showPagination(false)">
      {{ t('tableDemo.hidden') }} {{ t('tableDemo.pagination') }}
    </ElButton>

    <ElButton @click="reserveIndex(true)">{{ t('tableDemo.reserveIndex') }}</ElButton>
    <ElButton @click="reserveIndex(false)">{{ t('tableDemo.restoreIndex') }}</ElButton>

    <ElButton @click="showSelections(true)">{{ t('tableDemo.showSelections') }}</ElButton>
    <ElButton @click="showSelections(false)">{{ t('tableDemo.hiddenSelections') }}</ElButton>

    <ElButton @click="showSelections(true)">{{ t('tableDemo.showExpandedRows') }}</ElButton>
    <ElButton @click="showSelections(false)">{{ t('tableDemo.hiddenExpandedRows') }}</ElButton>
  </ContentWrap>
  <ContentWrap :title="`UseTable ${t('tableDemo.example')}`">
    <Table
      v-model:pageSize="tableObject.pageSize"
      v-model:currentPage="tableObject.currentPage"
      :columns="columns"
      :data="tableObject.tableList"
      :loading="tableObject.loading"
      :pagination="paginationObj"
      @register="register"
    >
      <template #action="data">
        <ElButton type="primary" @click="acitonFn(data as TableSlotDefault)">
          {{ t('tableDemo.action') }}
        </ElButton>
      </template>
    </Table>
  </ContentWrap>
</template>
