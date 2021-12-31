<script setup lang="ts">
import { computed, unref } from 'vue'
import { useAppStore } from '@/store/modules/app'
import { ElConfigProvider } from 'element-plus'
import { VConfigGlobal } from '@/components/ConfigGlobal'
import zhCn from 'element-plus/lib/locale/lang/zh-cn'
import en from 'element-plus/lib/locale/lang/en'
import { isDark } from '@/utils/is'

const appStore = useAppStore()

function initDark() {
  const isDarkTheme = isDark()
  appStore.setIsDark(isDarkTheme)
}
initDark()

const locale = computed(() => appStore.getLang)
const setLocale = computed(() => (unref(locale) === 'zh-cn' ? zhCn : en))
</script>

<template>
  <VConfigGlobal>
    <ElConfigProvider :locale="setLocale">
      <RouterView />
    </ElConfigProvider>
  </VConfigGlobal>
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
