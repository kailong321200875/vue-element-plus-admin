<script setup lang="ts">
  import { useAppStore } from '@/store/modules/app'
  import { useI18n } from 'vue-i18n'
  const prefixCls = 'v-collapse'

  withDefaults(defineProps<{ color?: string }>(), { color: '' })

  const appStore = useAppStore()
  const { t } = useI18n()

  const toggleCollapse = () => {
    appStore.collapse = !appStore.collapse
  }
</script>

<template>
  <button
    :class="prefixCls"
    type="button"
    :aria-label="t(appStore.collapse ? 'layout.expandNavigation' : 'layout.collapseNavigation')"
    @click="toggleCollapse"
  >
    <Icon
      :size="18"
      :icon="appStore.collapse ? 'mdi:menu-open' : 'mdi:menu'"
      :color="color"
      class="cursor-pointer"
    />
  </button>
</template>

<style scoped>
  .v-collapse {
    background: transparent;
    border: 0;
  }
</style>
