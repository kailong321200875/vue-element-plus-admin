<script lang="ts" setup>
import { propTypes } from '@/utils/propTypes'
import { useDesign } from '@/hooks/web/useDesign'
import { ref, nextTick, unref, onMounted } from 'vue'
import { isString } from '@/utils/is'

const { getPrefixCls } = useDesign()

const prefixCls = getPrefixCls('waterfall')

const prop = defineProps({
  data: propTypes.arrayOf(propTypes.any),
  reset: propTypes.bool.def(false),
  width: propTypes.number.def(200),
  height: propTypes.number.def(0),
  gap: propTypes.number.def(20),
  getContainer: propTypes.func.def(() => document.body),
  props: propTypes.objectOf(propTypes.string).def({
    src: 'src',
    height: 'height'
  })
})

const wrapEl = ref<HTMLDivElement>()

const heights = ref<number[]>([])

// 首先确定列数 = 页面宽度 / 图片宽度
const cols = ref(0)

const filterWaterfall = async () => {
  const { props, width, gap, getContainer, height } = prop
  const data = prop.data as any[]
  await nextTick()

  const container = (getContainer?.() || unref(wrapEl)) as HTMLElement
  if (!container) return
  cols.value = Math.floor(container.clientWidth / (width + gap))

  const length = data.length
  for (let i = 0; i < length; i++) {
    if (i + 1 < unref(cols)) {
      if (height || data[i][props.height as string]) {
        // 如果有全局高度，就使用全局高度
        // 如果 data[i][props.height as string] 是字符串，只保留数字字符串
        const itemHeight = isString(data[i][props.height as string])
          ? Number(data[i][props.height as string].replace(/[^0-9]/gi, ''))
          : data[i][props.height as string]
        heights.value[i] = height || itemHeight
      } else {
        // 说明在第一列
        const itemEl = container.querySelector(`.${prefixCls}-item__${i}`)
        itemEl?.addEventListener('load', () => {
          const clientRect = itemEl?.getBoundingClientRect()
          console.log(clientRect)
        })
        // const imgEl = new Image()
        // imgEl.src = data[i][props.src as string]
        // imgEl.onload = async () => {
        //   // const itemEl = container.querySelector(`.${prefixCls}-item__${i}`)
        //   const clientRect = itemEl?.getBoundingClientRect()
        //   if (clientRect) {
        //     heights.value[i] = clientRect?.height
        //   }
        // }
      }
    }
  }
}

onMounted(() => {
  filterWaterfall()
})
</script>

<template>
  <div :class="prefixCls" ref="wrapEl">
    <div
      v-for="(item, $index) in data"
      :class="`${prefixCls}-item__${$index}`"
      :key="`water-${$index}`"
      :style="{
        width: `${width}px`
      }"
    >
      <img :src="item[props.src as string]" class="w-full block" alt="" srcset="" />
    </div>
  </div>
</template>
