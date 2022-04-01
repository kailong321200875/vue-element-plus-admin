<script setup lang="ts">
import { propTypes } from '@/utils/propTypes'
import { ref, onMounted, onActivated, shallowRef } from 'vue'
import { useEventListener, useWindowSize } from '@vueuse/core'
const props = defineProps({
  // 距离顶部或者底部的距离(单位px)
  offset: propTypes.number.def(0),
  // 设置元素的堆叠顺序
  zIndex: propTypes.number.def(999),
  // 设置指定的class
  className: propTypes.string.def(''),
  // 定位方式，默认为(top)，表示距离顶部位置，可以设置为top或者bottom
  position: {
    type: String,
    validator: function (value: string) {
      return ['top', 'bottom'].indexOf(value) !== -1
    },
    default: 'top'
  }
})
const active = ref(false)
const positionStyle = ref('' as any)
const width = ref(undefined as any)
const height = ref(undefined as any)
const isSticky = ref(false)
const refSticky = ref()
const scrollContainer = shallowRef()
const { height: windowHeight } = useWindowSize()
onMounted(() => {
  height.value = refSticky.value.getBoundingClientRect().height
  scrollContainer.value = getScrollContainer(refSticky.value, true)
  useEventListener(scrollContainer, 'scroll', handleScroll)
  useEventListener('resize', handleReize)
  handleScroll()
})
onActivated(() => {
  handleScroll()
})

const camelize = (str) => {
  return str.replace(/-(\w)/g, (_, c) => (c ? c.toUpperCase() : ''))
}

const getStyle = (element, styleName) => {
  let _a
  let key = camelize(styleName)
  if (key === 'float') key = 'cssFloat'
  try {
    const style = element.style[styleName]
    if (style) return style
    const computed = (_a = document.defaultView) == null ? void 0 : _a.getComputedStyle(element, '')
    return computed ? computed[styleName] : ''
  } catch (e) {
    return element.style[styleName]
  }
}

const isScroll = (el, isVertical) => {
  const key = {
    undefined: 'overflow',
    true: 'overflow-y',
    false: 'overflow-x'
  }[String(isVertical)]
  const overflow = getStyle(el, key)
  return ['scroll', 'auto', 'overlay'].some((s) => overflow.includes(s))
}
const getScrollContainer = (el, isVertical) => {
  let parent = el
  while (parent) {
    if ([window, document, document.documentElement].includes(parent)) return window
    if (isScroll(parent, isVertical)) return parent
    parent = parent.parentNode
  }
  return parent
}

const handleScroll = () => {
  width.value = refSticky.value.getBoundingClientRect().width
  if (props.position === 'top') {
    const offsetTop = refSticky.value.getBoundingClientRect().top
    if (offsetTop < props.offset) {
      sticky()
      return
    }
    reset()
  } else {
    const offsetBottom = refSticky.value.getBoundingClientRect().bottom
    if (offsetBottom > windowHeight.value - props.offset) {
      sticky()
      return
    }
    reset()
  }
}
const handleReize = () => {
  if (isSticky.value) {
    width.value = refSticky.value.getBoundingClientRect().width + 'px'
  }
}
const sticky = () => {
  if (active.value) {
    return
  }
  positionStyle.value = 'fixed'
  active.value = true
  width.value = width.value + 'px'
  isSticky.value = true
}
const reset = () => {
  if (!active.value) {
    return
  }
  positionStyle.value = ''
  width.value = 'auto'
  active.value = false
  isSticky.value = false
}
</script>
<template>
  <div :style="{ height: height + 'px', zIndex: zIndex }" ref="refSticky">
    <div
      :class="className"
      :style="{
        top: position === 'top' ? offset + 'px' : '',
        bottom: position !== 'top' ? offset + 'px' : '',
        zIndex: zIndex,
        position: positionStyle,
        width: width,
        height: height + 'px'
      }"
    >
      <slot>
        <div>sticky</div>
      </slot>
    </div>
  </div>
</template>
