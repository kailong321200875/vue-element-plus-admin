import { h } from 'vue'
import type { VNode } from 'vue'
import { Icon } from '@/components/Icon'
import type { IconProps } from '@/components/Icon'

export const useIcon = (props: IconProps): VNode => {
  return h(Icon, props)
}
