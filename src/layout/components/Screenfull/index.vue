<template>
  <el-tooltip
    :effect="'dark' as any"
    :content="isFullscreen ? '退出全屏' : '全屏'"
    placement="bottom"
  >
    <div id="screenfull-container">
      <svg-icon
        :icon-class="isFullscreen ? 'exit-fullscreen' : 'fullscreen'"
        class="screenfull-svg"
        @click="click"
      />
    </div>
  </el-tooltip>
</template>

<script setup lang="ts" name="Screenfull">
import { ref, onMounted } from 'vue'
import { Message } from '_c/Message'
import { useFullscreen } from '@/hooks/web/useFullscreen'
const { sf } = useFullscreen()

const isFullscreen = ref<boolean>(false)

function click() {
  if (!sf.isEnabled) {
    Message({
      message: 'you browser can not work',
      type: 'warning'
    })
    return false
  }
  sf.toggle()
}

function init() {
  if (sf.isEnabled) {
    sf.on('change', () => {
      isFullscreen.value = sf.isFullscreen
    })
  }
}

onMounted(() => {
  init()
})
</script>

<style scoped>
.screenfull-svg {
  cursor: pointer;
}
</style>
