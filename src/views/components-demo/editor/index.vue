<template>
  <div>
    <el-alert
      effect="dark"
      :closable="false"
      title="基于 wangeditor 封装的 富文本 组件。"
      type="info"
      style="margin-bottom: 20px"
    />

    <editor ref="editorRef" :value="content" @change="handleChange" />

    <div style="margin-top: 20px; text-align: center">
      <el-button @click="showHtml"> 获取TTML(请在控制台查看) </el-button>
      <el-button @click="showText"> 获取TEXT(请在控制台查看) </el-button>
      <el-button @click="showJson"> 获取JSON(请在控制台查看) </el-button>
    </div>
  </div>
</template>

<script setup lang="ts" name="EditorDemo">
import { ref, unref } from 'vue'
import Editor from '_c/Editor/index.vue'

const content = ref<string>('默认展示数据')
const editorRef = ref<Nullable<any>>(null)

function handleChange(html: string) {
  console.log(html)
}

function showHtml() {
  console.log((unref(editorRef) as any).getHtml())
}

function showText() {
  console.log((unref(editorRef) as any).getText())
}

function showJson() {
  console.log((unref(editorRef) as any).getJSON())
}
</script>

<style></style>
