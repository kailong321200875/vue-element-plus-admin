import { useI18n } from '@/hooks/web/useI18n'
const { t } = useI18n()
import { shallowRef } from 'vue'
import { isFunction } from '@/utils/is'
import { Slots } from 'vue'
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

type ComponentPropsModel = {
  clearable: boolean
} & Recordable

/**
 *
 * @param props 传入的组件属性
 * @returns 默认添加 clearable 属性
 */
export function setComponentProps(props: Recordable = {}): ComponentPropsModel {
  for (const key in props) {
    // 如果传入的是组件，需要让其失去响应式，避免不必要的性能开销
    // 这样判断好像还不太合理。后续看看没有更合理的判断方法
    if (props[key]?.render && isFunction(props[key]?.render)) {
      props[key] = shallowRef(props[key]?.render())
    }
  }
  const componentProps: ComponentPropsModel = {
    clearable: true,
    ...props
  }
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
