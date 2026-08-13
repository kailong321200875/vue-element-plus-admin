<script setup lang="ts">
  import { computed } from 'vue'
  import { Icon as IconifyIcon } from '@iconify/vue/offline'
  import { icons } from './icons'

  const props = withDefaults(
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

  const iconData = computed(() => icons[props.icon as keyof typeof icons])
</script>

<template>
  <IconifyIcon
    v-if="iconData"
    class="v-icon"
    :icon="iconData"
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
