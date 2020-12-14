<template>
  <div>
    <a-alert message="useScrollTo，提供JS滚动过渡动画功能。" style="margin-bottom: 20px;" />
    <div class="button__wrap">
      <a-button type="primary" @click="scrollTo(100, 'scrollTop')">垂直滚动100px</a-button>
      <a-button type="primary" @click="scrollTo(800, 'scrollTop')">垂直滚动800px</a-button>
      <a-button type="primary" @click="scrollTo(100, 'scrollLeft')">水平滚动100px</a-button>
      <a-button type="primary" @click="scrollTo(500, 'scrollLeft')">水平滚动500px</a-button>
    </div>
    <div class="deom__wrap">
      <scrollbar ref="scrollContainer">
        <ul class="deom-ul__wrap">
          <li v-for="i in 100" :key="i">{{ i }}</li>
        </ul>
      </scrollbar>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, unref } from 'vue'
import { useScrollTo } from '@/hooks/useScrollTo'
import Scrollbar from '_c/Scrollbar/index.vue'
export default defineComponent({
  // name: 'UseScrollToDemo',
  components: {
    Scrollbar
  },
  setup() {
    const scrollContainer = ref<HTMLElement | null>(null)

    function scrollTo(to: number, position: string): void {
      const $scrollWrapper: any = (unref(scrollContainer) as any).$.wrap
      const { start } = useScrollTo({
        el: $scrollWrapper,
        position: position,
        to: to,
        duration: 500
      })
      start()
    }

    return {
      scrollContainer,
      scrollTo
    }
  }
})
</script>

<style lang="less" scoped>
.button__wrap {
  margin-bottom: 10px;
}
.deom__wrap {
  padding: 20px;
  background: #fff;
  width: 500px;
  height: 500px;
  .deom-ul__wrap {
    width: 1200px;
    li {
      border: 1px solid #91d5ff;
      height: 40px;
      line-height: 40px;
      margin-bottom: -1px;
      padding-left: 15px;
    }
  }
}
</style>
