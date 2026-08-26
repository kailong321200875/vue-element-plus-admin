<script setup lang="ts">
  import { useTagsViewStore } from '@/store/modules/tagsView'
  import { Footer } from '@/components/Footer'
  import { computed } from 'vue'
  import { appConfig } from '@/config/app'

  const tagsViewStore = useTagsViewStore()

  const cachedViews = computed(() => tagsViewStore.cachedViews)
</script>

<template>
  <section
    :class="[
      'box-border p-[var(--app-content-padding)] w-full bg-[var(--app-content-bg-color)]',
      {
        '!min-h-[calc(100vh-var(--top-tool-height)-var(--tags-view-height)-var(--app-footer-height))] pb-0':
          appConfig.ui.footer
      }
    ]"
  >
    <router-view>
      <template #default="{ Component, route }">
        <keep-alive :include="cachedViews">
          <component :is="Component" :key="route.fullPath" />
        </keep-alive>
      </template>
    </router-view>
  </section>
  <Footer v-if="appConfig.ui.footer" />
</template>
