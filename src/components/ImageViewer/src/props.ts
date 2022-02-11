import { PropType } from 'vue'

export const imageViewerProps = {
  urlList: {
    type: Array as PropType<string[]>,
    default: (): string[] => []
  },
  zIndex: {
    type: Number as PropType<number>,
    default: 2000
  },
  initialIndex: {
    type: Number as PropType<number>,
    default: 0
  },
  infinite: {
    type: Boolean as PropType<boolean>,
    default: true
  },
  hideOnClickModal: {
    type: Boolean as PropType<boolean>,
    default: false
  },
  appendToBody: {
    type: Boolean as PropType<boolean>,
    default: false
  },
  show: {
    type: Boolean as PropType<boolean>,
    default: false
  }
}
