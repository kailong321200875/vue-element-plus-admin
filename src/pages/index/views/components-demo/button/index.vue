<template>
  <div>
    <el-alert
      effect="dark"
      :closable="false"
      title="对 Element 的 Button 组件进行美化，实现水波纹样式，如不需要，可在 src/styles/button.less 进行更改注释。"
      type="info"
      style="margin-bottom: 20px;"
    />

    <el-row style="margin-bottom: 20px;">
      <el-button>默认按钮</el-button>
      <el-button type="primary">主要按钮</el-button>
      <el-button type="success">成功按钮</el-button>
      <el-button type="info">信息按钮</el-button>
      <el-button type="warning">警告按钮</el-button>
      <el-button type="danger">危险按钮</el-button>
    </el-row>

    <el-row style="margin-bottom: 20px;">
      <el-button plain>朴素按钮</el-button>
      <el-button type="primary" plain>主要按钮</el-button>
      <el-button type="success" plain>成功按钮</el-button>
      <el-button type="info" plain>信息按钮</el-button>
      <el-button type="warning" plain>警告按钮</el-button>
      <el-button type="danger" plain>危险按钮</el-button>
    </el-row>

    <el-row style="margin-bottom: 20px;">
      <el-button round>圆角按钮</el-button>
      <el-button type="primary" round>主要按钮</el-button>
      <el-button type="success" round>成功按钮</el-button>
      <el-button type="info" round>信息按钮</el-button>
      <el-button type="warning" round>警告按钮</el-button>
      <el-button type="danger" round>危险按钮</el-button>
    </el-row>

    <el-row style="margin-bottom: 20px;">
      <el-button icon="el-icon-search" circle />
      <el-button type="primary" icon="el-icon-edit" circle />
      <el-button type="success" icon="el-icon-check" circle />
      <el-button type="info" icon="el-icon-message" circle />
      <el-button type="warning" icon="el-icon-star-off" circle />
      <el-button type="danger" icon="el-icon-delete" circle />
    </el-row>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
export default defineComponent({
  name: 'ButtonDemo'
})
</script>

<style>
</style>
