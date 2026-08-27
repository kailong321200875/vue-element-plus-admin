<script setup lang="ts">
  import { ConfigGlobal } from '@/components/ConfigGlobal'
  import { useTheme } from '@/hooks/useTheme'
  import { useTitle } from '@/hooks/useTitle'

  useTheme()
  useTitle()
</script>

<template>
  <ConfigGlobal>
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

  #nprogress .bar {
    background: var(--el-color-primary) !important;
  }
</style>
