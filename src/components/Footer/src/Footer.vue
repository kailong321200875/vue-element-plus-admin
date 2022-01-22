<script setup lang="ts">
import { useAppStore } from '@/store/modules/app'
import { computed } from 'vue'

const appStore = useAppStore()

const title = computed(() => appStore.getTitle)
</script>

<template>
  <div class="text-center text-[var(--el-text-color-placeholder)]">Copyright ©2021 {{ title }}</div>
</template>
