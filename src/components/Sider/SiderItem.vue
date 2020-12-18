<template>
  <template v-if="!item.meta?.hidden">
    <template v-if="hasOneShowingChild(item.children, item) && (!onlyOneChild.children || onlyOneChild.noShowingChildren) && !item.meta?.alwaysShow">
      <el-menu-item :index="resolvePath(onlyOneChild.path)" :class="{'submenu-title-noDropdown': !isNest}">
        <item v-if="onlyOneChild.meta" :icon="onlyOneChild.meta.icon || (item.meta && item.meta.icon)" />
        <template #title>
          <span class="anticon-item">{{ onlyOneChild.meta.title }}</span>
        </template>
      </el-menu-item>
    </template>

    <el-submenu
      v-else
      :popper-class="layout !== 'Top'
        ? 'nest-popper-menu'
        : 'top-popper-menu'"
      :index="resolvePath(item.path)"
    >
      <template #title>
        <item v-if="item.meta" :icon="item.meta && item.meta.icon" :title="item.meta.title" />
      </template>
      <sider-item
        v-for="child in item.children"
        :key="child.path"
        :is-nest="true"
        :item="child"
        :layout="layout"
        :base-path="resolvePath(child.path)"
      />
    </el-submenu>
  </template>
</template>

<script lang="ts">
import { defineComponent, PropType, ref } from 'vue'
import type { RouteRecordRaw } from 'vue-router'
import path from 'path'
import { isExternal } from '@/utils/validate'
import Item from './Item.vue'
export default defineComponent({
  name: 'SiderItem',
  components: { Item },
  props: {
    // route object
    item: {
      type: Object as PropType<object>,
      required: true
    },
    isNest: {
      type: Boolean as PropType<boolean>,
      default: false
    },
    basePath: {
      type: String as PropType<string>,
      default: ''
    },
    layout: {
      type: String as PropType<string>,
      default: 'Classic'
    }
  },
  setup(props) {
    const onlyOneChild = ref<any>(null)

    function hasOneShowingChild(children: RouteRecordRaw[] = [], parent: RouteRecordRaw): boolean {
      const showingChildren: RouteRecordRaw[] = children.filter((item: RouteRecordRaw) => {
        if (item.meta && item.meta.hidden) {
          return false
        } else {
          // Temp set(will be used if only has one showing child)
          onlyOneChild.value = item
          return true
        }
      })

      // When there is only one child router, the child router is displayed by default
      if (showingChildren.length === 1) {
        return true
      }

      // Show parent if there are no child router to display
      if (showingChildren.length === 0) {
        onlyOneChild.value = { ...parent, path: '', noShowingChildren: true }
        return true
      }

      return false
    }

    function resolvePath(routePath: string): string {
      if (isExternal(routePath)) {
        return routePath
      }
      return path.resolve(props.basePath, routePath)
    }
    return {
      onlyOneChild,
      hasOneShowingChild,
      resolvePath
    }
  }
})
</script>

<style>
</style>
