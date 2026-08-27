# ECharts

ECharts 值得做一层很薄的封装：统一实例生命周期、主题切换和容器尺寸监听；图表 option 仍由页面定义，避免形成另一套图表 DSL。

## 按模块注册

Admin 在 `src/plugins/echarts/index.ts` 使用 `echarts/core`，目前只注册：

- Bar、Line、Pie 三种图表。
- Title、Tooltip、Grid、Legend 组件。
- CanvasRenderer。

```ts
import * as echarts from 'echarts/core'
import { BarChart, LineChart, PieChart } from 'echarts/charts'
import {
  GridComponent,
  LegendComponent,
  TitleComponent,
  TooltipComponent
} from 'echarts/components'
import { CanvasRenderer } from 'echarts/renderers'

echarts.use([
  BarChart,
  LineChart,
  PieChart,
  GridComponent,
  LegendComponent,
  TitleComponent,
  TooltipComponent,
  CanvasRenderer
])
```

这比直接导入完整 `echarts` 更容易控制应用产物。

## 页面使用

```vue
<script setup lang="ts">
  import type { EChartsOption } from 'echarts'
  import { Echart } from '@/components/Echart'

  const option: EChartsOption = {
    tooltip: { trigger: 'axis' },
    xAxis: { type: 'category', data: ['一', '二', '三'] },
    yAxis: { type: 'value' },
    series: [{ type: 'line', data: [12, 20, 16] }]
  }
</script>

<template>
  <Echart :option="option" :height="320" />
</template>
```

组件只接收 `option` 和 `height`。业务数据转换、加载态、空态和错误态仍由页面负责。

## 封装解决的问题

`Echart.vue` 统一处理：

- 挂载时创建实例，卸载时 dispose。
- option 对象引用变化时重新 setOption。
- 使用 ResizeObserver 跟随容器变化。
- KeepAlive 页面激活时 resize。
- 亮暗色切换时重建实例并应用 ECharts 主题。
- 默认透明背景。

这些是所有图表都需要的资源管理逻辑，集中一处可以避免内存泄漏和不可见容器尺寸错误。

当前监听是浅监听：更新图表时应替换 option 对象引用，不要只执行 `option.series[0].data.push(...)`。确实需要原地、高频更新时，应设计明确的更新接口，而不是给所有页面开启深度监听。

## 新增图表类型

如果页面需要散点图，显式加入注册表：

```ts
import { ScatterChart } from 'echarts/charts'

echarts.use([ScatterChart])
```

同理，使用 DataZoom、Dataset、SVGRenderer 等能力时，需要从对应入口导入并注册。TypeScript 接受一个 option 不代表运行时模块已经注册。

## 为什么不放进 packages

当前只有 Admin 使用 ECharts，而且注册哪些图表直接决定该 app 的包体积。把统一注册表放进公共包，会让所有应用被迫携带同一组图表模块。

如果以后多个 app 都需要 ECharts，可以把纯生命周期组件提取为接收实例工厂的公共能力；各 app 仍应保留自己的模块注册清单。

## 更新策略

默认 `setOption` 使用 `notMerge: true`，每次以传入 option 为完整真相，避免上一次 series 残留。高频实时图表如果需要增量合并，应先验证性能需求，再给组件增加明确选项，而不是默认让所有页面承担复杂状态。
