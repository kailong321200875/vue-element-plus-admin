<template>
  <div :class="{'has-logo':show_logo}">
    <el-scrollbar wrap-class="scrollbar-wrapper">
      <el-menu
        :default-active="activeMenu"
        :collapse="collapsed"
        :unique-opened="false"
        mode="vertical"
      >
        <sider-item
          v-for="route in routers"
          :key="route.path"
          :item="route"
          :base-path="route.path"
        />
      </el-menu>
    </el-scrollbar>
  </div>
</template>

<script lang="ts">
import { defineComponent, computed } from 'vue'
import { useRouter } from 'vue-router'
import { permissionStore } from '_p/index/store/modules/permission'
import { appStore } from '_p/index/store/modules/app'
import type { RouteRecordRaw, RouteLocationNormalizedLoaded } from 'vue-router'
import SiderItem from './SiderItem.vue'
// import variables from '@/styles/variables.less'
import config from '_p/index/config'
const { show_logo } = config

export default defineComponent({
  components: { SiderItem },
  setup() {
    const { currentRoute, push } = useRouter()
    const routers = computed((): RouteRecordRaw[] => {
      return permissionStore.routers
    })
    const activeMenu = computed(() => {
      const { meta, path } = currentRoute.value
      // if set path, the sidebar will highlight the path you set
      if (meta.activeMenu) {
        return meta.activeMenu
      }
      return path
    })
    const collapsed = computed(() => appStore.collapsed)

    return {
      routers,
      activeMenu,
      collapsed,
      show_logo
    }
  }
})
</script>

<style lang="less" scoped>
.sidebar-container {
  height: 100%;
}
.has-logo {
  height: calc(~"100% - @{topSilderHeight}");
}
.menu-wrap {
  height: 100%;
  overflow: hidden;
}
</style>
