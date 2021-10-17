import { PropType } from 'vue'

export const previewProps = {
  index: {
    type: Number as PropType<number>,
    default: 0
  },
  zIndex: {
    type: Number as PropType<number>,
    default: 100
  },
  show: {
    type: Boolean as PropType<boolean>,
    default: false
  },
  imageList: {
    type: [Array] as PropType<string[]>,
    default: []
  },
  onClose: {
    type: Function as PropType<Function>,
    default: null
  },
  onSelect: {
    type: Function as PropType<Function>,
    default: null
  }
}
