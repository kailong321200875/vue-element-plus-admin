<template>
  <div :class="{'has-logo': showLogo}" class="sidebar-container">
    <el-scrollbar>
      <el-menu
        :default-active="activeMenu"
        :collapse="collapsed"
        :unique-opened="false"
        mode="vertical"
        @select="selectMenu"
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
import variables from '@/styles/variables.less'
import { isExternal } from '@/utils/validate'

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
    const showLogo = computed(() => appStore.showLogo)

    function selectMenu(path: string) {
      if (isExternal(path)) {
        window.open(path)
      } else {
        push(path)
      }
    }

    return {
      routers,
      activeMenu,
      collapsed,
      showLogo,
      variables,
      selectMenu
    }
  }
})
</script>

<style lang="less" scoped>
.sidebar-container {
  height: 100%;
  @{deep}(.svg-icon) {
    margin-right: 16px;
  }
}
.has-logo {
  height: calc(~"100% - @{topSilderHeight}");
}
@{deep}(.el-scrollbar) {
  width: 100%;
  height: 100%;
  .el-scrollbar__wrap {
    overflow: scroll;
    overflow-x: hidden;
    .el-menu {
      width: 100%;
      border: none;
    }
  }
}
</style>
