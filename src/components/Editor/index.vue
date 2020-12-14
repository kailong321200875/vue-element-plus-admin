<template>
  <div ref="editorRef" />
</template>

<script lang="ts">
import { defineComponent, ref, onMounted, onBeforeUnmount, unref, watch } from 'vue'
import { editorProps } from './props'
import E from 'wangeditor'
import hljs from 'highlight.js'
import 'highlight.js/styles/monokai-sublime.css'
export default defineComponent({
  name: 'Editor',
  props: editorProps,
  emits: ['change', 'focus', 'blur', 'update:value'],
  setup(props, { emit }) {
    const editorRef = ref<HTMLElement | null>(null)
    const editor = ref<E | null>(null)

    onMounted(() => {
      createdEditor()
    })

    onBeforeUnmount(() => {
      if (editor.value) {
        editor.value.destroy()
        editor.value = null
      }
    })

    watch(
      () => props.value,
      (value: string) => {
        if (editor.value) {
          editor.value.txt.html(value)
        }
      },
      {
        immediate: true
      }
    )

    function createdEditor(): void {
      editor.value = new E(unref(editorRef) as any)
      initConfig(editor.value)
      editor.value.create()
      editor.value.txt.html(props.value)
    }

    function initConfig(editor: any): void {
      const {
        height,
        zIndex,
        placeholder,
        focus,
        customAlert,
        menus,
        colors,
        fontNames,
        lineHeights,
        showFullScreen,
        onchangeTimeout
      } = props.config

      // 设置编辑区域高度为 500px
      editor.config.height = height

      // 设置zIndex
      editor.config.zIndex = zIndex

      // 设置 placeholder 提示文字
      editor.config.placeholder = placeholder

      // 设置是否自动聚焦
      editor.config.focus = focus

      // 配置菜单
      editor.config.menus = menus

      // 配置颜色（文字颜色、背景色）
      editor.config.colors = colors

      // 配置字体
      editor.config.fontNames = fontNames

      // 配置行高
      editor.config.lineHeights = lineHeights

      // 代码高亮
      editor.highlight = hljs

      // 配置全屏
      editor.config.showFullScreen = showFullScreen

      // 编辑器 customAlert 是对全局的alert做了统一处理，默认为 window.alert。
      // 如觉得浏览器自带的alert体验不佳，可自定义 alert，以便于达到与自身项目统一的alert效果。
      editor.config.customAlert = customAlert

      // 图片上传默认使用base64
      editor.config.uploadImgShowBase64 = true

      // 配置 onchange 回调函数
      editor.config.onchange = (html: string) => {
        const text = editor.txt.text()
        emitFun(editor, html, 'change')
        emit('update:value', props.valueType === 'html' ? html : text)
      }
      // 配置触发 onchange 的时间频率，默认为 200ms
      editor.config.onchangeTimeout = onchangeTimeout

      // 编辑区域 focus（聚焦）和 blur（失焦）时触发的回调函数。
      editor.config.onblur = (html: string) => {
        emitFun(editor, html, 'blur')
      }
      editor.config.onfocus = (html: string) => {
        emitFun(editor, html, 'focus')
      }
    }

    function emitFun(editor: any, html: string, type: 'change' | 'focus' | 'blur'): void {
      const text = editor.txt.text()
      emit(type, props.valueType === 'html' ? html : text)
    }

    return {
      editorRef
    }
  }
})
</script>

<style>
</style>
