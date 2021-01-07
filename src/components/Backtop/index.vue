<template>
  <el-backtop
    target=".main__wrap--content .el-scrollbar__wrap"
    :bottom="100"
  />
</template>

<script lang="ts">
import { defineComponent } from 'vue'
export default defineComponent({
  name: 'Backtop'
})
</script>

<style>
</style>
