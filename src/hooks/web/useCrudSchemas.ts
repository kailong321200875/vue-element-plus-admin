import { reactive } from 'vue'
import { eachTree, treeMap, filter } from '@/utils/tree'
import { findIndex } from '@/utils'
import { useDictStoreWithOut } from '@/store/modules/dict'
import { useI18n } from '@/hooks/web/useI18n'
import type { AxiosPromise } from 'axios'
import { FormSchema } from '@/types/form'
import { TableColumn } from '@/types/table'
import { DescriptionsSchema } from '@/types/descriptions'

export type CrudSchema = Omit<TableColumn, 'children'> & {
  search?: CrudSearchParams
  table?: CrudTableParams
  form?: CrudFormParams
  detail?: CrudDescriptionsParams
  children?: CrudSchema[]
}

type CrudSearchParams = {
  // 是否显示在查询项
  show?: boolean
  // 字典名称，会去取全局的字典
  dictName?: string
  // 接口
  api?: () => Promise<any>
  // 搜索字段
  field?: string
} & Omit<FormSchema, 'field'>

type CrudTableParams = {
  // 是否显示表头
  show?: boolean
} & Omit<FormSchema, 'field'>

type CrudFormParams = {
  // 字典名称，会去取全局的字典
  dictName?: string
  // 接口
  api?: () => Promise<any>
  // 是否显示表单项
  show?: boolean
} & Omit<FormSchema, 'field'>

type CrudDescriptionsParams = {
  // 是否显示表单项
  show?: boolean
} & Omit<DescriptionsSchema, 'field'>

const dictStore = useDictStoreWithOut()

const { t } = useI18n()

interface AllSchemas {
  searchSchema: FormSchema[]
  tableColumns: TableColumn[]
  formSchema: FormSchema[]
  detailSchema: DescriptionsSchema[]
}

// 过滤所有结构
export const useCrudSchemas = (
  crudSchema: CrudSchema[]
): {
  allSchemas: AllSchemas
} => {
  // 所有结构数据
  const allSchemas = reactive<AllSchemas>({
    searchSchema: [],
    tableColumns: [],
    formSchema: [],
    detailSchema: []
  })

  const searchSchema = filterSearchSchema(crudSchema, allSchemas)
  allSchemas.searchSchema = searchSchema || []

  const tableColumns = filterTableSchema(crudSchema)
  allSchemas.tableColumns = tableColumns || []

  const formSchema = filterFormSchema(crudSchema, allSchemas)
  allSchemas.formSchema = formSchema

  const detailSchema = filterDescriptionsSchema(crudSchema)
  allSchemas.detailSchema = detailSchema

  return {
    allSchemas
  }
}

// 过滤 Search 结构
const filterSearchSchema = (crudSchema: CrudSchema[], allSchemas: AllSchemas): FormSchema[] => {
  const searchSchema: FormSchema[] = []

  // 获取字典列表队列
  const searchRequestTask: Array<() => Promise<void>> = []

  eachTree(crudSchema, (schemaItem: CrudSchema) => {
    // 判断是否显示
    if (schemaItem?.search?.show) {
      const searchSchemaItem = {
        // 默认为 input
        component: schemaItem.search.component || 'Input',
        componentProps: {},
        ...schemaItem.search,
        field: schemaItem?.search?.field || schemaItem.field,
        label: schemaItem.search?.label || schemaItem.label
      }

      if (searchSchemaItem.dictName) {
        // 如果有 dictName 则证明是从字典中获取数据
        const dictArr = dictStore.getDictObj[searchSchemaItem.dictName]
        searchSchemaItem.componentProps!.options = filterOptions(dictArr)
      } else if (searchSchemaItem.api) {
        searchRequestTask.push(async () => {
          const res = await (searchSchemaItem.api as () => AxiosPromise)()
          if (res) {
            const index = findIndex(allSchemas.searchSchema, (v: FormSchema) => {
              return v.field === searchSchemaItem.field
            })
            if (index !== -1) {
              allSchemas.searchSchema[index]!.componentProps!.options = filterOptions(
                res,
                searchSchemaItem.componentProps.optionsAlias?.labelField
              )
            }
          }
        })
      }

      // 删除不必要的字段
      delete searchSchemaItem.show
      delete searchSchemaItem.dictName

      searchSchema.push(searchSchemaItem)
    }
  })

  for (const task of searchRequestTask) {
    task()
  }

  return searchSchema
}

// 过滤 table 结构
const filterTableSchema = (crudSchema: CrudSchema[]): TableColumn[] => {
  const tableColumns = treeMap<CrudSchema>(crudSchema, {
    conversion: (schema: CrudSchema) => {
      if (schema?.table?.show !== false) {
        return {
          ...schema.table,
          ...schema
        }
      }
    }
  })

  // 第一次过滤会有 undefined 所以需要二次过滤
  return filter<TableColumn>(tableColumns as TableColumn[], (data) => {
    if (data.children === void 0) {
      delete data.children
    }
    return !!data.field
  })
}

// 过滤 form 结构
const filterFormSchema = (crudSchema: CrudSchema[], allSchemas: AllSchemas): FormSchema[] => {
  const formSchema: FormSchema[] = []

  // 获取字典列表队列
  const formRequestTask: Array<() => Promise<void>> = []

  eachTree(crudSchema, (schemaItem: CrudSchema) => {
    // 判断是否显示
    if (schemaItem?.form?.show !== false) {
      const formSchemaItem = {
        // 默认为 input
        component: schemaItem?.form?.component || 'Input',
        componentProps: {},
        ...schemaItem.form,
        field: schemaItem.field,
        label: schemaItem.search?.label || schemaItem.label
      }

      if (formSchemaItem.dictName) {
        // 如果有 dictName 则证明是从字典中获取数据
        const dictArr = dictStore.getDictObj[formSchemaItem.dictName]
        formSchemaItem.componentProps!.options = filterOptions(dictArr)
      } else if (formSchemaItem.api) {
        formRequestTask.push(async () => {
          const res = await (formSchemaItem.api as () => AxiosPromise)()
          if (res) {
            const index = findIndex(allSchemas.formSchema, (v: FormSchema) => {
              return v.field === formSchemaItem.field
            })
            if (index !== -1) {
              allSchemas.formSchema[index]!.componentProps!.options = filterOptions(
                res,
                formSchemaItem.componentProps.optionsAlias?.labelField
              )
            }
          }
        })
      }

      // 删除不必要的字段
      delete formSchemaItem.show
      delete formSchemaItem.dictName

      formSchema.push(formSchemaItem)
    }
  })

  for (const task of formRequestTask) {
    task()
  }
  return formSchema
}

// 过滤 descriptions 结构
const filterDescriptionsSchema = (crudSchema: CrudSchema[]): DescriptionsSchema[] => {
  const descriptionsSchema: FormSchema[] = []

  eachTree(crudSchema, (schemaItem: CrudSchema) => {
    // 判断是否显示
    if (schemaItem?.detail?.show !== false) {
      const descriptionsSchemaItem = {
        ...schemaItem.detail,
        field: schemaItem.field,
        label: schemaItem.detail?.label || schemaItem.label
      }

      // 删除不必要的字段
      delete descriptionsSchemaItem.show

      descriptionsSchema.push(descriptionsSchemaItem)
    }
  })

  return descriptionsSchema
}

// 给options添加国际化
const filterOptions = (options: Recordable, labelField?: string) => {
  return options?.map((v: Recordable) => {
    if (labelField) {
      v['labelField'] = t(v.labelField)
    } else {
      v['label'] = t(v.label)
    }
    return v
  })
}
