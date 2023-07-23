<script setup lang="tsx">
import { ContentWrap } from '@/components/ContentWrap'
import { useI18n } from '@/hooks/web/useI18n'
import { Table, TableColumn } from '@/components/Table'
import { ref, unref, nextTick, watch } from 'vue'
import { ElButton, ElTree, ElInput, ElDivider } from 'element-plus'
import { getDepartmentApi, getUserByIdApi } from '@/api/department'
import type { DepartmentItem, DepartmentUserItem } from '@/api/department/types'
import { useTable } from '@/hooks/web/useTable'
import { Search } from '@/components/Search'
import { FormSchema } from '@/components/Form'

const { t } = useI18n()

const { tableRegister, tableState, tableMethods } = useTable({
  fetchDataApi: async () => {
    const { pageSize, currentPage } = tableState
    const res = await getUserByIdApi({
      id: unref(currentNodeKey),
      pageIndex: unref(currentPage),
      pageSize: unref(pageSize),
      ...unref(searchParams)
    })
    return {
      list: res.data.list || [],
      total: res.data.total || 0
    }
  }
})
const { total, loading, dataList, pageSize, currentPage } = tableState
const { getList } = tableMethods

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
    field: 'account',
    label: t('userDemo.account')
  },
  {
    field: 'role',
    label: t('userDemo.role')
  },
  {
    field: 'email',
    label: t('userDemo.email')
  },
  {
    field: 'createTime',
    label: t('userDemo.createTime')
  },
  {
    field: 'action',
    label: t('userDemo.action'),
    slots: {
      default: (data) => {
        return (
          <ElButton type="primary" onClick={() => actionFn(data[0].row)}>
            {t('tableDemo.action')}
          </ElButton>
        )
      }
    }
  }
]

const searchSchema: FormSchema[] = [
  {
    field: 'username',
    label: t('userDemo.username'),
    component: 'Input'
  },
  {
    field: 'account',
    label: t('userDemo.account'),
    component: 'Input'
  }
]

const searchParams = ref({})
const setSearchParams = (params: any) => {
  currentPage.value = 1
  searchParams.value = params
  getList()
}

const actionFn = (data: DepartmentUserItem) => {
  console.log(data)
}

const treeEl = ref<typeof ElTree>()

const currentNodeKey = ref('')
const departmentList = ref<DepartmentItem[]>([])
const fetchDepartment = async () => {
  const res = await getDepartmentApi()
  departmentList.value = res.data.list
  currentNodeKey.value =
    (res.data.list[0] && res.data.list[0]?.children && res.data.list[0].children[0].id) || ''
  await nextTick()
  unref(treeEl)?.setCurrentKey(currentNodeKey.value)
}
fetchDepartment()

const currentDepartment = ref('')
watch(
  () => currentDepartment.value,
  (val) => {
    unref(treeEl)!.filter(val)
  }
)

const currentChange = (data: DepartmentItem) => {
  if (data.children) return
  currentNodeKey.value = data.id
  currentPage.value = 1
  getList()
}

const filterNode = (value: string, data: DepartmentItem) => {
  if (!value) return true
  return data.departmentName.includes(value)
}
</script>

<template>
  <div class="flex w-100% h-100%">
    <ContentWrap class="flex-1">
      <div class="flex justify-center items-center">
        <div class="flex-1">{{ t('userDemo.departmentList') }}</div>
        <ElInput
          v-model="currentDepartment"
          class="flex-[2]"
          :placeholder="t('userDemo.searchDepartment')"
          clearable
        />
      </div>
      <ElDivider />
      <ElTree
        ref="treeEl"
        :data="departmentList"
        default-expand-all
        node-key="id"
        :current-node-key="currentNodeKey"
        :props="{
          label: 'departmentName'
        }"
        :filter-node-method="filterNode"
        @current-change="currentChange"
      />
    </ContentWrap>
    <ContentWrap class="flex-[2] ml-20px">
      <Search
        :schema="searchSchema"
        @reset="setSearchParams"
        @search="setSearchParams"
        :search-loading="loading"
      />
      <div>
        <Table
          v-model:current-page="currentPage"
          v-model:page-size="pageSize"
          :columns="columns"
          :data="dataList"
          :loading="loading"
          @register="tableRegister"
          :pagination="{
            total
          }"
        />
      </div>
    </ContentWrap>
  </div>
</template>
