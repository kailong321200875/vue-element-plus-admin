<template>
  <div ref="editorRef"></div>
</template>

<script setup lang="ts" name="Editor">
import { PropType, watch, computed, onMounted, onBeforeUnmount, ref, unref } from 'vue'
import E from 'wangeditor'
import hljs from 'highlight.js' // 这个蠢货插件，9以上的版本都不支持IE。辣鸡！！
import 'highlight.js/styles/monokai-sublime.css'
import { oneOf } from '@/utils'
import { EditorConfig } from './types'
import { Message } from '_c/Message'

const props = defineProps({
  config: {
    type: Object as PropType<EditorConfig>,
    default: () => {
      return {}
    }
  },
  valueType: {
    type: String as PropType<'html' | 'text'>,
    default: 'html',
    validator: (val: string) => {
      return oneOf(val, ['html', 'text'])
    }
  },
  value: {
    type: String as PropType<string>,
    default: ''
  }
})

const emit = defineEmits(['change', 'focus', 'blur'])

defineExpose({
  getHtml,
  getJSON,
  getText
})

let editor: Nullable<E> = null
const value = computed(() => props.value)
const editorRef = ref<Nullable<HTMLElement>>(null)

watch(
  value,
  (val: string) => {
    if (editor) {
      editor.txt.html(val)
    }
  },
  {
    immediate: true
  }
)

function createdEditor() {
  editor = new E(unref(editorRef.value) as HTMLElement)
  initConfig()
  editor.create()
  editor.txt.html(value.value)
}

function initConfig() {
  const config = props.config as EditorConfig
  const editorRef = editor as E

  // // 设置编辑区域高度为 500px
  editorRef.config.height = config.height || 500

  // // 设置zIndex
  editorRef.config.zIndex = config.zIndex || 0

  // // 设置 placeholder 提示文字
  editorRef.config.placeholder = config.placeholder || '请输入文本'

  // // 设置是否自动聚焦
  editorRef.config.focus = config.focus || false

  // 配置菜单
  editorRef.config.menus = config.menus || [
    'head',
    'bold',
    'fontSize',
    'fontName',
    'italic',
    'underline',
    'strikeThrough',
    'indent',
    'lineHeight',
    'foreColor',
    'backColor',
    'link',
    'list',
    'justify',
    'quote',
    'emoticon',
    'image',
    'video',
    'table',
    'code',
    'splitLine',
    'undo',
    'redo'
  ]

  // 配置颜色（文字颜色、背景色）
  editorRef.config.colors = config.colors || ['#000000', '#eeece0', '#1c487f', '#4d80bf']

  // 配置字体
  editorRef.config.fontNames = config.fontNames || [
    '黑体',
    '仿宋',
    '楷体',
    '标楷体',
    '华文仿宋',
    '华文楷体',
    '宋体',
    '微软雅黑',
    'Arial',
    'Tahoma',
    'Verdana',
    'Times New Roman',
    'Courier New'
  ]

  // 配置行高
  editorRef.config.lineHeights = config.lineHeights || ['1', '1.15', '1.6', '2', '2.5', '3']

  // // 代码高亮
  editorRef.highlight = hljs

  // // 配置全屏
  editorRef.config.showFullScreen = config.showFullScreen || true

  // 编辑器 customAlert 是对全局的alert做了统一处理，默认为 window.alert。
  // 如觉得浏览器自带的alert体验不佳，可自定义 alert，以便于达到与自身项目统一的alert效果。
  editorRef.config.customAlert =
    config.customAlert ||
    function (s: string, t: string) {
      switch (t) {
        case 'success':
          Message.success(s)
          break
        case 'info':
          Message.info(s)
          break
        case 'warning':
          Message.warning(s)
          break
        case 'error':
          Message.error(s)
          break
        default:
          Message.info(s)
          break
      }
    }

  // 图片上传默认使用base64
  editorRef.config.uploadImgShowBase64 = true

  // 配置 onchange 回调函数
  editorRef.config.onchange = (html: string) => {
    const text = editorRef.txt.text()
    emitFun(editor, props.valueType === 'html' ? html : text, 'change')
  }
  // 配置触发 onchange 的时间频率，默认为 200ms
  editorRef.config.onchangeTimeout = config.onchangeTimeout || 1000

  // 编辑区域 focus（聚焦）和 blur（失焦）时触发的回调函数。
  editorRef.config.onblur = (html: string) => {
    emitFun(editor, html, 'blur')
  }
  editorRef.config.onfocus = (html: string) => {
    emitFun(editor, html, 'focus')
  }
}

function emitFun(editor: any, _: string, type: 'change' | 'focus' | 'blur'): void {
  if (editor) {
    emit(type, props.valueType === 'html' ? (editor as E).txt.html() : (editor as E).txt.text())
  }
}

function getHtml() {
  if (editor) {
    return (editor as E).txt.html()
  }
}

function getText() {
  if (editor) {
    return (editor as E).txt.text()
  }
}

function getJSON() {
  if (editor) {
    return (editor as E).txt.getJSON()
  }
}

onMounted(() => {
  createdEditor()
})

onBeforeUnmount(() => {
  if (editor) {
    ;(editor as E).destroy()
    editor = null
  }
})
</script>
