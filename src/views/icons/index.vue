<template>
  <div class="icons-container">
    <div v-for="item of svgIcons" :key="item" v-clipboard="generateIconCode(item)">
      <el-tooltip placement="top" :content="generateIconCode(item)">
        <div class="icon-item">
          <svg-icon :icon-class="item" class-name="disabled" />
          <span>{{ item }}</span>
        </div>
      </el-tooltip>
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
    float: left;
    width: 100px;
    height: 85px;
    margin: 20px;
    font-size: 30px;
    color: #24292e;
    text-align: center;
    cursor: pointer;
  }

  span {
    display: block;
    margin-top: 10px;
    font-size: 16px;
  }

  .disabled {
    pointer-events: none;
  }
}
</style>
