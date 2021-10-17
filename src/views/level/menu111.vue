<template>
  <div style="display: flex; padding: 20px; background: #fff; align-items: center">
    <div style="min-width: 200px">多层级缓存-页面1-1-1：</div>
    <el-input v-model="value" />
  </div>
</template>

<script setup lang="ts" name="Menu111Demo">
import { ref } from 'vue'

const value = ref<string>('')
</script>
