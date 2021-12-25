import { useI18n } from '@/hooks/web/useI18n'
const { t } = useI18n()
import type { Slots } from 'vue'
import { getSlot } from '@/utils/tsxHelper'

interface PlaceholderMoel {
  placeholder?: string
  startPlaceholder?: string
  endPlaceholder?: string
  rangeSeparator?: string
}

/**
 *
 * @param schema 对应组件数据
 * @returns 返回提示信息对象
 * @description 用于自动设置placeholder
 */
export function setTextPlaceholder(schema: VFormSchema): PlaceholderMoel {
  const textMap = ['Input', 'Autocomplete', 'InputNumber']
  const selectMap = ['Select', 'TimePicker', 'DatePicker', 'TimeSelect', 'TimeSelect']
  if (textMap.includes(schema?.component as string)) {
    return {
      placeholder: t('common.inputText')
    }
  }
  if (selectMap.includes(schema?.component as string)) {
    // 一些范围选择器
    const twoTextMap = ['datetimerange', 'daterange', 'monthrange', 'datetimerange', 'daterange']
    if (
      twoTextMap.includes(
        (schema?.componentProps?.type || schema?.componentProps?.isRange) as string
      )
    ) {
      return {
        startPlaceholder: t('common.startTimeText'),
        endPlaceholder: t('common.endTimeText'),
        rangeSeparator: '-'
      }
    } else {
      return {
        placeholder: t('common.selectText')
      }
    }
  }
  return {}
}

/**
 *
 * @param col 内置栅格
 * @returns 返回栅格属性
 * @description 合并传入进来的栅格属性
 */
export function setGridProp(col: ColProps = {}): ColProps {
  const colProps: ColProps = {
    // 如果有span，代表用户优先级更高，所以不需要默认栅格
    ...(col.span
      ? {}
      : {
          xs: 24,
          sm: 12,
          md: 12,
          lg: 12,
          xl: 8
        }),
    ...col
  }
  return colProps
}

/**
 *
 * @param item 传入的组件属性
 * @returns 默认添加 clearable 属性
 */
export function setComponentProps(item: VFormSchema): Recordable {
  const notNeedClearable = ['ColorPicker']
  const componentProps: Recordable = notNeedClearable.includes(item.component as string)
    ? { ...item.componentProps }
    : {
        clearable: true,
        ...item.componentProps
      }
  // 需要删除额外的属性
  delete componentProps?.slots
  return componentProps
}

/**
 *
 * @param slots 插槽
 * @param slotsProps 插槽属性
 * @param field 字段名
 */
export function setItemComponentSlots(
  slots: Slots,
  slotsProps: Recordable = {},
  field: string
): Recordable {
  const slotObj: Recordable = {}
  for (const key in slotsProps) {
    if (slotsProps[key]) {
      // 由于组件有可能重复，需要有一个唯一的前缀
      slotObj[key] = (data: Recordable) => {
        return getSlot(slots, `${field}-${key}`, data)
      }
    }
  }
  return slotObj
}

/**
 *
 * @param schema Form表单结构化数组
 * @param formModel FormMoel
 * @description 生成对应的formModel
 */
export function setModel(schema: VFormSchema[], formModel: Recordable) {
  schema.map((v) => {
    // 如果是hidden，就删除对应的值
    if (v.hidden) {
      delete formModel[v.field]
    } else {
      const hasField = Reflect.has(formModel, v.field)
      // 如果先前已经有值存在，则不进行重新赋值，而是采用现有的值
      formModel[v.field] = hasField ? formModel[v.field] : v.value !== void 0 ? v.value : ''
    }
  })
}
