<template>
  <div>
    <a-alert message="统一封装 Echart 组件，自适应宽度，只需传入 options 与 height 属性即可展示对应的图表。" type="info" style="margin-bottom: 20px;" />

    <a-row :gutter="20">
      <a-col :span="10">
        <div class="chart-wrap">
          <echart :options="pieOptions" :height="'300px'" />
        </div>
      </a-col>
      <a-col :span="14">
        <div class="chart-wrap">
          <echart :options="barOptions" :height="'300px'" />
        </div>
      </a-col>
      <a-col :span="14">
        <div class="chart-wrap">
          <echart :options="lineOptions" :height="'300px'" />
        </div>
      </a-col>
      <a-col :span="10">
        <div class="chart-wrap">
          <echart :options="pieOptions2" :height="'300px'" />
        </div>
      </a-col>
    </a-row>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import Echart from '_c/Echart/index.vue'
import { lineOptions, pieOptions, barOptions, pieOptions2 } from './echart-data'
export default defineComponent({
  // name: 'EchartsDemo',
  components: {
    Echart
  },
  setup() {
    return {
      lineOptions,
      pieOptions,
      barOptions,
      pieOptions2
    }
  }
})
</script>

<style lang="less" scoped>
.chart-wrap {
  margin-bottom: 20px;
  border-radius: 5px;
  padding: 10px;
  background: #fff;
}
</style>
