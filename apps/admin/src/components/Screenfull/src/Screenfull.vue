<script setup lang="ts">
  import { Icon } from '@vea/components'
  import { useFullscreen } from '@vueuse/core'
  const prefixCls = 'v-screenfull'

  withDefaults(defineProps<{ color?: string }>(), { color: '' })

  const { toggle, isFullscreen } = useFullscreen()
</script>

<template>
  <div :class="prefixCls" @click="toggle">
    <Icon
      :size="18"
      :icon="isFullscreen ? 'mdi:fullscreen-exit' : 'mdi:fullscreen'"
      :color="color"
    />
  </div>
</template>
