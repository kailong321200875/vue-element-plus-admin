<template>
  <div>
    <el-alert
      effect="dark"
      :closable="false"
      title="自定义指令：v-clipboard，用于复制文本。"
      type="info"
      style="margin-bottom: 20px"
    />
    <el-alert
      effect="dark"
      :closable="false"
      title="基础示例。"
      type="info"
      style="margin-top: 20px; margin-bottom: 20px"
    />
    <div class="input__wrap">
      <el-input v-model="inputVal1" placeholder="请输入要复制的文本" />
      <el-button v-clipboard="inputVal1" type="primary">复制</el-button>
    </div>

    <el-alert
      effect="dark"
      :closable="false"
      title="自定义回调方法。"
      type="info"
      style="margin-top: 20px; margin-bottom: 20px"
    />
    <div class="input__wrap">
      <el-input v-model="inputVal2" placeholder="请输入要复制的文本" />
      <el-button
        v-clipboard="inputVal2"
        v-clipboard:success="clipboardSuccess"
        v-clipboard:error="clipboardError"
        type="primary"
        >复制</el-button
      >
    </div>
  </div>
</template>

<script setup lang="ts" name="DirectivesDemo">
import { ref } from 'vue'
import { Message } from '_c/Message'
const inputVal1 = ref<string>('')
const inputVal2 = ref<string>('')
function clipboardSuccess(val: any) {
  Message.success('我是自定义成功回调：' + val.text)
}
function clipboardError() {
  Message.error('我是自定义失败回调')
}
</script>

<style lang="less" scoped>
.input__wrap {
  display: flex;
  padding: 20px;
  background: #fff;
}
</style>
