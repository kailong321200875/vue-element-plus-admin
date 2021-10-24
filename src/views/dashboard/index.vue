<template>
  <div>
    <el-row :gutter="20">
      <el-col :span="10">
        <div class="chart__wrap">
          <echart :options="pieOptions" :height="'300px'" />
        </div>
      </el-col>
      <el-col :span="14">
        <div class="chart__wrap">
          <echart :options="barOptions" :height="'300px'" />
        </div>
      </el-col>
    </el-row>
    <div class="chart__wrap">
      <echart :options="lineOptions" :height="'300px'" />
    </div>
  </div>
</template>

<script setup lang="ts" name="Dashboard">
import { lineOptions, pieOptions, barOptions } from './echart-data'
import Echart from '_c/Echart/index.vue'
</script>

<style lang="less" scoped>
.chart__wrap {
  padding: 10px;
  margin-bottom: 20px;
  background-color: #fff;
  border-radius: 5px;
}
</style>
