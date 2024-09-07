import { ref } from 'vue'

export const useResize = (props?: {
  minHeightPx?: number
  minWidthPx?: number
  initHeight?: number
  initWidth?: number
}) => {
  const {
    minHeightPx = 400,
    minWidthPx = window.innerWidth / 2,
    initHeight = 400,
    initWidth = window.innerWidth / 2
  } = props || {}
  // 屏幕宽度的 50% 作为最小宽度
  //   const minWidthPx = window.innerWidth / 2
  // 固定的最小高度 400px
  //   const minHeightPx = 400
  // 初始高度限制为 400px
  const maxHeight = ref(initHeight + 'px')
  // 初始宽度限制为 50%
  const minWidth = ref(initWidth + 'px')
  const setupDrag = (elDialog: any, el: any) => {
    // 获取对话框元素
    // 是否正在调整大小的标志
    let isResizing = false
    // 当前调整的方向
    let currentResizeDirection = ''

    // 鼠标移动时的事件处理器，用于检测鼠标位置并设置相应的光标样式
    const handleMouseMove = (e: any) => {
      const rect = elDialog.getBoundingClientRect()
      // 鼠标相对于对话框左侧的偏移量
      const offsetX = e.clientX - rect.left
      // 鼠标相对于对话框顶部的偏移量
      const offsetY = e.clientY - rect.top
      const width = elDialog.clientWidth
      const height = elDialog.clientHeight

      // 获取对话框的内边距
      const computedStyle = window.getComputedStyle(elDialog)
      const paddingLeft = parseFloat(computedStyle.paddingLeft)
      const paddingRight = parseFloat(computedStyle.paddingRight)
      const paddingBottom = parseFloat(computedStyle.paddingBottom)
      const paddingTop = parseFloat(computedStyle.paddingTop)

      // 根据鼠标位置设置相应的光标样式和调整方向
      if (!isResizing) {
        if (offsetX < paddingLeft && offsetY > paddingTop && offsetY < height - paddingBottom) {
          elDialog.style.cursor = 'ew-resize' // 左右箭头
          currentResizeDirection = 'left'
        } else if (
          offsetX > width - paddingRight &&
          offsetY > paddingTop &&
          offsetY < height - paddingBottom
        ) {
          elDialog.style.cursor = 'ew-resize' // 左右箭头
          currentResizeDirection = 'right'
        } else if (
          offsetY < paddingTop &&
          offsetX > paddingLeft &&
          offsetX < width - paddingRight
        ) {
          elDialog.style.cursor = 'ns-resize' // 上下箭头
          currentResizeDirection = 'top'
        } else if (
          offsetY > height - paddingBottom &&
          offsetX > paddingLeft &&
          offsetX < width - paddingRight
        ) {
          elDialog.style.cursor = 'ns-resize' // 上下箭头
          currentResizeDirection = 'bottom'
        } else if (offsetX < paddingLeft && offsetY < paddingTop) {
          elDialog.style.cursor = 'nwse-resize' // 左上右下箭头
          currentResizeDirection = 'top-left'
        } else if (offsetX > width - paddingRight && offsetY < paddingTop) {
          elDialog.style.cursor = 'nesw-resize' // 右上左下箭头
          currentResizeDirection = 'top-right'
        } else if (offsetX < paddingLeft && offsetY > height - paddingBottom) {
          elDialog.style.cursor = 'nesw-resize' // 右上左下箭头
          currentResizeDirection = 'bottom-left'
        } else if (offsetX > width - paddingRight && offsetY > height - paddingBottom) {
          elDialog.style.cursor = 'nwse-resize' // 左上右下箭头
          currentResizeDirection = 'bottom-right'
        } else {
          elDialog.style.cursor = 'default'
          currentResizeDirection = ''
        }
      }
    }

    // 鼠标按下时的事件处理器，开始调整对话框大小
    const handleMouseDown = (e) => {
      if (currentResizeDirection) {
        isResizing = true

        const initialX = e.clientX
        const initialY = e.clientY
        const initialWidth = elDialog.clientWidth
        const initialHeight = el.querySelector('.el-dialog__body').clientHeight

        // 调整大小的事件处理器
        const handleResizing = (e: any) => {
          if (!isResizing) return

          let newWidth = initialWidth
          let newHeight = initialHeight

          // 根据当前调整方向计算新的宽度和高度
          if (currentResizeDirection.includes('right')) {
            newWidth = Math.max(minWidthPx, initialWidth + (e.clientX - initialX) * 2)
            minWidth.value = `${newWidth}px`
          }

          if (currentResizeDirection.includes('left')) {
            newWidth = Math.max(minWidthPx, initialWidth - (e.clientX - initialX) * 2)
            minWidth.value = `${newWidth}px`
          }

          if (currentResizeDirection.includes('bottom')) {
            newHeight = Math.max(minHeightPx, initialHeight + (e.clientY - initialY) * 2 - 20)
            maxHeight.value = `${Math.min(newHeight, window.innerHeight - 165)}px`
          }

          if (currentResizeDirection.includes('top')) {
            newHeight = Math.max(minHeightPx, initialHeight - (e.clientY - initialY) * 2 - 20)
            maxHeight.value = `${Math.min(newHeight, window.innerHeight - 165)}px`
          }

          if (currentResizeDirection === 'top-left') {
            newWidth = Math.max(minWidthPx, initialWidth - (e.clientX - initialX) * 2)
            minWidth.value = `${newWidth}px`
            newHeight = Math.max(minHeightPx, initialHeight - (e.clientY - initialY) * 2 - 20)
            maxHeight.value = `${Math.min(newHeight, window.innerHeight - 165)}px`
          }

          if (currentResizeDirection === 'top-right') {
            newWidth = Math.max(minWidthPx, initialWidth + (e.clientX - initialX) * 2)
            minWidth.value = `${newWidth}px`
            newHeight = Math.max(minHeightPx, initialHeight - (e.clientY - initialY) * 2 - 20)
            maxHeight.value = `${Math.min(newHeight, window.innerHeight - 165)}px`
          }

          if (currentResizeDirection === 'bottom-left') {
            newWidth = Math.max(minWidthPx, initialWidth - (e.clientX - initialX) * 2)
            minWidth.value = `${newWidth}px`
            newHeight = Math.max(minHeightPx, initialHeight + (e.clientY - initialY) * 2 - 20)
            maxHeight.value = `${Math.min(newHeight, window.innerHeight - 165)}px`
          }

          if (currentResizeDirection === 'bottom-right') {
            newWidth = Math.max(minWidthPx, initialWidth + (e.clientX - initialX) * 2)
            minWidth.value = `${newWidth}px`
            newHeight = Math.max(minHeightPx, initialHeight + (e.clientY - initialY) * 2 - 20)
            maxHeight.value = `${Math.min(newHeight, window.innerHeight - 165)}px`
          }
        }
        // 停止调整大小的事件处理器
        const stopResizing = () => {
          isResizing = false
          document.removeEventListener('mousemove', handleResizing)
          document.removeEventListener('mouseup', stopResizing)
        }

        document.addEventListener('mousemove', handleResizing)
        document.addEventListener('mouseup', stopResizing)
      }
    }
    elDialog.addEventListener('mousemove', handleMouseMove)
    elDialog.addEventListener('mousedown', handleMouseDown)
  }

  return {
    setupDrag,
    maxHeight,
    minWidth
  }
}
