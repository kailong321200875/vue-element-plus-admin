<script setup lang="ts">
  import { Icon as IconifyIcon } from '@iconify/vue/offline'

  withDefaults(
    defineProps<{
      icon?: string
      size?: number | string
      color?: string
    }>(),
    {
      icon: '',
      size: 16,
      color: undefined
    }
  )
</script>

<template>
  <IconifyIcon
    v-if="icon"
    class="v-icon"
    :icon="icon"
    :width="size"
    :height="size"
    :style="{ '--v-icon-color': color }"
  />
</template>

<style scoped>
  .v-icon {
    color: var(--v-icon-color, currentcolor);
  }
</style>
