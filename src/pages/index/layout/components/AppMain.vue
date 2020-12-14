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

<script lang="ts">
import { defineComponent } from 'vue'
import { useCache } from '_c/ParentView/useCache'
export default defineComponent({
  name: 'AppMain',
  setup() {
    const { getCaches } = useCache(true)
    return {
      getCaches
    }
  }
})
</script>

<style lang="less" scoped>
.app-main {
  overflow: hidden;
  padding: 20px;
}
</style>
