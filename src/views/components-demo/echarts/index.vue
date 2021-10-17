<template>
  <div>
    <el-alert
      effect="dark"
      :closable="false"
      title="统一封装 Echart 组件，自适应宽度，只需传入 options 与 height 属性即可展示对应的图表。"
      type="info"
      style="margin-bottom: 20px"
    />

    <el-row :gutter="20">
      <el-col :span="10">
        <div class="chart-wrap">
          <echart :height="'300px'" :options="pieOptions" />
        </div>
      </el-col>
      <el-col :span="14">
        <div class="chart-wrap">
          <echart :options="barOptions" :height="'300px'" />
        </div>
      </el-col>
      <el-col :span="14">
        <div class="chart-wrap">
          <echart :options="lineOptions" :height="'300px'" />
        </div>
      </el-col>
      <el-col :span="10">
        <div class="chart-wrap">
          <echart :options="pieOptions2" :height="'300px'" />
        </div>
      </el-col>
      <el-col :span="24">
        <div class="chart-wrap">
          <echart :options="wordOptions" :height="'300px'" />
        </div>
      </el-col>
    </el-row>
  </div>
</template>

<script setup lang="ts" name="EchartsDemo">
import { lineOptions, pieOptions, barOptions, pieOptions2, wordOptions } from './echart-data'
import Echart from '_c/Echart/index.vue'
</script>

<style lang="less" scoped>
.chart-wrap {
  padding: 10px;
  margin-bottom: 20px;
  background-color: #fff;
  border-radius: 5px;
}
</style>
