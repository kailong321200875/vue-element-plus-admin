<template>
  <el-dialog
    ref="dialogRef"
    v-bind="getBindValue"
    :fullscreen="fullscreen"
    destroy-on-close
    lock-scroll
    :close-on-click-modal="false"
    top="10vh"
  >
    <template #title>
      <slot name="title">
        {{ title }}
      </slot>
      <svg-icon
        v-if="showFullscreen"
        :icon-class="fullscreen ? 'exit-fullscreen' : 'fullscreen'"
        class-name="dialog__icon"
        @click="toggleFull"
      />
    </template>

    <!-- 弹窗内容 -->
    <el-scrollbar
      :class="
        fullscreen && slots.footer
          ? 'com-dialog__content--footer'
          : fullscreen && !slots.footer
          ? 'com-dialog__content--fullscreen'
          : 'com-dialog__content'
      "
    >
      <div class="content__wrap">
        <slot></slot>
      </div>
    </el-scrollbar>

    <template v-if="slots.footer" #footer>
      <slot name="footer"></slot>
    </template>
  </el-dialog>
</template>

<script setup lang="ts" name="ComDialog">
import { ref, computed, PropType, nextTick, unref, useAttrs, useSlots } from 'vue'
import SvgIcon from '@/components/SvgIcon/index.vue'

const slots = useSlots()

const props = defineProps({
  title: {
    type: String as PropType<string>,
    default: ''
  },
  // 是否显示全屏按钮
  showFullscreen: {
    type: Boolean as PropType<boolean>,
    default: true
  },
  // 是否可以拖拽
  draggable: {
    type: Boolean as PropType<boolean>,
    default: true
  }
})
const dialogRef = ref<HTMLElement | null>(null)

const fullscreen = ref<boolean>(false)

const getBindValue = computed((): any => {
  const delArr: string[] = ['showFullscreen', 'draggable']
  const attrs = useAttrs()
  const obj = { ...attrs, ...props }
  for (const key in obj) {
    if (delArr.indexOf(key) !== -1) {
      delete obj[key]
    }
  }
  return obj
})

function toggleFull(): void {
  fullscreen.value = !fullscreen.value
  // 全屏的时候需要重新定义left top
  if (fullscreen.value && props.draggable) {
    const dragDom = unref(dialogRef as any).$refs.dialogRef
    dragDom.style.cssText += `;left:0px;top:0px;`
  }
}

function initDraggable() {
  nextTick(() => {
    const dragDom = unref(dialogRef as any).$refs.dialogRef
    const dialogHeaderEl = dragDom.querySelector('.el-dialog__header') as HTMLElement
    dragDom.style.cssText += ';top:0px;'
    dialogHeaderEl.style.cssText += ';cursor:move;user-select:none;'
    dialogHeaderEl.onmousedown = (e) => {
      const disX = e.clientX - dialogHeaderEl.offsetLeft
      const disY = e.clientY - dialogHeaderEl.offsetTop

      const dragDomWidth = dragDom.offsetWidth
      const dragDomHeight = dragDom.offsetHeight

      const screenWidth = document.body.clientWidth
      const screenHeight = document.body.clientHeight

      const minDragDomLeft = dragDom.offsetLeft
      const maxDragDomLeft = screenWidth - dragDom.offsetLeft - dragDomWidth

      const minDragDomTop = dragDom.offsetTop
      const maxDragDomTop = screenHeight - dragDom.offsetTop - dragDomHeight

      const styleLeftStr = getComputedStyle(dragDom).left
      const styleTopStr = getComputedStyle(dragDom).top
      if (!styleLeftStr || !styleTopStr) return
      let styleLeft: number
      let styleTop: number

      // Format may be "##%" or "##px"
      if (styleLeftStr.includes('%')) {
        styleLeft = +document.body.clientWidth * (+styleLeftStr.replace(/%/g, '') / 100)
        styleTop = +document.body.clientHeight * (+styleTopStr.replace(/%/g, '') / 100)
      } else {
        styleLeft = +styleLeftStr.replace(/px/g, '')
        styleTop = +styleTopStr.replace(/px/g, '')
      }

      document.onmousemove = (e) => {
        let left = e.clientX - disX
        let top = e.clientY - disY

        // Handle edge cases
        if (-left > minDragDomLeft) {
          left = -minDragDomLeft
        } else if (left > maxDragDomLeft) {
          left = maxDragDomLeft
        }
        if (-top > minDragDomTop) {
          top = -minDragDomTop
        } else if (top > maxDragDomTop) {
          top = maxDragDomTop
        }

        // Move current element
        dragDom.style.cssText += `;left:${left + styleLeft}px;top:${top + styleTop}px;`
      }

      document.onmouseup = () => {
        document.onmousemove = null
        document.onmouseup = null
      }
    }
  })
}

if (props.draggable) {
  initDraggable()
}
</script>

<style lang="less" scoped>
.dialog__icon {
  position: absolute;
  top: 22px;
  right: 45px;
  font-size: 12px;
  color: #909399;
  cursor: pointer;
  transition: color 0.2s;

  &:hover {
    color: #409eff;
  }
}

.com-dialog__content {
  .content__wrap {
    padding-right: 10px;
  }

  :deep(.el-scrollbar__wrap) {
    max-height: 600px; // 最大高度
    overflow-x: hidden; // 隐藏横向滚动栏
  }
}

.com-dialog__content--fullscreen {
  :deep(.el-scrollbar__wrap) {
    height: calc(~'100vh - 46px - 60px'); // 最大高度
  }
}

.com-dialog__content--footer {
  :deep(.el-scrollbar__wrap) {
    max-height: calc(~'100vh - 46px - 60px - 70px'); // 最大高度
  }
}
</style>
