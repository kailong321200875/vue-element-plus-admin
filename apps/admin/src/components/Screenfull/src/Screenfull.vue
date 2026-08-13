<script setup lang="ts">
  import { Icon } from '@vea/components'
  import { useFullscreen } from '@vueuse/core'
  import { propTypes } from '@/utils/propTypes'
  const prefixCls = 'v-screenfull'

  defineProps({
    color: propTypes.string.def('')
  })

  const { toggle, isFullscreen } = useFullscreen()

  const toggleFullscreen = () => {
    toggle()
  }
</script>

<template>
  <div :class="prefixCls" @click="toggleFullscreen">
    <Icon
      :size="18"
      :icon="isFullscreen ? 'mdi:fullscreen-exit' : 'mdi:fullscreen'"
      :color="color"
    />
  </div>
</template>
