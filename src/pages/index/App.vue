<template>
  <router-view class="app" :class="{'grey__mode': greyMode}" />
</template>

<script lang="ts">
import { defineComponent, computed } from 'vue'
import { appStore } from '_p/index/store/modules/app'
export default defineComponent({
  name: 'App',
  setup() {
    const greyMode = computed(() => appStore.greyMode)
    return {
      greyMode
    }
  }
})
</script>

<style lang="less">
.size {
  min-width: @minWidth;
  width: 100;
  height: 100%;
}
html,body {
  .size;
  margin: 0;
  padding: 0;
}
#app {
  .size;
  background: @appBg;
}
.grey__mode {
  -webkit-filter: grayscale(100%);
  -moz-filter: grayscale(100%);
  -ms-filter: grayscale(100%);
  -o-filter: grayscale(100%);
  filter: grayscale(100%);
  filter: progid:DXImageTransform.Microsoft.BasicImage(grayscale=1);
}
</style>
