# Qrcode 二维码

基于 `qrcode.js` 封装的二维码组件。

`Qrcode` 组件代码位于`src/components/Qrcode`

## 使用

```vue
<template>
  <div>
    <qrcode text="vue-element-plus-admin" />
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  components: {
    Qrcode: () => import('_c/Qrcode/index.vue')
  }
})
</script>

<style></style>
```

## Attributes

| 属性 | 说明 | 类型 | 可选值 | 默认值 |
| --- | --- | --- | --- | --- |
| text | 二维码内容 | string/array | — | — |
| tag | 组件标签 | string | — | canvas |
| options | qrcode.js 配置项 | object | — | — |
| width | 二维码宽度 | number | — | 200 |
| disabled | 是否过期 | boolean | true/false | false |
| disabledText | 过期提示内容 | string | — | 二维码已失效 |
| logo | logo 图标，如果为 object 类型，配置项详见[下表](#Logo) | object/string | — | — |

## Logo<span id="Logo"></span>

| 属性         | 说明                 | 类型   | 可选值 | 默认值    |
| ------------ | -------------------- | ------ | ------ | --------- |
| logoSize     | 二维码 logo 尺寸     | number | —      | 0.15      |
| bgColor      | 二维码 logo 背景颜色 | string | —      | #ffffff   |
| borderSize   | 二维码 logo 边框尺寸 | number | —      | 0.05      |
| crossOrigin  | 二维码 logo 跨域设置 | string | —      | anonymous |
| borderRadius | 二维码 logo 边框圆角 | number | —      | 8         |
| logoRadius   | 二维码 logo 圆角     | number | —      | 0         |

## Events

| 事件名称      | 说明                   | 回调参数 |
| ------------- | ---------------------- | -------- |
| done          | 二维码加载成功后的回调 | dataURL  |
| click         | 二维码点击后的回调     | —        |
| disabledClick | 二维码失效点击后的回调 | —        |
