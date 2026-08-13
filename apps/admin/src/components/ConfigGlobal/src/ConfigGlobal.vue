<script setup lang="ts">
  import { computed, watch } from 'vue'
  import { propTypes } from '@/utils/propTypes'
  import { ComponentSize, ElConfigProvider } from 'element-plus'
  import { useLocaleStore } from '@/store/modules/locale'
  import { useWindowSize } from '@vueuse/core'
  import { useAppStore } from '@/store/modules/app'

  const appStore = useAppStore()

  defineProps({
    size: propTypes.oneOf<ComponentSize>(['default', 'small', 'large']).def('default')
  })

  const { width } = useWindowSize()

  // 监听窗口变化
  watch(
    () => width.value,
    (width: number) => {
      if (width < 768) {
        if (!appStore.mobile) {
          appStore.mobile = true
          appStore.collapse = true
        }
      } else {
        if (appStore.mobile) {
          appStore.mobile = false
        }
      }
    },
    {
      immediate: true
    }
  )

  // 多语言相关
  const localeStore = useLocaleStore()

  const currentLocale = computed(() => localeStore.currentLocale)
</script>

<template>
  <ElConfigProvider
    namespace="el"
    :locale="currentLocale.elementLocale"
    :message="{ max: 1 }"
    :size="size"
  >
    <slot></slot>
  </ElConfigProvider>
</template>
