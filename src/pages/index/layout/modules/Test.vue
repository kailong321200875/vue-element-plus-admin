<template>
  <el-container class="app__wrap">
    <div class="sidebar__wrap" :class="{'sidebar__wrap--collapsed': collapsed}">
      <logo
        v-if="showLogo"
        :collapsed="collapsed"
      />
      <sider />
    </div>
    <el-main><hamburger :collapsed="collapsed" class="hamburger-container" @toggleClick="setCollapsed" /></el-main>
  </el-container>
  <!-- <div class="app__wrap">
    <div class="sidebar__wrap" :class="{'sidebar__wrap--collapsed': collapsed}">
      <logo
        v-if="showLogo"
        :collapsed="collapsed"
      />
      <sider />
    </div>
    <div class="main__wrap">
      <div class="navbar__wrap">
      </div>
      <div class="tags__wrap" />
      <div class="main__wrap" />
    </div>
  </div> -->
</template>

<script lang="ts">
import { defineComponent, computed } from 'vue'
import { appStore } from '_p/index/store/modules/app'

import AppMain from '../components/AppMain.vue'
import TagsView from '../components/TagsView.vue'
import Logo from '_c/Logo/index.vue'
import Scrollbar from '_c/Scrollbar/index.vue'
import Sider from '_c/Sider/index.vue'
import Hamburger from '_c/Hamburger/index.vue'
export default defineComponent({
  name: 'Layout',
  components: {
    Sider,
    Hamburger,
    // Navbar,
    AppMain,
    TagsView,
    Logo,
    Scrollbar
  },
  setup() {
    const collapsed = computed(() => appStore.collapsed)
    const showLogo = computed(() => appStore.showLogo)
    const showTags = computed(() => appStore.showTags)

    function setCollapsed(collapsed: boolean): void {
      appStore.SetCollapsed(collapsed)
    }

    return {
      collapsed,
      showLogo,
      showTags,
      setCollapsed
    }
  }
})
</script>

<style lang="less" scoped>
.app__wrap {
  position: relative;
  height: 100%;
  width: 100%;
  // .sidebar__wrap {
  //   position: absolute;
  //   width: @menuWidth;
  //   top: 0;
  //   left: 0;
  //   height: 100%;
  //   transition: all 0.2s;
  // }
  // .sidebar__wrap--collapsed {
  //   width: @menuMinWidth;

  // }
  // .main__wrap {
  //   position: absolute;
  //   width: calc(~"100% - @{menuWidth}");
  //   height: 100%;
  //   top: 0;
  //   left: @menuWidth;
  //   .navbar__wrap {
  //     height: @navbarHeight;
  //   }
  // }
}
</style>
