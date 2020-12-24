<template>
  <div>
    <el-alert
      effect="dark"
      :closable="false"
      title="基于 wangeditor 封装的 富文本 组件。"
      type="info"
      style="margin-bottom: 20px;"
    />
    <editor ref="editorRef" :value="html" />

    <div style="text-align: center;margin-top: 20px;">
      <el-button @click="getContent('getHtml')">获取HTML(请在控制台查看)</el-button>
      <el-button @click="getContent('getText')">获取TEXT(请在控制台查看)</el-button>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, unref } from 'vue'
import Editor from '_c/Editor/index.vue'
import { content } from './data'
export default defineComponent({
  // name: 'EditorDemo',
  components: {
    Editor
  },
  setup() {
    const html = ref<string>(content)
    const editorRef = ref<HTMLElement | null>(null)

    function getContent(name: string) {
      console.log(unref(editorRef as any)[name]())
    }

    return {
      html,
      editorRef,
      getContent
    }
  }
})
</script>

<style>
</style>
