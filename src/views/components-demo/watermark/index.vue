<template>
  <div>
    <el-alert
      effect="dark"
      :closable="false"
      title="useWatermark，为整个系统提供水印功能。"
      type="info"
      style="margin-bottom: 20px"
    />
    <el-button type="primary" @click="setWatermark('vue-element-plus-admin')">创建水印</el-button>
    <el-button type="danger" @click="clear">清除水印</el-button>
    <el-button type="warning" @click="setWatermark('vue-element-plus-admin-new')">
      重置水印
    </el-button>
  </div>
</template>

<script setup lang="ts" name="Watermark">
import { onBeforeUnmount } from 'vue'
import { useWatermark } from '@/hooks/web/useWatermark'
const { setWatermark, clear } = useWatermark()

onBeforeUnmount(() => {
  clear()
})
</script>
