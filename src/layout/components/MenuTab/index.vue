<template>
  <el-tabs v-model="activeName" :tab-position="tabPosition" @tab-click="changeTab">
    <el-tab-pane
      v-for="(item, $index) in tabRouters"
      :key="$index"
      :name="item.path === '/' ? '/dashboard' : item.path"
    >
      <template #label>
        <div class="label-item">
          <svg-icon :icon-class="filterTab(item, 'icon')" />
          <div class="title-item">{{ filterTab(item, 'title') }}</div>
        </div>
      </template>
    </el-tab-pane>
  </el-tabs>
</template>

<script setup lang="ts" name="MenuTab">
import { ref, watch, onMounted, computed } from 'vue'
import { useAppStore } from '@/store/modules/app'
const appStore = useAppStore()
import { usePermissionStore } from '@/store/modules/permission'
const permissionStore = usePermissionStore()
import type { RouteRecordRaw } from 'vue-router'
import { useRouter } from 'vue-router'
import { findIndex } from '@/utils'
import { isExternal } from '@/utils/validate'

const { currentRoute, push } = useRouter()

const activeName = ref<string>('')

const routers = computed(() => permissionStore.getRouters)
const tabRouters = computed(() => routers.value.filter((v) => !v.meta?.hidden))

const layout = computed(() => appStore.layout)
const tabPosition = computed(() => (layout.value === 'Classic' ? 'left' : 'top'))

function init() {
  const currentPath = currentRoute.value.fullPath.split('/')
  const index = findIndex(tabRouters.value, (v: RouteRecordRaw) => {
    if (v.path === '/') {
      return `/${currentPath[1]}` === '/dashboard'
    } else {
      return v.path === `/${currentPath[1]}`
    }
  })
  if (index > -1) {
    activeName.value = `/${currentPath[1]}`
    setActive(index)
    permissionStore.setAcitveTab(activeName.value)
  }
}

function filterTab(item: RouteRecordRaw | any, key: string): any {
  return item.meta && item.meta[key] ? item.meta[key] : item.children[0].meta[key]
}

function setActive(index: number): void {
  const currRoute: any = tabRouters.value[index]
  permissionStore.setMenuTabRouters(currRoute.children)
}

function changeTab(item: any) {
  const currRoute: any = tabRouters.value[item.index]
  permissionStore.setMenuTabRouters(currRoute.children)
  if (isExternal(currRoute.children[0].path)) {
    window.open(currRoute.children[0].path)
  } else {
    push(
      `${activeName.value === '/dashboard' ? '' : activeName.value}/${currRoute.children[0].path}`
    )
    permissionStore.setAcitveTab(activeName.value)
  }
}

onMounted(() => {
  init()
})

watch(
  () => currentRoute.value,
  () => {
    init()
  }
)

watch(
  () => activeName.value,
  (val) => {
    permissionStore.setAcitveTab(val)
  }
)
</script>

<style lang="less" scoped>
.label-item {
  display: flex;
  height: 100%;
  justify-content: center;
  flex-wrap: wrap;
  align-items: center;

  & > div {
    width: 100%;
  }

  .title-item {
    position: relative;
    top: -5px;
  }
}
</style>
