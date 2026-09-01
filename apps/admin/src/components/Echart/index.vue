<script setup lang="ts">
  import type { EChartsOption } from 'echarts'
  import { computed, onActivated, onBeforeUnmount, onMounted, ref, watch } from 'vue'
  import echarts from '@/plugins/echarts'
  import { useAppStore } from '@/store/modules/app'

  const props = withDefaults(
    defineProps<{
      option: EChartsOption
      height?: number | string
    }>(),
    { height: 300 }
  )

  const appStore = useAppStore()
  const chartEl = ref<HTMLElement>()
  const style = computed(() => ({
    width: '100%',
    height: typeof props.height === 'number' ? `${props.height}px` : props.height
  }))

  let chart: echarts.ECharts | undefined
  let resizeObserver: ResizeObserver | undefined

  const render = () => {
    chart?.setOption({ backgroundColor: 'transparent', ...props.option }, { notMerge: true })
  }

  const initChart = () => {
    if (!chartEl.value) return

    chart?.dispose()
    chart = echarts.init(chartEl.value, appStore.isDark ? 'dark' : undefined)
    render()
  }

  watch(() => props.option, render)
  watch(() => appStore.isDark, initChart)

  onMounted(() => {
    initChart()
    resizeObserver = new ResizeObserver(() => chart?.resize())
    resizeObserver.observe(chartEl.value!)
  })

  onActivated(() => chart?.resize())

  onBeforeUnmount(() => {
    resizeObserver?.disconnect()
    chart?.dispose()
    chart = undefined
  })
</script>

<template>
  <div ref="chartEl" class="v-echart" :style="style"></div>
</template>
