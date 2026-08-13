<script setup lang="ts">
  import { computed, unref } from 'vue'
  import { useAppStore } from '@/store/modules/app'
  import { propTypes } from '@/utils/propTypes'
  import { useI18n } from 'vue-i18n'
  const prefixCls = 'v-collapse'

  defineProps({
    color: propTypes.string.def('')
  })

  const appStore = useAppStore()
  const { t } = useI18n()

  const collapse = computed(() => appStore.collapse)

  const toggleCollapse = () => {
    const collapsed = unref(collapse)
    appStore.collapse = !collapsed
  }
</script>

<template>
  <button
    :class="prefixCls"
    type="button"
    :aria-label="t(collapse ? 'layout.expandNavigation' : 'layout.collapseNavigation')"
    @click="toggleCollapse"
  >
    <Icon
      :size="18"
      :icon="collapse ? 'mdi:menu-open' : 'mdi:menu'"
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
