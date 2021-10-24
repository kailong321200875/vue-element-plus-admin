# MarkDown编辑器 组件

基于 `tui-editor` 进行二次封装的 `MarkDown编辑器` 组件。

`MarkDown` 组件位于[src/components/MarkDown](http://192.168.169.57:9000/scm/index.html#contentPanel;9IRMTD52f3;null;vue-doc/src/components/MarkDown/index.vue;content)

## 使用

``` vue
// 引入
import MarkDown from '_c/MarkDown'

// 使用
<mark-down ref="markdown" :content="content" height="600px" />
```

## Props

| 属性 | 类型 | 默认值 | 可选值 | 说明 |
|---------- |-------- |---------- |---------- |---------- |
| content | string | — | — | 编辑器内容 |
| height | string | 400px | — | 编辑器高度 |
| initialEditType | string | markdown | wysiwyg | 编辑器类型 |
| hideToolBar | boolean | true | false | 是否隐藏工具栏 |
| hideFooter | boolean | false | true | 是否隐藏底部操作栏 |
| hideHeader | boolean | false | true | 是否隐藏头部操作栏 |
| placeholder | string | 请输入文章标题 | — | 提示语 |
| btnText | string | 发布 | — | 发布按钮文字 |
| hideUi | boolean | false | true | 隐藏预览区域 |

## 事件

| 名称 | 说明 | 参数 |
|---------- |-------- |-------- |
| change | 编辑器内容改变时的回调 | data |
| setMarkdown | 点击发布时的回调 | { title, value, html } |