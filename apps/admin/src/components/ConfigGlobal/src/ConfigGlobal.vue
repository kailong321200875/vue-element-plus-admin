<script setup lang="ts">
  import { computed, watch } from 'vue'
  import { ElConfigProvider } from 'element-plus'
  import { useLocaleStore } from '@/store/modules/locale'
  import { useWindowSize } from '@vueuse/core'
  import { useAppStore } from '@/store/modules/app'

  const appStore = useAppStore()

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
  <ElConfigProvider namespace="el" :locale="currentLocale.elementLocale" :message="{ max: 1 }">
    <slot></slot>
  </ElConfigProvider>
</template>
