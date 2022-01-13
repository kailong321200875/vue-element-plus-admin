<script setup lang="ts">
import { Icon } from '@/components/Icon'
import { useFullscreen } from '@vueuse/core'

const { toggle, isFullscreen } = useFullscreen()

function toggleFullscreen() {
  toggle()
}
</script>

<template>
  <div @click="toggleFullscreen">
    <Icon :size="18" :icon="isFullscreen ? 'zmdi:fullscreen-exit' : 'zmdi:fullscreen'" />
  </div>
</template>
