import { ElOption, ElOptionGroup } from 'element-plus'
import { getSlot } from '@/utils/tsxHelper'
import { Slots } from 'vue'
import { FormSchema } from '@/types/form'
import { SelectComponentProps, SelectOption } from '@/types/components'

export const useRenderSelect = (slots: Slots) => {
  // 渲染 select options
  const renderSelectOptions = (item: FormSchema) => {
    const componentsProps = item.componentProps as SelectComponentProps
    // 如果有别名，就取别名
    const labelAlias = componentsProps?.labelAlias
    return componentsProps?.options?.map((option) => {
      if (option?.options?.length) {
        return (
          <ElOptionGroup label={option[labelAlias || 'label']}>
            {() => {
              return option?.options?.map((v) => {
                return renderSelectOptionItem(item, v)
              })
            }}
          </ElOptionGroup>
        )
      } else {
        return renderSelectOptionItem(item, option)
      }
    })
  }

  // 渲染 select option item
  const renderSelectOptionItem = (item: FormSchema, option: SelectOption) => {
    // 如果有别名，就取别名
    const componentsProps = item.componentProps as SelectComponentProps
    const labelAlias = componentsProps?.labelAlias
    const valueAlias = componentsProps?.valueAlias

    const { label, value, ...other } = option

    return (
      <ElOption
        {...other}
        label={labelAlias ? option[labelAlias] : label}
        value={valueAlias ? option[valueAlias] : value}
      >
        {{
          default: () =>
            // option 插槽名规则，{field}-option
            componentsProps?.optionsSlot
              ? getSlot(slots, `${item.field}-option`, { item: option })
              : undefined
        }}
      </ElOption>
    )
  }

  return {
    renderSelectOptions
  }
}
