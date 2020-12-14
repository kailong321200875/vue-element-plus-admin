<template>
  <div ref="wrapRef" class="markdown" />
</template>
<script lang="ts">
import {
  defineComponent,
  ref,
  onMounted,
  unref,
  PropType,
  onUnmounted,
  nextTick,
  watchEffect
} from 'vue'
import Vditor from 'vditor'
import 'vditor/dist/index.css'
export default defineComponent({
  props: {
    height: {
      type: Number as PropType<number>,
      default: 500
    },
    value: {
      type: String,
      default: ''
    }
  },
  emits: ['update:value'],
  setup(props, { attrs, emit }) {
    const wrapRef = ref<HTMLDivElement | null>(null)
    const vditorRef = ref<Vditor | null>(null)
    const initedRef = ref(false)

    function init() {
      const wrapEl = unref(wrapRef)
      if (!wrapEl) return
      const data = { ...attrs, ...props }
      vditorRef.value = new Vditor(wrapEl, {
        mode: 'sv',
        preview: {
          actions: []
        },
        input: (v) => {
          emit('update:value', v)
        },
        ...data,
        cache: {
          enable: false
        }
      })
      initedRef.value = true
    }

    watchEffect(() => {
      nextTick(() => {
        const vditor = unref(vditorRef)
        if (unref(initedRef) && props.value && vditor) {
          vditor.setValue(props.value)
        }
      })
    })

    onMounted(() => {
      nextTick(() => {
        init()
      })
    })

    onUnmounted(() => {
      const vditorInstance = unref(vditorRef)
      if (!vditorInstance) return
      vditorInstance.destroy()
    })

    return {
      wrapRef,
      getVditor: (): Vditor => vditorRef.value!
    }
  }
})
</script>
