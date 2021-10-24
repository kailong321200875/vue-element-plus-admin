# Echart 图表

基于`echarts`二次封装的图表的组件，内置了主题色。

`Echart` 组件代码位于`src/components/Echart`

::: tip 提示
需要给一个固定高度，才能展示出图表
:::

## 使用

```vue
<template>
  <div>
    <echart :options="pieOptions" :height="'300px'" />
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { pieOptions } from './echart-data'

export default defineComponent({
  components: {
    Echart: () => import('_c/Echart/index.vue')
  },
  setup() {
    return {
      pieOptions
    }
  }
})
</script>

<style></style>
```

## Attributes

| 属性 | 说明 | 类型 | 可选值 | 默认值 |
| --- | --- | --- | --- | --- |
| className | 图表类名 | string | — | chart |
| width | 图表宽度 | string | — | 100% |
| height | 图表高度 | string | — | 200px |
| theme | 主题 | string | light/dark/default | default |
| options | 图表的配置项，具体可参考[echarts](https://echarts.apache.org/zh/api.html#echarts) | object | — | — |
