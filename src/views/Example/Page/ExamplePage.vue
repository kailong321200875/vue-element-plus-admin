<script setup lang="tsx">
import { ContentWrap } from '@/components/ContentWrap'
import { Search } from '@/components/Search'
import { useI18n } from '@/hooks/web/useI18n'
import { ElButton, ElTag } from 'element-plus'
import { Table, TableColumn } from '@/components/Table'
import { getTableListApi, delTableListApi } from '@/api/table'
import { useTable } from '@/hooks/web/useTable'
import { TableData } from '@/api/table/types'
import { h, reactive, ref, unref } from 'vue'
import { useRouter } from 'vue-router'
import { useEmitt } from '@/hooks/event/useEmitt'
import { CrudSchema, useCrudSchemas } from '@/hooks/web/useCrudSchemas'

defineOptions({
  name: 'ExamplePage'
})

const { push } = useRouter()

const ids = ref<string[]>([])

const searchParams = ref({})
const setSearchParams = (params: any) => {
  searchParams.value = params
  getList()
}

const { tableRegister, tableState, tableMethods } = useTable({
  fetchDataApi: async () => {
    const { currentPage, pageSize } = tableState
    const res = await getTableListApi({
      pageIndex: unref(currentPage),
      pageSize: unref(pageSize),
      ...unref(searchParams)
    })
    return {
      list: res.data.list,
      total: res.data.total
    }
  },
  fetchDelApi: async () => {
    const res = await delTableListApi(unref(ids))
    return !!res
  }
})
const { loading, dataList, total, currentPage, pageSize } = tableState
const { getList, getElTableExpose, delList } = tableMethods

getList()

useEmitt({
  name: 'getList',
  callback: (type: string) => {
    if (type === 'add') {
      currentPage.value = 1
    }
    getList()
  }
})

const { t } = useI18n()

const crudSchemas = reactive<CrudSchema[]>([
  {
    field: 'selection',
    form: {
      hidden: true
    },
    detail: {
      hidden: true
    },
    table: {
      type: 'selection'
    }
  },
  {
    field: 'index',
    label: t('tableDemo.index'),
    type: 'index',
    form: {
      hidden: true
    },
    detail: {
      hidden: true
    }
  },
  {
    field: 'title',
    label: t('tableDemo.title'),
    search: {
      component: 'Input'
    },
    form: {
      component: 'Input',
      colProps: {
        span: 24
      }
    },
    detail: {
      span: 24
    }
  },
  {
    field: 'author',
    label: t('tableDemo.author')
  },
  {
    field: 'display_time',
    label: t('tableDemo.displayTime'),
    form: {
      component: 'DatePicker',
      componentProps: {
        type: 'datetime',
        valueFormat: 'YYYY-MM-DD HH:mm:ss'
      }
    }
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
    },
    form: {
      component: 'Select',
      componentProps: {
        style: {
          width: '100%'
        },
        options: [
          {
            label: '重要',
            value: 3
          },
          {
            label: '良好',
            value: 2
          },
          {
            label: '一般',
            value: 1
          }
        ]
      }
    }
  },
  {
    field: 'pageviews',
    label: t('tableDemo.pageviews'),
    form: {
      component: 'InputNumber',
      value: 0
    }
  },
  {
    field: 'content',
    label: t('exampleDemo.content'),
    table: {
      hidden: true
    },
    form: {
      component: 'Editor',
      colProps: {
        span: 24
      }
    },
    detail: {
      span: 24
    }
  },
  {
    field: 'action',
    width: '260px',
    label: t('tableDemo.action'),
    form: {
      hidden: true
    },
    detail: {
      hidden: true
    },
    table: {
      slots: {
        default: (data: any) => {
          return (
            <>
              <ElButton type="primary" onClick={() => action(data[0].row, 'edit')}>
                {t('exampleDemo.edit')}
              </ElButton>
              <ElButton type="success" onClick={() => action(data[0].row, 'detail')}>
                {t('exampleDemo.detail')}
              </ElButton>
              <ElButton type="danger" onClick={() => delData(data[0].row)}>
                {t('exampleDemo.del')}
              </ElButton>
            </>
          )
        }
      }
    }
  }
])

// @ts-ignore
const { allSchemas } = useCrudSchemas(crudSchemas)

const AddAction = () => {
  push('/example/example-add')
}

const delLoading = ref(false)

const delData = async (row: TableData | null) => {
  const elTableExpose = await getElTableExpose()
  ids.value = row ? [row.id] : elTableExpose?.getSelectionRows().map((v: TableData) => v.id) || []
  delLoading.value = true
  await delList(unref(ids).length).finally(() => {
    delLoading.value = false
  })
}

const action = (row: TableData, type: string) => {
  push(`/example/example-${type}?id=${row.id}`)
}
</script>

<template>
  <ContentWrap>
    <Search :schema="allSchemas.searchSchema" @search="setSearchParams" @reset="setSearchParams" />

    <div class="mb-10px">
      <ElButton type="primary" @click="AddAction">{{ t('exampleDemo.add') }}</ElButton>
      <ElButton :loading="delLoading" type="danger" @click="delData(null)">
        {{ t('exampleDemo.del') }}
      </ElButton>
    </div>

    <Table
      v-model:pageSize="pageSize"
      v-model:currentPage="currentPage"
      :columns="allSchemas.tableColumns"
      :data="dataList"
      :loading="loading"
      :pagination="{
        total: total
      }"
      @register="tableRegister"
    />
  </ContentWrap>
</template>
@/hooks/event/useEmitt
