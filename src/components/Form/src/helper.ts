import { useI18n } from '@/hooks/web/useI18n'
const { t } = useI18n()

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
    ...{
      xs: 24,
      sm: 12,
      md: 12,
      lg: 12,
      xl: 8
    },
    ...col
  }
  return colProps
}
