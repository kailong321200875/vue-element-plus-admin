<template>
  <div class="app-wrapper">
    <component :is="layout" />
  </div>
</template>

<script lang="ts">
import { defineComponent, computed } from 'vue'
import Classic from './modules/Classic.vue'
import Top from './modules/Top.vue'
import LeftTop from './modules/LeftTop.vue'
import { appStore } from '_p/index/store/modules/app'
export default defineComponent({
  name: 'Layout',
  components: {
    Classic,
    Top,
    LeftTop
  },
  setup() {
    const layout = computed(() => appStore.layout)
    return {
      layout
    }
  }
})
</script>

<style lang="less" scoped>
.app-wrapper {
  position: relative;
  height: 100%;
  width: 100%;
}
</style>
