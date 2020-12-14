<template>
  <div class="icons-container">
    <div
      v-for="item of svgIcons"
      :key="item"
      v-clipboard="generateIconCode(item)"
    >
      <a-tooltip placement="top">
        <template #title>
          {{ generateIconCode(item) }}
        </template>
        <div class="icon-item">
          <svg-icon :icon-class="item" class-name="disabled" />
          <span>{{ item }}</span>
        </div>
      </a-tooltip>
    </div>
  </div>
</template>

<script lang="ts">
import svgIcons from './svg-icons'
import { defineComponent } from 'vue'

export default defineComponent({
  // name: 'Icons',
  setup() {
    function generateIconCode(symbol: string) {
      return `<svg-icon icon-class="${symbol}" />`
    }
    return {
      svgIcons,
      generateIconCode
    }
  }
})
</script>

<style lang="less" scoped>
.icons-container {
  overflow: hidden;
  background: #fff;

  .icon-item {
    margin: 20px;
    height: 85px;
    text-align: center;
    width: 100px;
    float: left;
    font-size: 30px;
    color: #24292e;
    cursor: pointer;
  }

  span {
    display: block;
    font-size: 16px;
    margin-top: 10px;
  }

  .disabled {
    pointer-events: none;
  }
}
</style>
