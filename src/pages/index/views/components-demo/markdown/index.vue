<template>
  <div>
    <el-alert
      effect="dark"
      :closable="false"
      title="基于 vditor 封装的 Markdown编辑器 组件。"
      type="info"
      style="margin-bottom: 20px;"
    />
    <markdown v-model:value="html" />
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'
import Markdown from '_c/Markdown/index.vue'
export default defineComponent({
  // name: 'MarkdownDemo',
  components: {
    Markdown
  },
  setup() {
    const html = ref<string>('')
    return {
      html
    }
  }
})
</script>

<style>
</style>
