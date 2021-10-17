<template>
  <div>
    <el-alert
      effect="dark"
      :closable="false"
      title="二次封装 Element 的 Message 组件，每次只显示最新一条消息，避免出现太多消息提示导致不美观。"
      type="info"
      style="margin-bottom: 20px"
    />
    <el-button @click="show">显示</el-button>
  </div>
</template>

<script setup lang="ts" name="MessageDemo">
import { ref } from 'vue'
import { Message } from '_c/Message'
const count = ref<number>(0)
function show() {
  count.value = count.value + 1
  Message.success('这是成功消息' + count.value)
}
</script>

<style></style>
