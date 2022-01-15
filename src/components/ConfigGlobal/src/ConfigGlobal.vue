<script setup lang="ts">
import { provide, computed, watch } from 'vue'
import { propTypes } from '@/utils/propTypes'
import { ElConfigProvider } from 'element-plus'
import { useLocaleStore } from '@/store/modules/locale'
import { useWindowSize } from '@vueuse/core'
import { useAppStore } from '@/store/modules/app'
import { setCssVar } from '@/utils'

const appStore = useAppStore()

const { width } = useWindowSize()

watch(
  () => width.value,
  (width: number) => {
    if (width < 768) {
      !appStore.getMobile ? appStore.setMobile(true) : undefined
      setCssVar('--left-menu-min-width', '0')
      appStore.setCollapse(true)
      appStore.getLayout !== 'classic' ? appStore.setLayout('classic') : undefined
    } else {
      appStore.getMobile ? appStore.setMobile(false) : undefined
      setCssVar('--left-menu-min-width', '64px')
    }
  },
  {
    immediate: true
  }
)

const localeStore = useLocaleStore()

const locale = computed(() => localeStore.locale)

const props = defineProps({
  size: propTypes.oneOf<ElememtPlusSzie[]>(['default', 'small', 'large']).def('default')
})

provide('configGlobal', props)
</script>

<template>
  <ElConfigProvider :locale="locale.elLocale" :message="{ max: 1 }" :size="size">
    <slot></slot>
  </ElConfigProvider>
</template>
