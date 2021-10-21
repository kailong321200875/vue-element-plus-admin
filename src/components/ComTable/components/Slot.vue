<script lang="ts">
import { defineComponent, inject, h, PropType } from 'vue'
export default defineComponent({
  name: 'Slot',
  props: {
    row: {
      type: Object as PropType<IObj>,
      default: () => null
    },
    index: {
      type: Number as PropType<number>,
      default: null
    },
    column: {
      type: Object as PropType<IObj>,
      default: () => null
    },
    slotName: {
      type: String as PropType<string>,
      default: ''
    }
  },
  render(props) {
    const _this: any = inject('tableRoot')
    return h(
      'span',
      _this.slots[props.slotName]({
        row: props.row,
        column: props.column,
        $index: props.index
      })
    )
  }
})
</script>

<style></style>
