<template>
  <div
    ref="elRef"
    :class="['scrollbar__bar', 'is-' + bar.key]"
    @mousedown="clickTrackHandler"
  >
    <div
      ref="thumbRef"
      class="scrollbar__thumb"
      :style="renderThumbStyle({ size, move, bar })"
      @mousedown="clickThumbHandler"
    />
  </div>
</template>

<script lang="ts">
import type { PropType } from 'vue'
import { defineComponent, computed, unref, inject, Ref, reactive, ref, onBeforeUnmount } from 'vue'
import { renderThumbStyle, BAR_MAP } from './util'
import { on, off } from '@/utils/dom-utils'
export default defineComponent({
  name: 'Bar',
  props: {
    vertical: {
      type: Boolean as PropType<boolean>,
      default: false
    },
    size: {
      type: String as PropType<string>,
      default: ''
    },
    move: {
      type: Number as PropType<number>,
      default: 0
    }
  },
  setup(props) {
    const thumbRef = ref<HTMLElement | null>(null)
    const elRef = ref<HTMLElement | null>(null)
    const commonState = reactive<any>({})
    const getBarRef = computed(() => {
      return BAR_MAP[props.vertical ? 'vertical' : 'horizontal']
    })
    const bar = unref(getBarRef)
    const parentElRef = inject('scroll-bar-wrap') as Ref<HTMLElement>

    function clickThumbHandler(e: any) {
      const { ctrlKey, button, currentTarget } = e
      // prevent click event of right button
      if (ctrlKey || button === 2 || !currentTarget) {
        return
      }
      startDrag(e)
      const bar = unref(getBarRef)
      commonState[bar.axis] =
        currentTarget[bar.offset] -
        (e[bar.client as keyof typeof e] - currentTarget.getBoundingClientRect()[bar.direction])
    }

    function clickTrackHandler(e: any) {
      const bar = unref(getBarRef)
      const offset = Math.abs(e.target.getBoundingClientRect()[bar.direction] - e[bar.client])
      const thumbEl = unref(thumbRef) as any
      const parentEl = unref(parentElRef) as any
      const el = unref(elRef) as any
      if (!thumbEl || !el || !parentEl) return
      const thumbHalf = thumbEl[bar.offset] / 2
      const thumbPositionPercentage = ((offset - thumbHalf) * 100) / el[bar.offset]
      parentEl[bar.scroll] = (thumbPositionPercentage * parentEl[bar.scrollSize]) / 100
    }

    function startDrag(e: Event) {
      e.stopImmediatePropagation()
      commonState.cursorDown = true

      on(document, 'mousemove', mouseMoveDocumentHandler)
      on(document, 'mouseup', mouseUpDocumentHandler)
      document.onselectstart = () => false
    }

    function mouseMoveDocumentHandler(e: any) {
      if (commonState.cursorDown === false) return
      const bar = unref(getBarRef)
      const prevPage = commonState[bar.axis]
      const el = unref(elRef) as any
      const parentEl = unref(parentElRef) as any
      const thumbEl = unref(thumbRef) as any
      if (!prevPage || !el || !thumbEl || !parentEl) return
      const rect = el.getBoundingClientRect() as any
      const offset = (rect[bar.direction] - e[bar.client]) * -1
      const thumbClickPosition = thumbEl[bar.offset] - prevPage
      const thumbPositionPercentage = ((offset - thumbClickPosition) * 100) / el[bar.offset]

      parentEl[bar.scroll] = (thumbPositionPercentage * parentEl[bar.scrollSize]) / 100
    }

    function mouseUpDocumentHandler() {
      const bar = unref(getBarRef)
      commonState.cursorDown = false
      commonState[bar.axis] = 0
      off(document, 'mousemove', mouseMoveDocumentHandler)
      document.onselectstart = null
    }

    onBeforeUnmount(() => {
      off(document, 'mouseup', mouseUpDocumentHandler)
    })

    return {
      thumbRef,
      elRef,
      bar,
      clickThumbHandler,
      clickTrackHandler,
      renderThumbStyle
    }
  }
})
</script>

<style lang="less" scoped>
.scrollbar__bar.is-vertical>div {
  width: 100%;
}
.scrollbar__bar.is-horizontal>div {
  height: 100%;
}
</style>
