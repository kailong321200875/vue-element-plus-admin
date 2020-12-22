<template>
  <div>
    <el-alert
      effect="dark"
      :closable="false"
      title="自定义指令：v-clipboard，用于复制文本。"
      type="info"
      style="margin-bottom: 20px;"
    />
    <el-alert
      effect="dark"
      :closable="false"
      title="基础示例。"
      type="info"
      style="margin-bottom: 20px;margin-top: 20px;"
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
      style="margin-bottom: 20px;margin-top: 20px;"
    />
    <div class="input__wrap">
      <el-input v-model="inputVal2" placeholder="请输入要复制的文本" />
      <el-button
        v-clipboard="inputVal2"
        v-clipboard:success="clipboardSuccess"
        v-clipboard:error="clipboardSuccess"
        type="primary"
      >复制</el-button>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'
import { Message } from '_c/Message'
export default defineComponent({
  // name: 'Clipboard'
  setup() {
    const inputVal1 = ref<string>('')
    const inputVal2 = ref<string>('')
    function clipboardSuccess(val: any) {
      Message.success('我是自定义成功回调：' + val.text)
    }
    function clipboardError() {
      Message.error('我是自定义失败回调')
    }
    return {
      inputVal1, inputVal2,
      clipboardSuccess,
      clipboardError
    }
  }
})
</script>

<style lang="less" scoped>
.input__wrap {
  padding: 20px;
  background: #fff;
  display: flex;
}
</style>
