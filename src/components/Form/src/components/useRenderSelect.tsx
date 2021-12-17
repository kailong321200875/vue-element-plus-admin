import { ElOption, ElOptionGroup } from 'element-plus'
import { getSlot } from '@/utils/tsxHelper'
import { Slots } from 'vue'

export function useRenderSelect(slots: Slots) {
  // 渲染 select options
  function renderSelectOptions(item: VFormSchema) {
    // 如果有别名，就取别名
    const labelAlias = item.optionsField?.labelField
    return item.options?.map((option) => {
      if (option?.options?.length) {
        return (
          <ElOptionGroup label={labelAlias ? option[labelAlias] : option['label']}>
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
  function renderSelectOptionItem(item: VFormSchema, option: FormOptions) {
    // 如果有别名，就取别名
    const labelAlias = item.optionsField?.labelField
    const valueAlias = item.optionsField?.valueField
    return (
      <ElOption
        label={labelAlias ? option[labelAlias] : option['label']}
        value={valueAlias ? option[valueAlias] : option['value']}
      >
        {{
          default: () =>
            // option 插槽名规则，{field}-option
            item.optionsSlot ? getSlot(slots, `${item.field}-option`, { item: option }) : undefined
        }}
      </ElOption>
    )
  }

  return {
    renderSelectOptions
  }
}
