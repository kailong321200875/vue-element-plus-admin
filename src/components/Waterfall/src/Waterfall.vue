<script lang="ts" setup>
import { propTypes } from '@/utils/propTypes'
import { useDesign } from '@/hooks/web/useDesign'
import { ref, nextTick, unref } from 'vue'

const { getPrefixCls } = useDesign()

const prefixCls = getPrefixCls('waterfall')

const prop = defineProps({
  data: propTypes.arrayOf(propTypes.any),
  reset: propTypes.bool.def(false),
  width: propTypes.number.def(200),
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
  const { props, width, gap, getContainer } = prop
  const data = prop.data as any[]
  await nextTick()

  const container = (getContainer?.() || unref(wrapEl)) as HTMLElement
  if (!container) return
  cols.value = Math.floor(container.clientWidth / (width + gap))

  const length = data.length
  for (let i = 0; i < length; i++) {
    if (i + 1 < unref(cols)) {
      // 说明在第一列
      const height = data[i][props.height as string]
      if (height) {
        heights.value.push(height)
      } else {
        await nextTick()
        const itemEl = container.querySelector(`.${prefixCls}-item__${i}`)
        const rectObject = itemEl?.clientHeight
        console.log(rectObject)
      }
    }
  }
}
filterWaterfall()
</script>

<template>
  <div :class="prefixCls" ref="wrapEl">
    <div
      v-for="(item, $index) in data"
      :class="`${prefixCls}-item__${$index}`"
      :key="`water-${$index}`"
    >
      <img :src="item[props.src as string]" alt="" srcset="" />
    </div>
  </div>
</template>
