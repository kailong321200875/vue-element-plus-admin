<template>
  <template v-if="!siderItem.meta?.hidden">
    <template
      v-if="
        hasOneShowingChild(siderItem.children, siderItem) &&
        (!onlyOneChild.children || onlyOneChild.noShowingChildren) &&
        !siderItem.meta?.alwaysShow
      "
    >
      <el-menu-item
        :index="
          resolvePath(
            onlyOneChild.path,
            showMenuTab ? `${activeTab === '/dashboard' ? '' : activeTab}/${basePath}` : ''
          )
        "
        :class="{ 'submenu-title-noDropdown': !isNest }"
      >
        <item v-if="onlyOneChild.meta" :icon="onlyOneChild?.meta?.icon || siderItem?.meta?.icon" />
        <template #title>
          <span class="anticon-item">{{ onlyOneChild.meta.title }}</span>
        </template>
      </el-menu-item>
    </template>

    <el-sub-menu
      v-else
      :popper-class="layout !== 'Top' ? 'nest-popper-menu' : 'top-popper-menu'"
      :index="
        resolvePath(
          siderItem.path,
          showMenuTab ? `${activeTab === '/dashboard' ? '' : activeTab}/${basePath}` : ''
        )
      "
    >
      <template #title>
        <item v-if="siderItem.meta" :icon="siderItem?.meta?.icon" :title="siderItem.meta.title" />
      </template>
      <sider-item-com
        v-for="child in siderItem.children"
        :key="child.path"
        :is-nest="true"
        :item="child"
        :layout="layout"
        :base-path="resolvePath(child.path)"
      />
    </el-sub-menu>
  </template>
</template>

<script setup lang="ts" name="SiderItemCom">
import { PropType, ref, computed } from 'vue'
import type { RouteRecordRaw } from 'vue-router'
import { isExternal } from '@/utils/validate'
import Item from './Item.vue'
import { usePermissionStore } from '@/store/modules/permission'
const permissionStore = usePermissionStore()
import { useAppStore } from '@/store/modules/app'
const appStore = useAppStore()

const props = defineProps({
  // route object
  item: {
    type: Object as PropType<any>,
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
})
const onlyOneChild = ref<any>(null)

const activeTab = computed(() => permissionStore.getActiveTab)
const showMenuTab = computed(() => appStore.getShowMenuTab)
const siderItem: any = computed(() => props.item)

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

function resolvePath(routePath: string, otherPath?: string): string {
  if (isExternal(routePath)) {
    return routePath
  }
  return (
    ((otherPath || props.basePath) === '/' ? '' : otherPath || props.basePath) +
    (routePath ? '/' + routePath : '')
  )
}
</script>

<style></style>
