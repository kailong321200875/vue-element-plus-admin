<script lang="tsx">
import { provide, defineComponent } from 'vue'
import { vConfigGlobalProps } from './props'

export default defineComponent({
  name: 'VConfigGlobal',
  inheritAttrs: false,
  props: vConfigGlobalProps,
  setup(props, { slots }) {
    provide('configGlobal', props)

    return () => slots.default?.()
  }
})
</script>
