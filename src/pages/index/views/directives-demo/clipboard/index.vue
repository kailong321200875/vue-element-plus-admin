<template>
  <div>
    <a-alert message="自定义指令：v-clipboard，用于复制文本。" style="margin-bottom: 20px;" />
    <a-alert message="基础示例" style="margin-bottom: 20px;margin-top: 20px;" />
    <div class="input__wrap">
      <a-input v-model:value="inputVal1" placeholder="请输入要复制的文本" />
      <a-button v-clipboard="inputVal1" type="primary">复制</a-button>
    </div>

    <a-alert message="自定义回调方法" style="margin-bottom: 20px;margin-top: 20px;" />
    <div class="input__wrap">
      <a-input v-model:value="inputVal2" placeholder="请输入要复制的文本" />
      <a-button
        v-clipboard="inputVal2"
        v-clipboard:success="clipboardSuccess"
        v-clipboard:error="clipboardSuccess"
        type="primary"
      >复制</a-button>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'
import { message } from 'ant-design-vue'
export default defineComponent({
  // name: 'Clipboard'
  setup() {
    const inputVal1 = ref<string>('')
    const inputVal2 = ref<string>('')
    function clipboardSuccess(val: any) {
      message.success('我是自定义成功回调：' + val.text)
    }
    function clipboardError() {
      message.error('我是自定义失败回调')
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
