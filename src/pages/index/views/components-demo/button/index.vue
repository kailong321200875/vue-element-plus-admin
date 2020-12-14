<template>
  <div>
    <a-alert message="扩展 antdv 的 Button 组件，实现 primary、success、warning、info、default 等主题样式。" style="margin-bottom: 20px;" />
    <div class="btn__wrap">default</div>
    <div class="btn__item">
      <a-button>默认按钮</a-button>
      <a-button shape="round">默认按钮</a-button>
      <a-button loading>默认按钮</a-button>
      <a-button disabled>默认按钮</a-button>
    </div>
    <div class="btn__wrap">primary</div>
    <div class="btn__item">
      <a-button type="primary">主要按钮</a-button>
      <a-button type="primary" shape="round">主要按钮</a-button>
      <a-button type="primary" loading>主要按钮</a-button>
      <a-button type="primary" disabled>主要按钮</a-button>
    </div>
    <div class="btn__wrap">success</div>
    <div class="btn__item">
      <a-button type="success">成功按钮</a-button>
      <a-button type="success" shape="round">成功按钮</a-button>
      <a-button type="success" loading>成功按钮</a-button>
      <a-button type="success" disabled>成功按钮</a-button>
    </div>
    <div class="btn__wrap">warning</div>
    <div class="btn__item">
      <a-button type="warning">警告按钮</a-button>
      <a-button type="warning" shape="round">警告按钮</a-button>
      <a-button type="warning" loading>警告按钮</a-button>
      <a-button type="warning" disabled>警告按钮</a-button>
    </div>
    <div class="btn__wrap">danger</div>
    <div class="btn__item">
      <a-button type="danger">危险按钮</a-button>
      <a-button type="danger" shape="round">危险按钮</a-button>
      <a-button type="danger" loading>危险按钮</a-button>
      <a-button type="danger" disabled>危险按钮</a-button>
    </div>
    <div class="btn__wrap">info</div>
    <div class="btn__item">
      <a-button type="info">信息按钮</a-button>
      <a-button type="info" shape="round">信息按钮</a-button>
      <a-button type="info" loading>信息按钮</a-button>
      <a-button type="info" disabled>信息按钮</a-button>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
export default defineComponent({
  name: 'ButtonDemo'
})
</script>

<style lang="less" scoped>
.btn__wrap {
  margin-bottom: 10px;
}
.btn__item {
  margin-bottom: 20px;
}
</style>
