<template>
  <Breadcrumb class="app-breadcrumb">
    <transition-group name="breadcrumb">
      <BreadcrumbItem
        v-for="(item,index) in levelList"
        :key="item.path"
      >
        <svg-icon v-if="item.meta.icon" :icon-class="item.meta.icon" class="icon-breadcrumb" />
        <span v-if="item.redirect==='noredirect'||index==levelList.length-1" class="no-redirect">
          {{ item.meta.title }}
        </span>
        <a v-else @click.prevent="handleLink(item)">
          {{ item.meta.title }}
        </a>
      </BreadcrumbItem>
    </transition-group>
  </Breadcrumb>
</template>

<script lang="ts">
import { ref, defineComponent, watch } from 'vue'
import type { RouteRecordRaw, RouteLocationMatched, RouteLocationNormalizedLoaded } from 'vue-router'
import { useRouter } from 'vue-router'
import { compile } from 'path-to-regexp'
import Breadcrumb from './Breadcrumb.vue'
import BreadcrumbItem from './BreadcrumbItem.vue'
export default defineComponent({
  name: 'BreadcrumbWrap',
  components: {
    Breadcrumb,
    BreadcrumbItem
  },
  setup() {
    const { currentRoute, push } = useRouter()

    const levelList = ref<RouteRecordRaw[]>([])

    function getBreadcrumb() {
      let matched: any[] = currentRoute.value.matched.filter((item: RouteLocationMatched) => item.meta && item.meta.title)
      const first = matched[0]

      if (!isDashboard(first)) {
        matched = [{ path: '/dashboard', meta: { title: '首页', icon: 'dashboard' }}].concat(matched)
      }

      levelList.value = matched.filter((item: RouteLocationMatched) => item.meta && item.meta.title && item.meta.breadcrumb !== false)
    }

    function isDashboard(route: RouteLocationMatched) {
      const name = route && route.name
      if (!name) {
        return false
      }
      return (name as any).trim().toLocaleLowerCase() === 'Dashboard'.toLocaleLowerCase()
    }

    function pathCompile(path: string): string {
      const { params } = currentRoute.value
      const toPath = compile(path)
      return toPath(params)
    }

    function handleLink(item: RouteRecordRaw): void {
      const { redirect, path } = item
      if (redirect) {
        push(redirect as string)
        return
      }
      push(pathCompile(path))
    }

    watch(
      () => currentRoute.value,
      (route: RouteLocationNormalizedLoaded) => {
        if (route.path.startsWith('/redirect/')) {
          return
        }
        getBreadcrumb()
      },
      {
        immediate: true
      }
    )

    return {
      levelList,
      handleLink
    }
  }
})
</script>

<style lang="less" scoped>
.app-breadcrumb {
  display: inline-block;
  font-size: 14px;
  margin-left: 10px;
  .no-redirect {
    color: #97a8be;
    cursor: text;
  }
  .icon-breadcrumb {
    color: #97a8be;
    margin-right: 8px;
  }
}
</style>
