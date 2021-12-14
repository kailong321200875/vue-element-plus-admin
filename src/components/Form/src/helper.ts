// import { useI18n } from '@/hooks/web/useI18n'
// const { t } = useI18n()
/**
 *
 * @param schema 对应组件数据
 * @description 用于自动设置placeholder
 */
export function setTextPlaceholder(schema: VFormSchema): {
  placeholder?: string
  startPlaceholder?: string
  endPlaceholder?: string
} {
  console.log(schema)
  // const textMap = ['Input', 'Autocomplete', 'InputNumber']
  // const selectMap = ['Select', 'TimePicker', 'DatePicker', 'TimeSelect', 'TimeSelect']
  // if (textMap.includes(schema?.component as string)) {
  //   return {
  //     placeholder: t('common.inputText')
  //   }
  // }
  // if (selectMap.includes(schema?.component as string)) {
  //   // 一些范围选择器
  //   const twoTextMap = ['datetimerange', 'daterange', 'monthrange', 'datetimerange', 'daterange']
  //   if (
  //     twoTextMap.includes(schema?.componentProps?.type || schema?.componentProps?.isRange) as string
  //   ) {
  //     return {
  //       startPlaceholder: t('common.startTimeText'),
  //       endPlaceholder: t('common.endTimeText'),
  //       rangeSeparator: '-'
  //     }
  //   } else {
  //     return {
  //       placeholder: t('common.selectText')
  //     }
  //   }
  // }
  return {}
}
