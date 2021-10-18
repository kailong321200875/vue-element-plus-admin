import { defineComponent, PropType, computed, h } from 'vue'
export default defineComponent({
  name: 'Highlight',
  props: {
    tag: {
      type: String as PropType<string>,
      default: 'span'
    },
    keys: {
      type: Array as PropType<string[]>,
      default: () => []
    },
    color: {
      type: String as PropType<string>,
      default: '#2d8cf0'
    }
  },
  emits: ['click'],
  setup(props, { emit }) {
    const keyNodes = computed(() => {
      return props.keys.map((key) => {
        return h(
          'span',
          {
            onClick: () => {
              emit('click', key)
            },
            style: {
              color: props.color,
              cursor: 'pointer'
            }
          },
          key
        )
      })
    })

    function parseText(text: string) {
      props.keys.forEach((key, index) => {
        const regexp = new RegExp(key, 'g')
        text = text.replace(regexp, `{{${index}}}`)
      })
      return text.split(/{{|}}/)
    }

    return {
      keyNodes,
      parseText
    }
  },
  render(props: any) {
    if (!props.$slots.default) return null
    const node = props.$slots.default()[0].children
    if (!node) {
      console.warn('Highlight组件的插槽必须要是文本')
      return props.$slots.default()[0]
    }
    const textArray = props.parseText(node)
    const regexp = /^[0-9]*$/
    const nodes = textArray.map((t: any) => {
      if (regexp.test(t)) {
        return props.keyNodes[Math.floor(t)] || t
      }
      return t
    })
    return h(props.tag, nodes)
  }
})
