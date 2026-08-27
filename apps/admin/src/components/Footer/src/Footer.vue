<script setup lang="ts">
  import { appConfig } from '@/config/app'

  const prefixCls = 'v-footer'

  const title = appConfig.title
</script>

<template>
  <div
    :class="prefixCls"
    class="text-center text-[var(--el-text-color-placeholder)] bg-[var(--app-content-bg-color)] h-[var(--app-footer-height)] leading-[var(--app-footer-height)] overflow-hidden"
  >
    Copyright ©2021-present {{ title }}
  </div>
</template>
