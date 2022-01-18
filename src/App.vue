<script setup lang="ts">
import { computed } from 'vue'
import { useAppStore } from '@/store/modules/app'
import { ConfigGlobal } from '@/components/ConfigGlobal'
import { isDark } from '@/utils/is'

const appStore = useAppStore()

const currentSize = computed(() => appStore.getCurrentSize)

const greyMode = computed(() => appStore.getGreyMode)

const initDark = () => {
  const isDarkTheme = isDark()
  appStore.setIsDark(isDarkTheme)
}

initDark()
</script>

<template>
  <ConfigGlobal :size="currentSize">
    <RouterView :class="{ 'v-grey__mode': greyMode }" />
  </ConfigGlobal>
</template>

<style lang="less">
@prefix-cls: ~'@{namespace}-grey';

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

.@{prefix-cls}__mode {
  -webkit-filter: grayscale(100%);
  -moz-filter: grayscale(100%);
  -ms-filter: grayscale(100%);
  -o-filter: grayscale(100%);
  filter: grayscale(100%);
  filter: progid:dximagetransform.microsoft.basicimage(grayscale=1);
}
</style>
