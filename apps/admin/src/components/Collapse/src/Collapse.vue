<script setup lang="ts">
  import { computed, unref } from 'vue'
  import { useAppStore } from '@/store/modules/app'
  import { propTypes } from '@/utils/propTypes'
  const prefixCls = 'v-collapse'

  defineProps({
    color: propTypes.string.def('')
  })

  const appStore = useAppStore()

  const collapse = computed(() => appStore.collapse)

  const toggleCollapse = () => {
    const collapsed = unref(collapse)
    appStore.collapse = !collapsed
  }
</script>

<template>
  <div :class="prefixCls" @click="toggleCollapse">
    <Icon
      :size="18"
      :icon="collapse ? 'vi-ant-design:menu-unfold-outlined' : 'vi-ant-design:menu-fold-outlined'"
      :color="color"
      class="cursor-pointer"
    />
  </div>
</template>
