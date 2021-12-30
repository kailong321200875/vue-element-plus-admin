<script lang="tsx">
import { provide, defineComponent } from 'vue'
import { propTypes } from '@/utils/propTypes'

export default defineComponent({
  name: 'VConfigGlobal',
  inheritAttrs: false,
  props: {
    size: propTypes.oneOf(['default', 'medium', 'small', 'mini']).def('default')
  },
  setup(props, { slots }) {
    provide('configGlobal', props)

    return () => slots.default?.()
  }
})
</script>
