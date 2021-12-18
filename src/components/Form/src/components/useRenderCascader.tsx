import { Slots } from 'vue'
import { getSlot } from '@/utils/tsxHelper'

// 这个可能是element-plus的BUG，需要这么处理，才能渲染出来。
export function useRenderCascader(slots: Slots) {
  function useRenderCascaderOptions(item: VFormSchema, data: Recordable) {
    return (
      <span>
        {{
          default: () => {
            return item?.componentProps?.slots?.default
              ? getSlot(slots, `${item.field}-default`, data)
              : data?.data[item?.optionsField?.labelField || 'label']
          }
        }}
      </span>
    )
  }

  return {
    useRenderCascaderOptions
  }
}
