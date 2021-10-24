# ComDetail 详情

用于详情预览的组件，基于`element-ui`的`Row Col`组件进行二次封装。

`ComDetail` 组件位于`src/components/Detail`

## 使用

```vue
<template>
  <div>
    <com-detail :data="data" :schema="schema" title="基础示例" message="辅助文字" />
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive, ref } from 'vue'

export default defineComponent({
  setup() {
    const data = reactive<IObj>({
      username: 'chenkl',
      nickName: '梦似花落。',
      age: 26,
      phone: '13655971xxxx',
      email: '502431556@qq.com',
      addr: '这是一个很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长的地址',
      sex: '男',
      certy: '35058319940712xxxx'
    })
    const schema = ref<IObj>([
      {
        field: 'username',
        label: '用户名'
      },
      {
        field: 'nickName',
        label: '昵称'
      },
      {
        field: 'phone',
        label: '联系电话'
      },
      {
        field: 'email',
        label: '邮箱'
      },
      {
        field: 'addr',
        label: '地址',
        span: 24
      }
    ])

    return {
      data,
      schema
    }
  }
})
</script>

<style></style>
```

## Attributes

| 属性        | 说明                                      | 类型    | 可选值            | 默认值  |
| ----------- | ----------------------------------------- | ------- | ----------------- | ------- |
| title       | 详情标题                                  | string  | —                 | —       |
| collapsed   | 是否可折叠                                | boolean | true/false        | true    |
| message     | 辅助提示                                  | string  | —                 | —       |
| border      | 是否需要边框                              | boolean | true/false        | true    |
| data        | 需要展示的数据                            | object  | —                 | —       |
| schema      | 布局展示的数据，具体项详见[下表](#Schema) | array   | —                 | []      |
| vertical    | 是否标题和内容各占一行 垂直布局           | boolean | false/true        | false   |
| labelWidth  | 标题宽度                                  | string  | —                 | —       |
| labelAlign  | 标题位置                                  | string  | left/right/center | left    |
| borderColor | 边框颜色                                  | string  | —                 | #f0f0f0 |
| labelBg     | 标题背景颜色                              | string  | —                 | #fafafa |

## Schema<span id="Schema"></span>

| 属性  | 说明                               | 类型   | 可选值  | 默认值 |
| ----- | ---------------------------------- | ------ | ------- | ------ |
| field | 字段名，与 data 中的数据项字段对应 | string | —       | —      |
| label | 标题                               | string | —       | —      |
| span  | 在一行中的占比                     | number | [1, 24] | 12     |

## Slot

| name           | 说明                   |
| -------------- | ---------------------- |
| {field}        | 标题内容               |
| {field}Content | 对应字段需要展示的内容 |
