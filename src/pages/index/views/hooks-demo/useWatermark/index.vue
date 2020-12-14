<template>
  <div>
    <a-alert message="useWatermark，为整个系统提供水印功能。" style="margin-bottom: 20px;" />
    <a-button type="primary" @click="setWatermark('vue-antdv-admin')">创建水印</a-button>
    <a-button type="danger" @click="clear">清除水印</a-button>
    <a-button type="warning" @click="setWatermark('vue-antdv-admin-new')">重置水印</a-button>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { useWatermark } from '@/hooks/useWaterMark'
export default defineComponent({
  // name: 'UseWatermarkDemo',
  setup() {
    const { setWatermark, clear } = useWatermark()
    return {
      setWatermark,
      clear
    }
  }
})
</script>

<style>
</style>
