<script setup lang="tsx">
  import { ContentWrap } from '@/components/ContentWrap'
  import { Search } from '@/components/Search'
  import { Dialog } from '@/components/Dialog'
  import { useI18n } from 'vue-i18n'
  import { ElTag } from 'element-plus'
  import { Table } from '@/components/Table'
  import {
    getDepartmentTreeApi,
    getDepartmentListApi,
    saveDepartmentApi,
    deleteDepartmentsApi
  } from '@/api/department'
  import type { DepartmentItem } from '@/api/department/types'
  import { useTable } from '@/hooks/web/useTable'
  import { ref, unref, reactive } from 'vue'
  import Write from './components/Write.vue'
  import Detail from './components/Detail.vue'
  import { CrudSchema, useCrudSchemas } from '@/hooks/web/useCrudSchemas'
  import { ElButton } from 'element-plus'

  const { tableRegister, tableState, tableMethods } = useTable<DepartmentItem>({
    fetchDataApi: async (params) => {
      const res = await getDepartmentListApi(params)
      return {
        list: res.data.list,
        total: res.data.total
      }
    },
    fetchDelApi: (ids) => deleteDepartmentsApi(ids)
  })
  const { getElTableExpose, delList, search, refresh } = tableMethods

  const { t } = useI18n()

  const crudSchemas = reactive<CrudSchema[]>([
    {
      field: 'selection',
      search: {
        hidden: true
      },
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
      search: {
        hidden: true
      },
      form: {
        hidden: true
      },
      detail: {
        hidden: true
      }
    },
    {
      field: 'id',
      label: t('userDemo.departmentName'),
      table: {
        slots: {
          default: (data: any) => {
            return <>{data.row.departmentName}</>
          }
        }
      },
      form: {
        component: 'TreeSelect',
        componentProps: {
          nodeKey: 'id',
          props: {
            label: 'departmentName'
          }
        },
        optionApi: async () => {
          const res = await getDepartmentTreeApi()
          return res.data.list
        }
      },
      detail: {
        slots: {
          default: (data: any) => {
            return <>{data.departmentName}</>
          }
        }
      }
    },
    {
      field: 'status',
      label: t('userDemo.status'),
      search: {
        hidden: true
      },
      table: {
        slots: {
          default: (data: any) => {
            const status = data.row.status
            return (
              <>
                <ElTag type={status === 0 ? 'danger' : 'success'}>
                  {status === 1 ? t('userDemo.enable') : t('userDemo.disable')}
                </ElTag>
              </>
            )
          }
        }
      },
      form: {
        component: 'Select',
        componentProps: {
          options: [
            {
              value: 0,
              label: t('userDemo.disable')
            },
            {
              value: 1,
              label: t('userDemo.enable')
            }
          ]
        }
      },
      detail: {
        slots: {
          default: (data: any) => {
            return (
              <>
                <ElTag type={data.status === 0 ? 'danger' : 'success'}>
                  {data.status === 1 ? t('userDemo.enable') : t('userDemo.disable')}
                </ElTag>
              </>
            )
          }
        }
      }
    },
    {
      field: 'createTime',
      label: t('tableDemo.displayTime'),
      search: {
        hidden: true
      },
      form: {
        hidden: true
      }
    },
    {
      field: 'remark',
      label: t('userDemo.remark'),
      search: {
        hidden: true
      },
      form: {
        component: 'Input',
        componentProps: {
          type: 'textarea',
          rows: 5
        },
        colProps: {
          span: 24
        }
      },
      detail: {
        slots: {
          default: (data: any) => {
            return <>{data.remark}</>
          }
        }
      }
    },
    {
      field: 'action',
      width: '260px',
      label: t('tableDemo.action'),
      search: {
        hidden: true
      },
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
                <ElButton type="primary" onClick={() => action(data.row, 'edit')}>
                  {t('exampleDemo.edit')}
                </ElButton>
                <ElButton type="success" onClick={() => action(data.row, 'detail')}>
                  {t('exampleDemo.detail')}
                </ElButton>
                <ElButton type="danger" onClick={() => delData(data.row)}>
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

  const dialogVisible = ref(false)
  const dialogTitle = ref('')

  const currentRow = ref<DepartmentItem | null>(null)
  const actionType = ref('')

  const AddAction = () => {
    dialogTitle.value = t('exampleDemo.add')
    currentRow.value = null
    dialogVisible.value = true
    actionType.value = ''
  }

  const delLoading = ref(false)

  const delData = async (row: DepartmentItem | null) => {
    const elTableExpose = await getElTableExpose()
    const ids = row
      ? [row.id]
      : elTableExpose?.getSelectionRows().map((v: DepartmentItem) => v.id) || []
    delLoading.value = true
    await delList(ids).finally(() => {
      delLoading.value = false
    })
  }

  const action = (row: DepartmentItem, type: string) => {
    dialogTitle.value = t(type === 'edit' ? 'exampleDemo.edit' : 'exampleDemo.detail')
    actionType.value = type
    currentRow.value = row
    dialogVisible.value = true
  }

  const writeRef = ref<ComponentRef<typeof Write>>()

  const saveLoading = ref(false)

  const save = async () => {
    const write = unref(writeRef)
    const formData = await write?.submit()
    if (formData) {
      saveLoading.value = true
      const res = await saveDepartmentApi(formData)
        .catch(() => {})
        .finally(() => {
          saveLoading.value = false
        })
      if (res) {
        dialogVisible.value = false
        refresh(true)
      }
    }
  }
</script>

<template>
  <ContentWrap>
    <Search :schema="allSchemas.searchSchema" @search="search" @reset="search" />

    <div class="mb-10px">
      <ElButton type="primary" @click="AddAction">{{ t('exampleDemo.add') }}</ElButton>
      <ElButton :loading="delLoading" type="danger" @click="delData(null)">
        {{ t('exampleDemo.del') }}
      </ElButton>
    </div>

    <Table
      v-model:pageSize="tableState.pageSize"
      v-model:currentPage="tableState.currentPage"
      :columns="allSchemas.tableColumns"
      :data="tableState.dataList"
      :loading="tableState.loading"
      :pagination="{
        total: tableState.total
      }"
      @register="tableRegister"
    />
  </ContentWrap>

  <Dialog v-model="dialogVisible" :title="dialogTitle">
    <Write
      v-if="actionType !== 'detail'"
      ref="writeRef"
      :form-schema="allSchemas.formSchema"
      :current-row="currentRow"
    />

    <Detail
      v-if="actionType === 'detail'"
      :detail-schema="allSchemas.detailSchema"
      :current-row="currentRow"
    />

    <template #footer>
      <ElButton v-if="actionType !== 'detail'" type="primary" :loading="saveLoading" @click="save">
        {{ t('exampleDemo.save') }}
      </ElButton>
      <ElButton @click="dialogVisible = false">{{ t('dialogDemo.close') }}</ElButton>
    </template>
  </Dialog>
</template>
