# Editor 富文本

基于 `wangeditor` 进行二次封装的富文本组件。

`Editor` 组件位于`src/components/Editor`

::: tip 提示
如果该富文本组件无法满足业务需求，可以自行引入其他富文本插件。
:::

## 使用

```vue
<template>
  <editor :value="content" @change="handleChange" />
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'

export default defineComponent({
  components: {
    Editor: () => import('_c/Editor/index.vue')
  },
  setup() {
    const content = ref<string>('默认展示数据')
    function handleChange(html: string, text: string) {
      console.log(html, text)
    }
    return {
      content,
      handleChange
    }
  }
})
</script>
```

## Attributes

| 属性      | 说明                                       | 类型   | 可选值    | 默认值 |
| --------- | ------------------------------------------ | ------ | --------- | ------ |
| value     | 富文本内容                                 | string | —         | —      |
| valueType | 富文本绑定的值的类型                       | string | html/text | html   |
| config    | wangeditor 配置项，具体详见[下表](#Config) | object | —         | —      |

## Config<span id="Config"></span>

| 属性 | 说明 | 类型 | 可选值 | 默认值 |
| --- | --- | --- | --- | --- |
| height | 富文本高度 | number | — | 500 |
| zIndex | 层级 | number | — | 0 |
| placeholder | 提示文字 | string | — | 请输入文本 |
| focus | 是否聚焦 | boolean | true/false | false |
| onchangeTimeout | 几秒监听一次变化 | number | — | 1000 |
| customAlert | 自定义提示 | function | — | — |
| menus | 按钮菜单 | array | — | ['head','bold','fontSize','fontName','italic','underline','strikeThrough','indent','lineHeight','foreColor','backColor','link','list','justify','quote','emoticon','image','video','table','code','splitLine','undo','redo'] |
| colors | 颜色 | array | — | ['#000000','#eeece0','#1c487f','#4d80bf'] |
| fontNames | 字体 | array | — | ['黑体','仿宋','楷体','标楷体','华文仿宋','华文楷体','宋体','微软雅黑','Arial','Tahoma','Verdana','Times New Roman','Courier New'] |
| lineHeights | 行间距 | array | — | ['1','1.15','1.6','2','2.5','3'] |
| showFullScreen | 是否全屏 | boolean | true/false | false |

## Methods

| 方法名  | 说明      | 参数                   |
| ------- | --------- | ---------------------- |
| getHtml | 获取 HTML | Function(html: string) |
| getText | 获取 text | Function(text: string) |
| getJson | 获取 Json | Function(json: object) |
