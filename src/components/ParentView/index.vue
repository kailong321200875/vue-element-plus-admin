<template>
  <div>
    <router-view>
      <template #default="{ Component, route }">
        <keep-alive :include="getCaches">
          <component :is="Component" :key="route.fullPath" />
        </keep-alive>
      </template>
    </router-view>
  </div>
</template>
<script lang="ts">
import { defineComponent } from 'vue'

import { useCache } from './useCache'

export default defineComponent({
  setup() {
    const { getCaches } = useCache(false)

    return {
      getCaches
    }
  }
})
</script>
