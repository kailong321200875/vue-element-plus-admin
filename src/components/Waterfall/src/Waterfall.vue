<script lang="ts" setup>
import { propTypes } from '@/utils/propTypes'
import { useDesign } from '@/hooks/web/useDesign'
import { ref, nextTick, unref, onMounted, watch } from 'vue'
import { useEventListener, useIntersectionObserver } from '@vueuse/core'
import { debounce } from 'lodash-es'

const { getPrefixCls } = useDesign()

const prefixCls = getPrefixCls('waterfall')

const emit = defineEmits(['loadMore'])

const prop = defineProps({
  data: propTypes.arrayOf(propTypes.any),
  reset: propTypes.bool.def(true),
  width: propTypes.number.def(200),
  gap: propTypes.number.def(20),
  props: propTypes.objectOf(propTypes.string).def({
    src: 'src',
    height: 'height'
  }),
  loadingText: propTypes.string.def('加载中...'),
  loading: propTypes.bool.def(false),
  end: propTypes.bool.def(false),
  endText: propTypes.string.def('没有更多了')
})

const wrapEl = ref<HTMLDivElement>()

const heights = ref<number[]>([])

const wrapHeight = ref(0)

const wrapWidth = ref(0)

const loadMore = ref<HTMLDivElement>()

// 首先确定列数 = 页面宽度 / 图片宽度
const cols = ref(0)

const filterData = ref<any[]>([])

const filterWaterfall = async () => {
  filterData.value = []
  const { props, width, gap } = prop
  const data = prop.data as any[]
  await nextTick()

  const container = unref(wrapEl) as HTMLElement
  if (!container) return
  cols.value = Math.floor(container.clientWidth / (width + gap))

  const length = data.length
  for (let i = 0; i < length; i++) {
    if (i < unref(cols)) {
      heights.value[i] = data[i][props.height as string]
      filterData.value.push({
        ...data[i],
        top: 0,
        left: i * (width + gap)
      })
    } else {
      // 其他行，先找出最矮的那一列 和 索引
      // 假设最小高度是第一个元素
      let minHeight = heights.value[0]
      let index = 0
      // 找出最小高度
      for (let j = 1; j < unref(cols); j++) {
        if (unref(heights)[j] < minHeight) {
          minHeight = unref(heights)[j]
          index = j
        }
      }

      // 更新最矮高度
      heights.value[index] += data[i][props.height as string] + gap
      filterData.value.push({
        ...data[i],
        top: minHeight + gap,
        left: index * (width + gap)
      })
    }
  }
  wrapHeight.value = Math.max(...unref(heights))
  wrapWidth.value = unref(cols) * (width + gap) - gap
}

watch(
  () => prop.data,
  async () => {
    await nextTick()
    filterWaterfall()
  },
  {
    immediate: true
  }
)

onMounted(() => {
  if (unref(prop.reset)) {
    useEventListener(window, 'resize', debounce(filterWaterfall, 300))
  }
  useIntersectionObserver(
    unref(loadMore),
    ([{ isIntersecting }]) => {
      if (isIntersecting && !prop.loading && !prop.end) {
        emit('loadMore')
      }
    },
    {
      threshold: 0.1
    }
  )
})
</script>

<template>
  <div
    :class="[prefixCls, 'flex', 'justify-center', 'items-center']"
    ref="wrapEl"
    :style="{
      height: `${wrapHeight + 40}px`
    }"
  >
    <div
      class="relative"
      :style="{
        width: `${wrapWidth}px`,
        height: `${wrapHeight + 40}px`
      }"
    >
      <div
        v-for="(item, $index) in filterData"
        :class="[`${prefixCls}-item__${$index}`, 'absolute']"
        :key="`water-${$index}`"
        :style="{
          width: `${width}px`,
          height: `${item[props.height as string]}px`,
          top: `${item.top}px`,
          left: `${item.left}px`
        }"
      >
        <img :src="item[props.src as string]" class="w-full h-full block" alt="" srcset="" />
      </div>
      <div
        ref="loadMore"
        class="h-40px flex justify-center absolute w-full"
        :style="{
          top: `${wrapHeight + gap}px`
        }"
      >
        {{ end ? endText : loadingText }}
      </div>
    </div>
  </div>
</template>
