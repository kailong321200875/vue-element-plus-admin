<template>
  <div style="padding: 20px; background: #fff;display: flex;align-items: center;">
    <div style="min-width: 200px;">多层级缓存-页面1-2：</div>
    <el-input v-model="value" />
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'
export default defineComponent({
  name: 'Menu12Demo',
  setup() {
    const value = ref<string>('')

    return {
      value
    }
  }
})
</script>
