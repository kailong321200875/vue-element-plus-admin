<template>
  <div ref="echartRef" :class="className" :style="{ height: height, width: width }"></div>
</template>

<script setup lang="ts" name="Echart">
import { PropType, onMounted, watch, computed, onBeforeUnmount, onActivated, ref, unref } from 'vue'
import type { EChartsOption } from 'echarts'
import echarts from '@/plugins/echarts'
import { debounce } from 'lodash-es'
import 'echarts-wordcloud'

type ThemeType = 'light' | 'dark' | 'default'

const props = defineProps({
  options: {
    type: Object as PropType<EChartsOption>,
    required: true
  },
  className: {
    type: String as PropType<string>,
    default: ''
  },
  height: {
    type: String as PropType<string>,
    default: '500px'
  },
  width: {
    type: String as PropType<string>,
    default: ''
  },
  theme: {
    type: String as PropType<ThemeType>,
    default: 'default'
  }
})

let chartRef: Nullable<echarts.ECharts> = null
let sidebarElm: Nullable<Element | any> = null
let __resizeHandler: Nullable<any> = null
const echartOptions = computed(() => props.options)
const echartRef = ref<Nullable<HTMLElement>>(null)

watch(
  echartOptions,
  (options: EChartsOption) => {
    ;(chartRef as echarts.ECharts).setOption(options)
  },
  {
    deep: true
  }
)

function initChart() {
  chartRef = echarts.init(unref(echartRef) as HTMLElement, props.theme)
  chartRef.setOption(props.options)
}

function sidebarResizeHandler(e: any): void {
  if (e.propertyName === 'width') {
    if (__resizeHandler) {
      __resizeHandler()
    }
  }
}

onMounted(() => {
  initChart()

  __resizeHandler = debounce(() => {
    if (chartRef) {
      chartRef.resize()
    }
  }, 100)
  window.addEventListener('resize', __resizeHandler)
  sidebarElm = document.getElementsByClassName('sidebar__wrap')[0]
  sidebarElm && sidebarElm.addEventListener('transitionend', sidebarResizeHandler)
})

onBeforeUnmount(() => {
  window.removeEventListener('resize', __resizeHandler)

  sidebarElm && sidebarElm.removeEventListener('transitionend', sidebarResizeHandler)
})

onActivated(() => {
  // 防止keep-alive之后图表变形
  if (chartRef) {
    chartRef.resize()
  }
})
</script>
