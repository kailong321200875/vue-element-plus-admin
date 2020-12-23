<template>
  <div>
    <el-alert
      effect="dark"
      :closable="false"
      title="对 Element 的 Dialog 组件进行二次封装，支持所有原生参数。"
      type="info"
      style="margin-bottom: 20px;"
    />
    <el-button type="primary" @click="visible = true">打开弹窗</el-button>

    <com-dialog v-model="visible" title="提示">
      <div style="height: 1000px;">
        我是弹窗内容
      </div>
      <template #footer>
        <el-button @click="visible = false">取消</el-button>
        <el-button type="primary" @click="visible = false">确定</el-button>
      </template>
    </com-dialog>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'
export default defineComponent({
  // name: 'DialogDemo',
  setup() {
    const visible = ref<boolean>(false)
    return {
      visible
    }
  }
})
</script>

<style>
</style>
