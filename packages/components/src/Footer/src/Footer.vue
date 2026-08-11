<script setup lang="ts">
  import { useDesign } from '@/hooks/web/useDesign'
  import { appConfig } from '@/config/app'

  const { getPrefixCls } = useDesign()

  const prefixCls = getPrefixCls('footer')

  const title = appConfig.title
</script>

<template>
  <div
    :class="prefixCls"
    class="text-center text-[var(--el-text-color-placeholder)] bg-[var(--app-content-bg-color)] h-[var(--app-footer-height)] leading-[var(--app-footer-height)] dark:bg-[var(--el-bg-color)] overflow-hidden"
  >
    Copyright ©2021-present {{ title }}
  </div>
</template>
