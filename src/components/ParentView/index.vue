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
<script setup lang="ts" name="ParentView">
import { useCache } from './useCache'

const { getCaches } = useCache(false)
</script>
