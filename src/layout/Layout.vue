<script setup lang="ts">
// import { computed } from 'vue'
// const getCaches = computed((): string[] => {
//   return []
// })
</script>

<template>
  <RouterView>
    <template #default="{ Component, route }">
      <KeepAlive>
        <Component :is="Component" :key="route.fullPath" />
      </KeepAlive>
    </template>
  </RouterView>
</template>
