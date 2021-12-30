<script setup lang="ts">
import { ElConfigProvider } from 'element-plus'
import { VConfigGlobal } from '@/components/ConfigGlobal'
import zhCn from 'element-plus/lib/locale/lang/zh-cn'
</script>

<template>
  <VConfigGlobal>
    <ElConfigProvider :locale="zhCn">
      <RouterView />
    </ElConfigProvider>
  </VConfigGlobal>
</template>
