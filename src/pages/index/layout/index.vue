<template>
  <div class="app-wrapper">
    <component :is="component" />
  </div>
</template>

<script lang="ts">
// import Classic from './modules/Classic.vue'
// import Top from './modules/Top.vue'
// import LeftTop from './modules/LeftTop.vue'
import Test from './modules/Test.vue'
import { defineComponent, ref } from 'vue'
import config from '_p/index/config'
export default defineComponent({
  name: 'Layout',
  components: {
    // Classic,
    // Top,
    // LeftTop,
    Test
  },
  setup() {
    const { layout } = config
    const component = ref<string>(layout)
    return {
      component
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
