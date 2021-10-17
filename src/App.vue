<template>
  <el-config-provider :locale="zhCn">
    <router-view class="app" :class="{ grey__mode: greyMode }" />
  </el-config-provider>
</template>

<script setup lang="ts" name="App">
import { computed } from 'vue'
import { useAppStore } from '@/store/modules/app'
const appStore = useAppStore()
import zhCn from 'element-plus/lib/locale/lang/zh-cn'

const greyMode = computed(() => appStore.getGreyMode)
</script>

<style lang="less">
.size {
  width: 100;
  height: 100%;
  min-width: var(--content-min-width);
}

html,
body {
  .size;

  padding: 0;
  margin: 0;
}

#app {
  .size;

  background: var(--app-background-color);
}

.grey__mode {
  -webkit-filter: grayscale(100%);
  -moz-filter: grayscale(100%);
  -ms-filter: grayscale(100%);
  -o-filter: grayscale(100%);
  filter: grayscale(100%);
  filter: progid:dximagetransform.microsoft.basicimage(grayscale=1);
}
</style>
