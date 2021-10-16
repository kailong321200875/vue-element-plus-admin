<template>
  <div class="app-wrapper">
    <component :is="layout" />
  </div>
</template>

<script setup lang="ts" name="Layout">
/* eslint-disable */
import { computed } from 'vue'
// @ts-ignore
import Classic from './modules/Classic.vue'
// @ts-ignore
import Top from './modules/Top.vue'
// @ts-ignore
import LeftTop from './modules/LeftTop.vue'
import { useAppStore } from '@/store/modules/app'
const appStore = useAppStore()

const layout = computed(() =>
  appStore.getLayout === 'Classic' ? Classic : appStore.getLayout === 'Top' ? Top : LeftTop
)
</script>

<style lang="less" scoped>
.app-wrapper {
  position: relative;
  width: 100%;
  height: 100%;
}
</style>
