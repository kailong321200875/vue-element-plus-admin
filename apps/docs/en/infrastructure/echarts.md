# ECharts

ECharts benefits from a very thin wrapper that standardizes instance lifecycle management, theme switching, and container resize observation. Chart options should still be defined by each page so the wrapper does not grow into another chart DSL.

## Register modules explicitly

Admin uses `echarts/core` in `src/plugins/echarts/index.ts` and currently registers only:

- Bar, line, and pie charts.
- Title, tooltip, grid, and legend components.
- `CanvasRenderer`.

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

This makes the application bundle easier to control than importing the complete `echarts` package.

## Use it in a page

```vue
<script setup lang="ts">
  import type { EChartsOption } from 'echarts'
  import { Echart } from '@/components/Echart'

  const option: EChartsOption = {
    tooltip: { trigger: 'axis' },
    xAxis: { type: 'category', data: ['One', 'Two', 'Three'] },
    yAxis: { type: 'value' },
    series: [{ type: 'line', data: [12, 20, 16] }]
  }
</script>

<template>
  <Echart :option="option" :height="320" />
</template>
```

The component accepts only `option` and `height`. Transforming business data and handling loading, empty, and error states remain the page's responsibility.

## What the wrapper handles

`Echart.vue` centralizes the following behavior:

- Creates the instance when mounted and disposes it when unmounted.
- Calls `setOption` again when the option object reference changes.
- Uses `ResizeObserver` to follow container size changes.
- Resizes when a `KeepAlive` page is activated.
- Recreates the instance and applies the ECharts theme when switching between light and dark modes.
- Uses a transparent background by default.

Every chart needs this resource-management logic. Keeping it in one place prevents memory leaks and sizing errors when a chart is initialized inside an invisible container.

The current watcher is shallow: replace the option object reference when updating a chart instead of only running `option.series[0].data.push(...)`. If in-place, high-frequency updates are genuinely required, design an explicit update API instead of enabling deep watching for every page.

## Add a chart type

If a page needs a scatter chart, add it to the registry explicitly:

```ts
import { ScatterChart } from 'echarts/charts'

echarts.use([ScatterChart])
```

The same rule applies to features such as DataZoom, Dataset, and SVGRenderer: import and register them from their corresponding entry points. TypeScript accepting an option does not mean its runtime module has been registered.

## Why it does not live in packages

Only Admin currently uses ECharts, and the registered modules directly determine that app's bundle size. Putting a shared registry in a public package would force every application to carry the same chart modules.

If multiple apps need ECharts later, the pure lifecycle component can be extracted as a shared capability that accepts an instance factory. Each app should still own its module registry.

## Update strategy

By default, `setOption` uses `notMerge: true`, so each option passed to the component is treated as the complete source of truth and stale series from the previous update cannot remain. If a high-frequency real-time chart needs incremental merging, verify the performance requirement first and then add an explicit component option instead of making every page handle more complex state by default.
