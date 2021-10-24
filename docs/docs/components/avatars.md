# Avatars 头像组

头像组组件。

`Avatars` 组件代码位于`src/components/Avatars`

## 使用

```vue
<template>
  <avatars :data="data" />
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'
import { AvatarConfig } from '_c/Avatars/types'

export default defineComponent({
  components: {
    Avatars: () => import('_c/Avatars/index.vue')
  },
  setup() {
    const data = ref<AvatarConfig[]>([
      { text: '陈某某' },
      { text: '李某某', type: 'success' },
      { text: '张某某', type: 'danger' },
      { text: '王某某', type: 'warning' },
      { text: '龙某某' },
      { text: '孙某某' },
      { text: '刘某某' },
      { text: '赵某某' }
    ])
    return {
      data
    }
  }
})
</script>

<style></style>
```

## Attributes

| 属性       | 说明                                  | 类型    | 可选值     | 默认值 |
| ---------- | ------------------------------------- | ------- | ---------- | ------ |
| data       | 展示的数据，具体配置详见[下表](#Data) | array   | —          | —      |
| max        | 最大展示数量，0 为不设置              | number  | —          | 0      |
| showAvatar | 是否使用头像                          | boolean | true/false | false  |
| tooltip    | 是否显示完整名称                      | boolean | false/true | true   |

## Data<span id="Data"></span>

| 属性 | 说明       | 类型   | 可选值                 | 默认值 |
| ---- | ---------- | ------ | ---------------------- | ------ |
| text | 展示的文字 | string | —                      | —      |
| type | 头像类型   | string | success/danger/warning | —      |
| url  | 头像地址   | string | —                      | —      |
