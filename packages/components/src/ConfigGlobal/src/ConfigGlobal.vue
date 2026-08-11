<script setup lang="ts">
  import { provide, PropType, watch } from 'vue'
  import { propTypes } from '@/utils/propTypes'
  import { ComponentSize, ElConfigProvider } from 'element-plus'
  import type { Language } from 'element-plus/es/locale'
  import { useWindowSize } from '@vueuse/core'
  import { useAppStore } from '@/store/modules/app'
  import { setCssVar } from '@/utils'
  import { useDesign } from '@/hooks/web/useDesign'

  const { variables } = useDesign()

  const appStore = useAppStore()

  const props = defineProps({
    size: propTypes.oneOf<ComponentSize>(['default', 'small', 'large']).def('default'),
    locale: Object as PropType<Language>
  })

  provide('configGlobal', props)

  const { width } = useWindowSize()

  // 监听窗口变化
  watch(
    () => width.value,
    (width: number) => {
      if (width < 768) {
        appStore.mobile = true
        setCssVar('--left-menu-min-width', '0')
        appStore.collapse = true
        appStore.layout !== 'classic' ? appStore.setLayout('classic') : undefined
      } else {
        appStore.mobile = false
        setCssVar('--left-menu-min-width', '64px')
      }
    },
    {
      immediate: true
    }
  )
</script>

<template>
  <ElConfigProvider
    :namespace="variables.elNamespace"
    :locale="locale"
    :message="{ max: 1 }"
    :size="size"
  >
    <slot></slot>
  </ElConfigProvider>
</template>
