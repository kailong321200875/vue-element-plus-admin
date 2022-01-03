<script setup lang="ts">
import { computed } from 'vue'
import { useAppStore } from '@/store/modules/app'
import { useLocaleStore } from '@/store/modules/locale'
import { ElConfigProvider } from 'element-plus'
import { ConfigGlobal } from '@/components/ConfigGlobal'
import { isDark } from '@/utils/is'

const appStore = useAppStore()

const localeStore = useLocaleStore()

const locale = computed(() => localeStore.locale)

const size = computed(() => appStore.size)

function initDark() {
  const isDarkTheme = isDark()
  appStore.setIsDark(isDarkTheme)
}

initDark()
</script>

<template>
  <ConfigGlobal :size="size">
    <ElConfigProvider :locale="locale.elLocale" :size="size">
      <RouterView />
    </ElConfigProvider>
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
  .size;

  #app {
    .size;
  }
}
</style>
