<template>
  <section class="app-main">
    <router-view v-slot="{ Component, route }">
      <transition name="fade" mode="out-in" appear>
        <keep-alive :include="getCaches">
          <component :is="Component" :key="route.fullPath" />
        </keep-alive>
      </transition>
    </router-view>
  </section>
</template>

<script setup lang="ts" name="AppMain">
import { useCache } from '_c/ParentView/useCache'
const { getCaches } = useCache(true)
</script>

<style lang="less" scoped>
.app-main {
  padding: 20px;
}
</style>
