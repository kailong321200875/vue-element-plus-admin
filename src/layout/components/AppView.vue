<script setup lang="ts">
import { useTagsViewStore } from '@/store/modules/tagsView'
import { computed } from 'vue'

const tagsViewStore = useTagsViewStore()

const getCaches = computed((): string[] => {
  return tagsViewStore.getCachedViews
})
</script>

<template>
  <section class="p-[var(--app-content-padding)] w-[100%]">
    <router-view>
      <template #default="{ Component, route }">
        <keep-alive :include="getCaches">
          <component :is="Component" :key="route.fullPath" />
        </keep-alive>
      </template>
    </router-view>
  </section>
</template>
