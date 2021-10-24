# 图片裁剪 组件

`Cropper` 组件位于[src/components/Cropper](http://192.168.169.57:9000/scm/index.html#contentPanel;9IRMTD52f3;null;vue-doc/src/components/Cropper/index.vue;content)

## 使用

``` vue
// 引入
import Cropper from '_c/Cropper'

// 使用
<cropper @on-crop="handleCroped" />
```

## Props

| 属性 | 类型 | 默认值 | 可选值 | 说明 |
|---------- |-------- |---------- |---------- |---------- |
| src | string | — | — | 默认展示的图片地址 |
| preview | boolean | true | false | 是否展示预览区域 |
| moveStep | number | false | true | 是否禁用 |
| clearable | boolean | 4 | — | 每次移动多少距离 |
| cropButtonText | string | 裁剪 | — | 裁剪按钮文字 |

## 事件

| 名称 | 说明 | 参数 |
|---------- |-------- |-------- |
| on-crop | 裁剪时的回调事件 | base64 |