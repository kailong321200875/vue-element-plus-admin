<template>
  <el-tabs
    v-model="activeName"
    :tab-position="tabPosition"
    @tab-click="changeTab"
  >
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

<script lang="ts">
import { defineComponent, ref, watch, onMounted, computed } from 'vue'
import { appStore } from '_@/store/modules/app'
import { permissionStore } from '_@/store/modules/permission'
import type { RouteRecordRaw } from 'vue-router'
import { useRouter } from 'vue-router'
import { findIndex } from '@/utils'
import { isExternal } from '@/utils/validate'

export default defineComponent({
  name: 'MenuTab',
  setup() {
    const { currentRoute, push } = useRouter()

    const activeName = ref<string>('')

    const routers = computed((): RouteRecordRaw[] => permissionStore.routers)
    const tabRouters = computed((): RouteRecordRaw[] => routers.value.filter(v => !v.meta?.hidden))

    const layout = computed(() => appStore.layout)
    const tabPosition = computed(() => layout.value === 'Classic' ? 'left' : 'top')

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
        permissionStore.SetAcitveTab(activeName.value)
      }
    }

    function filterTab(item: RouteRecordRaw | any, key: string): any {
      return item.meta && item.meta[key] ? item.meta[key] : item.children[0].meta[key]
    }

    function setActive(index: number): void {
      const currRoute: any = tabRouters.value[index]
      permissionStore.SetMenuTabRouters(currRoute.children)
    }

    function changeTab(item: any) {
      const currRoute: any = tabRouters.value[item.index]
      permissionStore.SetMenuTabRouters(currRoute.children)
      if (isExternal(currRoute.children[0].path)) {
        window.open(currRoute.children[0].path)
      } else {
        push(`${activeName.value === '/dashboard' ? '' : activeName.value}/${currRoute.children[0].path}`)
        permissionStore.SetAcitveTab(activeName.value)
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
        permissionStore.SetAcitveTab(val)
      }
    )

    return {
      activeName,
      tabRouters,
      tabPosition,
      filterTab,
      setActive,
      changeTab
    }
  }
})
</script>

<style lang="less" scoped>
.label-item {
  height: 100%;
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  align-items: center;
  &>div {
    width: 100%;
  }
  .title-item {
    position: relative;
    top: -5px;
  }
}
</style>
