<template>
  <a v-if="isExternal(to)" :href="to" target="_blank" rel="noopener">
    <slot />
  </a>
  <router-link v-else :to="to">
    <slot />
  </router-link>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue'
import { isExternal } from '@/utils/validate'

export default defineComponent({
  props: {
    to: {
      type: String as PropType<string>,
      required: true
    }
  },
  setup() {
    return {
      isExternal
    }
  }
})
</script>
