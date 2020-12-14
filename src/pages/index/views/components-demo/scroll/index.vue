<template>
  <div>
    <a-alert message="抽取于 Element 的 Scrollbar 组件进行改造统一美化各个浏览器滚动条，保持一致性。" style="margin-bottom: 20px;" />

    <a-alert message="横向滚动，外围容器需要设置固定宽度。" style="margin-bottom: 20px;" />
    <div class="deom__wrap deom__wrap--horizontal">
      <scrollbar>
        <ul class="deom-ul__wrap">
          <li v-for="i in 1" :key="i">{{ i }}</li>
        </ul>
      </scrollbar>
    </div>

    <a-alert message="纵向滚动，外围容器需要设置固定高度。" style="margin-bottom: 20px;margin-top: 20px;" />
    <div class="deom__wrap deom__wrap--vertical">
      <scrollbar>
        <ul class="deom-ul__wrap">
          <li v-for="i in 100" :key="i">{{ i }}</li>
        </ul>
      </scrollbar>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import Scrollbar from '_c/Scrollbar/index.vue'
export default defineComponent({
  // name: 'Scroll',
  components: {
    Scrollbar
  }
})
</script>

<style lang="less" scoped>
.deom__wrap {
  padding: 20px;
  background: #fff;
  li {
    border: 1px solid #91d5ff;
    height: 40px;
    line-height: 40px;
    margin-bottom: -1px;
    padding-left: 15px;
  }
}
.deom__wrap--horizontal {
  width: 500px;
  height: 80px;
  .deom-ul__wrap {
    width: 800px;
  }
}
.deom__wrap--vertical {
  width: 500px;
  height: 500px;
}
</style>
