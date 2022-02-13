<script setup lang="ts">
import { ContentWrap } from '@/components/ContentWrap'
import { Search } from '@/components/Search'
import { Dialog } from '@/components/Dialog'
import { useI18n } from '@/hooks/web/useI18n'
import { ElButton, ElTag } from 'element-plus'
import { Table } from '@/components/Table'
import { getTableListApi, saveTableApi } from '@/api/table'
import { useTable } from '@/hooks/web/useTable'
import { TableData } from '@/api/table/types'
import { h, reactive, ref, unref } from 'vue'
import Write from './components/Write.vue'

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

const { getList, setSearchParmas } = methods

getList()

const { t } = useI18n()

const searchData: FormSchema[] = [
  {
    label: t('exampleDemo.title'),
    value: '',
    component: 'Input',
    field: 'title'
  }
]

const columns = reactive<TableColumn[]>([
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
])

const AddAction = () => {
  tableObject.currentRow = null
  tableObject.dialogVisible = true
}

const editAction = (row: TableData) => {
  tableObject.currentRow = row
  tableObject.dialogVisible = true
}

const writeRef = ref<ComponentRef<typeof Write>>()

const loading = ref(false)

const save = async () => {
  const write = unref(writeRef)
  const validate = await write?.elFormRef?.validate()?.catch(() => {})
  if (validate) {
    loading.value = true
    const data = await write?.getFormData()
    const res = await saveTableApi({
      data
    })
      .catch(() => {})
      .finally(() => {
        loading.value = false
      })
    if (res) {
      tableObject.dialogVisible = false
      tableObject.currentPage = 1
      getList()
    }
  }
}
</script>

<template>
  <ContentWrap>
    <Search :schema="searchData" @search="setSearchParmas" @reset="setSearchParmas" />

    <div class="mb-10px">
      <ElButton type="primary" @click="AddAction">{{ t('exampleDemo.add') }}</ElButton>
      <ElButton type="danger">{{ t('exampleDemo.del') }}</ElButton>
    </div>

    <Table
      v-model:pageSize="tableObject.pageSize"
      v-model:currentPage="tableObject.currentPage"
      :columns="columns"
      :data="tableObject.tableList"
      :loading="tableObject.loading"
      :pagination="{
        total: tableObject.total
      }"
      @register="register"
    >
      <template #action="{ row }">
        <ElButton type="primary" @click="editAction(row)">
          {{ t('exampleDemo.edit') }}
        </ElButton>
      </template>
    </Table>
  </ContentWrap>

  <Dialog v-model="tableObject.dialogVisible" :title="t('exampleDemo.add')">
    <Write ref="writeRef" :current-row="tableObject.currentRow" />

    <template #footer>
      <ElButton type="primary" :loading="loading" @click="save">
        {{ t('exampleDemo.save') }}
      </ElButton>
      <ElButton @click="tableObject.dialogVisible = false">{{ t('dialogDemo.close') }}</ElButton>
    </template>
  </Dialog>
</template>
