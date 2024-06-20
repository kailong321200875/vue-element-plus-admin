<script setup lang="tsx">
import { ContentWrap } from '@/components/ContentWrap'
import { useI18n } from '@/hooks/web/useI18n'
import { Table, TableColumn, TableSlotDefault } from '@/components/Table'
import { getTableListApi } from '@/api/table'
import { ref, reactive, unref, onMounted } from 'vue'
import { ElTag } from 'element-plus'
import { useTable } from '@/hooks/web/useTable'
import { BaseButton } from '@/components/Button'

const { tableRegister, tableMethods, tableState } = useTable({
  fetchDataApi: async () => {
    const { currentPage, pageSize } = tableState
    const res = await getTableListApi({
      pageIndex: unref(currentPage),
      pageSize: unref(pageSize)
    })
    return {
      list: res.data.list,
      total: res.data.total
    }
  }
})
const { loading, dataList, total, currentPage, pageSize } = tableState
const { setProps, setColumn, getElTableExpose, addColumn, delColumn, refresh } = tableMethods

const { t } = useI18n()

const columns = reactive<TableColumn[]>([])

onMounted(() => {
  setTimeout(() => {
    setProps({
      columns: [
        {
          field: 'expand',
          type: 'expand',
          slots: {
            default: (data: TableSlotDefault) => {
              const { row } = data
              return (
                <div class="ml-30px">
                  <div>
                    {t('tableDemo.title')}：{row.title}
                  </div>
                  <div>
                    {t('tableDemo.author')}：{row.author}
                  </div>
                  <div>
                    {t('tableDemo.displayTime')}：{row.display_time}
                  </div>
                </div>
              )
            }
          }
        },
        {
          field: 'selection',
          type: 'selection'
        },
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
        },
        {
          field: 'action',
          label: t('tableDemo.action'),
          slots: {
            default: (data) => {
              return (
                <BaseButton type="primary" onClick={() => actionFn(data)}>
                  {t('tableDemo.action')}
                </BaseButton>
              )
            }
          }
        }
      ]
    })
  }, 2000)
})

const actionFn = (data: TableSlotDefault) => {
  console.log(data)
}

const canShowPagination = ref(true)
const showPagination = (show: boolean) => {
  canShowPagination.value = show
}

const reserveIndex = (custom: boolean) => {
  setProps({
    reserveIndex: custom
  })
}

const showSelections = (show: boolean) => {
  setColumn([
    {
      field: 'selection',
      path: 'hidden',
      value: !show
    }
  ])
}

const index = ref(1)

const changeTitle = () => {
  setColumn([
    {
      field: 'title',
      path: 'label',
      value: `${t('tableDemo.title')}${unref(index)}`
    }
  ])
  index.value++
}

const showExpandedRows = (show: boolean) => {
  setColumn([
    {
      field: 'expand',
      path: 'hidden',
      value: !show
    }
  ])
}

const selectAllNone = async () => {
  const elTableRef = await getElTableExpose()
  elTableRef?.toggleAllSelection()
}

const showAction = ref(true)
const delOrAddAction = () => {
  if (unref(showAction)) {
    delColumn('action')
    showAction.value = false
  } else {
    addColumn({
      field: 'action',
      label: t('tableDemo.action'),
      slots: {
        default: (data) => {
          return (
            <BaseButton type="primary" onClick={() => actionFn(data)}>
              {t('tableDemo.action')}
            </BaseButton>
          )
        }
      }
    })
    showAction.value = true
  }
}

const showStripe = ref(false)
const showOrHiddenStripe = () => {
  setProps({
    stripe: !unref(showStripe)
  })
  showStripe.value = !unref(showStripe)
}

const height = ref<string | number>('auto')
const fixedHeaderOrAuto = () => {
  if (unref(height) === 'auto') {
    setProps({
      height: 300
    })
    height.value = 300
  } else {
    setProps({
      height: 'auto'
    })
    height.value = 'auto'
  }
}

const getSelections = async () => {
  const elTableRef = await getElTableExpose()
  const selections = elTableRef?.getSelectionRows()
  console.log(selections)
}
</script>

<template>
  <ContentWrap :title="`UseTable ${t('tableDemo.operate')}`" style="margin-bottom: 20px">
    <BaseButton @click="showPagination(true)">
      {{ t('tableDemo.show') }} {{ t('tableDemo.pagination') }}
    </BaseButton>
    <BaseButton @click="showPagination(false)">
      {{ t('tableDemo.hidden') }} {{ t('tableDemo.pagination') }}
    </BaseButton>

    <BaseButton @click="reserveIndex(true)">{{ t('tableDemo.reserveIndex') }}</BaseButton>
    <BaseButton @click="reserveIndex(false)">{{ t('tableDemo.restoreIndex') }}</BaseButton>

    <BaseButton @click="showSelections(true)">{{ t('tableDemo.showSelections') }}</BaseButton>
    <BaseButton @click="showSelections(false)">{{ t('tableDemo.hiddenSelections') }}</BaseButton>

    <BaseButton @click="changeTitle">{{ t('tableDemo.changeTitle') }}</BaseButton>

    <BaseButton @click="showExpandedRows(true)">{{ t('tableDemo.showExpandedRows') }}</BaseButton>
    <BaseButton @click="showExpandedRows(false)">{{
      t('tableDemo.hiddenExpandedRows')
    }}</BaseButton>

    <BaseButton @click="selectAllNone">{{ t('tableDemo.selectAllNone') }}</BaseButton>

    <BaseButton @click="delOrAddAction">{{ t('tableDemo.delOrAddAction') }}</BaseButton>

    <BaseButton @click="showOrHiddenStripe">{{ t('tableDemo.showOrHiddenStripe') }}</BaseButton>

    <BaseButton @click="fixedHeaderOrAuto">{{ t('tableDemo.fixedHeaderOrAuto') }}</BaseButton>

    <BaseButton @click="getSelections">{{ t('tableDemo.getSelections') }}</BaseButton>

    <!-- <BaseButton @click="showOrHiddenSortable">{{ t('tableDemo.showOrHiddenSortable') }}</BaseButton> -->
  </ContentWrap>
  <ContentWrap :title="`UseTable ${t('tableDemo.example')}`">
    <Table
      v-model:pageSize="pageSize"
      v-model:currentPage="currentPage"
      showAction
      showSummary
      default-expand-all
      :columns="columns"
      row-key="id"
      :data="dataList"
      :loading="loading"
      :pagination="
        canShowPagination
          ? {
              total: total
            }
          : undefined
      "
      @register="tableRegister"
      @refresh="refresh"
    />
  </ContentWrap>
</template>

<style lang="less" scoped>
.el-button {
  margin-top: 10px;
}
</style>
