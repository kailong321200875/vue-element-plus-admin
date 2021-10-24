# Highlight 文字高亮

文字高亮组件，用于突出显示文字。

`Highlight` 组件代码位于`src/components/Highlight`

## 使用

```vue
<template>
  <highlight :keys="['vue-element-plus-admin']">
    vue-element-plus-admin内置了动态路由，权限验证，典型的业务模型，丰富的功能组件，并且提供了多页配置，开箱即用，可以用来作为项目的启动模版。它可以帮助你快速搭建企业级中后台产品原型，也可以作为一个示例，用于学习。
  </highlight>
</template>

<script lang="ts">
import { defineComponent, computed } from 'vue'

export default defineComponent({
  components: {
    Highlight: () => import('_c/Highlight/index.vue')
  }
})
</script>
```

## Attributes

| 属性  | 说明         | 类型   | 可选值 | 默认值  |
| ----- | ------------ | ------ | ------ | ------- |
| tag   | 标签类型     | string | —      | span    |
| keys  | 关键字       | array  | —      | —       |
| color | 文字高亮颜色 | string | —      | #2d8cf0 |

## Events

| 事件名称 | 说明               | 回调参数 |
| -------- | ------------------ | -------- |
| click    | 点击高亮文字的回调 | key      |
