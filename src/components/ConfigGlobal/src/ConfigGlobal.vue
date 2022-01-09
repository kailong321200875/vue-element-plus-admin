<script setup lang="ts">
import { provide, computed } from 'vue'
import { propTypes } from '@/utils/propTypes'
import { ElConfigProvider } from 'element-plus'
import { useLocaleStore } from '@/store/modules/locale'

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
