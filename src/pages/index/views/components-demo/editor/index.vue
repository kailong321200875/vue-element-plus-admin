<template>
  <div>
    <el-alert
      effect="dark"
      :closable="false"
      title="基于 wangeditor 封装的 富文本 组件。"
      type="info"
      style="margin-bottom: 20px;"
    />
    <editor v-model:value="html" />
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'
import Editor from '_c/Editor/index.vue'
import { content } from './data'
export default defineComponent({
  // name: 'EditorDemo',
  components: {
    Editor
  },
  setup() {
    const html = ref<string>(content)
    return {
      html
    }
  }
})
</script>

<style>
</style>
