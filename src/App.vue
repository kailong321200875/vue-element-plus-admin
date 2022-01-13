<script setup lang="ts">
import { computed } from 'vue'
import { useAppStore } from '@/store/modules/app'
import { ConfigGlobal } from '@/components/ConfigGlobal'
import { isDark } from '@/utils/is'

const appStore = useAppStore()

const size = computed(() => appStore.size)

function initDark() {
  const isDarkTheme = isDark()
  appStore.setIsDark(isDarkTheme)
}

initDark()
</script>

<template>
  <ConfigGlobal :size="size">
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
  padding: 0;
  margin: 0;
  overflow: hidden;
  .size;

  #app {
    .size;
  }
}
</style>
