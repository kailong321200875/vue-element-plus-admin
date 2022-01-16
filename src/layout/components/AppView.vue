<script setup lang="ts">
import { useTagsViewStore } from '@/store/modules/tagsView'
import { computed } from 'vue'

const tagsViewStore = useTagsViewStore()

const getCaches = computed((): string[] => {
  return tagsViewStore.getCachedViews
})
</script>

<template>
  <el-scrollbar
    :class="[
      'v-content',
      {
        '!h-[calc(100%-var(--top-tool-height)-var(--tags-view-height))]': true
      }
    ]"
  >
    <section class="p-[var(--app-content-padding)]">
      <router-view>
        <template #default="{ Component, route }">
          <keep-alive :include="getCaches">
            <component :is="Component" :key="route.fullPath" />
          </keep-alive>
        </template>
      </router-view>
    </section>
  </el-scrollbar>
</template>
