<script setup lang="ts">
import type { EChartsOption } from 'echarts'
import echarts from '@/plugins/echarts'
import { debounce } from 'lodash-es'
import 'echarts-wordcloud'
import { propTypes } from '@/utils/propTypes'
import { computed, PropType, ref, unref, watch, onMounted, onBeforeUnmount, onActivated } from 'vue'
import { useAppStore } from '@/store/modules/app'
import { isString } from '@/utils/is'
import { useDesign } from '@/hooks/web/useDesign'

const { getPrefixCls } = useDesign()

const prefixCls = getPrefixCls('echart')

const appStore = useAppStore()

const props = defineProps({
  options: {
    type: Object as PropType<EChartsOption>,
    required: true
  },
  width: propTypes.oneOfType([Number, String]).def(''),
  height: propTypes.oneOfType([Number, String]).def('500px')
})

const isDark = computed(() => appStore.getIsDark)

const theme = computed(() => {
  const echartTheme: boolean | string = unref(isDark) ? true : 'auto'

  return echartTheme
})

const options = computed(() => {
  return Object.assign(props.options, {
    darkMode: unref(theme)
  })
})

const elRef = ref<ElRef>()

const echartRef = ref<echarts.ECharts>()

const contentEl = ref<Element>()

const styles = computed(() => {
  const width = isString(props.width) ? props.width : `${props.width}px`
  const height = isString(props.height) ? props.height : `${props.height}px`

  return {
    width,
    height
  }
})

const initChart = () => {
  if (unref(elRef) && props.options) {
    echartRef.value = echarts.init(unref(elRef) as HTMLElement, unref(options))
  }
}

watch(
  () => options.value,
  (options) => {
    const chart = unref(echartRef)
    if (chart) {
      chart?.setOption(options)
    }
  },
  {
    deep: true
  }
)

const resizeHandler = debounce(() => {
  const chart = unref(echartRef)
  if (chart) {
    chart.resize()
  }
}, 100)

const contentResizeHandler = (e: TransitionEvent) => {
  if (e.propertyName === 'width') {
    resizeHandler()
  }
}

onMounted(() => {
  initChart()

  window.addEventListener('resize', resizeHandler)

  contentEl.value = document.getElementsByClassName('v-content')[0]
  unref(contentEl) &&
    (unref(contentEl) as Element).addEventListener('transitionend', contentResizeHandler)
})

onBeforeUnmount(() => {
  window.removeEventListener('resize', resizeHandler)
  unref(contentEl) &&
    (unref(contentEl) as Element).removeEventListener('transitionend', contentResizeHandler)
})

onActivated(() => {
  const chart = unref(echartRef)
  if (chart) {
    chart.resize()
  }
})
</script>

<template>
  <div ref="elRef" :class="[$attrs.class, prefixCls]" :style="styles" />
</template>
