<script setup lang="ts">
  import { computed } from 'vue'
  import { useAppStore } from '@/store/modules/app'
  import { ConfigGlobal } from '@/components/ConfigGlobal'
  import { useTheme } from '@/hooks/web/useTheme'
  import { useTitle } from '@/hooks/web/useTitle'

  const appStore = useAppStore()

  const currentSize = computed(() => appStore.currentSize)

  useTheme()
  useTitle()
</script>

<template>
  <ConfigGlobal :size="currentSize">
    <RouterView />
  </ConfigGlobal>
</template>

<style lang="less">
  .size {
    width: 100%;
    height: 100%;
  }

  html,
  body {
    padding: 0 !important;
    margin: 0;
    overflow: hidden;
    .size;

    #app {
      .size;
    }
  }
</style>
