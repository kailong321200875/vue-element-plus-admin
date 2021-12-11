<script setup lang="ts">
import { ElConfigProvider } from 'element-plus'
import zhCn from 'element-plus/lib/locale/lang/zh-cn'
// import en from 'element-plus/lib/locale/lang/en'
</script>

<template>
  <ElConfigProvider :locale="zhCn">
    <RouterView class="app" />
  </ElConfigProvider>
</template>
