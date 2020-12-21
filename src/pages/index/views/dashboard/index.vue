<template>
  <div>
    <panel-group />
    <el-row :gutter="20">
      <el-col :span="10">
        <div class="chart__wrap">
          <echart :options="pieEchatOptions" :height="'300px'" />
        </div>
      </el-col>
      <el-col :span="14">
        <div class="chart__wrap">
          <echart :options="barEchatOptions" :height="'300px'" />
        </div>
      </el-col>
    </el-row>
    <div class="chart__wrap">
      <echart :options="lineEchatOptions" :height="'300px'" />
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive } from 'vue'
import Echart from '_c/Echart/index.vue'
import PanelGroup from './components/PanelGroup.vue'
import { lineOptions, pieOptions, barOptions } from './echart-data'
import type { EChartOption } from 'echarts'
export default defineComponent({
  name: 'Dashboard',
  components: {
    Echart,
    PanelGroup
  },
  setup() {
    const lineEchatOptions = reactive<EChartOption>(lineOptions)
    const pieEchatOptions = reactive<EChartOption>(pieOptions)
    const barEchatOptions = reactive<EChartOption>(barOptions)
    return {
      lineEchatOptions,
      pieEchatOptions,
      barEchatOptions
    }
  }
})
</script>

<style lang="less" scoped>
.chart__wrap {
  margin-bottom: 20px;
  border-radius: 5px;
  background-color: @contentBg;
  padding: 10px;
}
</style>
