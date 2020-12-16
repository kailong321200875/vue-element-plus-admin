<template>
  <div :class="classObj" class="app__wrap">
    <div class="sidebar__wrap" :class="{'sidebar__wrap--collapsed': collapsed}">
      <logo
        v-if="showLogo"
        :collapsed="collapsed"
      />
      <sider />
    </div>
    <div
      class="main__wrap"
      :class="{
        'main__wrap--collapsed': collapsed
      }"
    >
      <el-scrollbar
        class="main__wrap--content"
        :class="{
          'main__wrap--navFixed': fixedNavbar
        }"
      >
        <div
          v-if="showNavbar"
          class="navbar__wrap"
          :class="{
            'navbar__wrap--fixed': fixedNavbar,
            'navbar__wrap--collapsed': fixedNavbar && collapsed
          }"
        >
          <hamburger
            v-if="showHamburger"
            :collapsed="collapsed"
            class="hover-container"
            @toggleClick="setCollapsed"
          />
          <breadcrumb v-if="showBreadcrumb" />
          <div v-if="showScreenfull || showUserInfo" class="navbar__wrap--right">
            <screenfull v-if="showScreenfull" class="hover-container screenfull-container" />
            <user-info v-if="showUserInfo" class="hover-container user-container" />
          </div>
        </div>
        <div v-if="showTags" class="tags__wrap">
          <tags-view />
        </div>
        <app-main />
      </el-scrollbar>
    </div>

    <!-- setting -->
    <div class="setting__wrap" @click="toggleClick">
      <i class="el-icon-setting" />
    </div>
    <el-drawer
      v-model="drawer"
      direction="rtl"
      size="20%"
    >
      <template #title>
        <div class="setting__title">项目配置</div>
      </template>
      <setting />
    </el-drawer>
    <!-- setting -->
  </div>
</template>

<script lang="ts">
import { defineComponent, computed, ref } from 'vue'
import { appStore } from '_p/index/store/modules/app'

import AppMain from '../components/AppMain.vue'
import TagsView from '_c/TagsView/index.vue'
import Logo from '_c/Logo/index.vue'
import Sider from '_c/Sider/index.vue'
import Hamburger from '_c/Hamburger/index.vue'
import Breadcrumb from '_c/Breadcrumb/index.vue'
import Screenfull from '_c/Screenfull/index.vue'
import UserInfo from '_c/UserInfo/index.vue'

import Setting from '_c/Setting/index.vue'
export default defineComponent({
  name: 'Layout',
  components: {
    Sider,
    Hamburger,
    Breadcrumb,
    Screenfull,
    UserInfo,
    AppMain,
    TagsView,
    Logo,
    Setting
  },
  setup() {
    const drawer = ref<boolean>(false)
    const collapsed = computed(() => appStore.collapsed)
    const showLogo = computed(() => appStore.showLogo)
    const showTags = computed(() => appStore.showTags)
    const showBreadcrumb = computed(() => appStore.showBreadcrumb)
    const showHamburger = computed(() => appStore.showHamburger)
    const showScreenfull = computed(() => appStore.showScreenfull)
    const showUserInfo = computed(() => appStore.showUserInfo)
    const showNavbar = computed(() => appStore.showNavbar)
    const fixedNavbar = computed(() => appStore.fixedNavbar)

    const classObj = computed(() => {
      const obj = {}
      obj[`app__wrap--${appStore.layout}`] = true
      return obj
    })

    function setCollapsed(collapsed: boolean): void {
      appStore.SetCollapsed(collapsed)
    }

    function toggleClick(): void {
      drawer.value = !drawer.value
    }

    return {
      drawer,
      classObj,
      collapsed,
      showLogo,
      showTags,
      showBreadcrumb,
      showHamburger,
      showScreenfull,
      showUserInfo,
      showNavbar,
      fixedNavbar,
      setCollapsed,
      toggleClick
    }
  }
})
</script>

<style lang="less" scoped>
.app__wrap--Classic {
  position: relative;
  height: 100%;
  width: 100%;
  .sidebar__wrap {
    position: fixed;
    width: @menuWidth;
    top: 0;
    left: 0;
    height: 100%;
    transition: width 0.2s;
  }
  .sidebar__wrap--collapsed {
    width: @menuMinWidth;
    @{deep}(.anticon-item) {
      display: none;
    }
  }
  .main__wrap {
    position: absolute;
    width: calc(~"100% - @{menuWidth}");
    height: 100%;
    top: 0;
    left: @menuWidth;
    transition: all 0.2s;
    z-index: 1;
    .navbar__wrap {
      display: flex;
      align-items: center;
      height: @navbarHeight;
      padding: 0 20px 0 15px;
      position: relative;
      background: @contentBg;
      transition: all 0.2s;
      &:after {
        content: "";
        width: 100%;
        height: 1px;
        border-top: 1px solid #d8dce5;
        position: absolute;
        bottom: 0;
        left: 0;
      }
      @{deep}(.hover-container) {
        transition: background 0.2s;
        height: 100%;
        line-height: @navbarHeight + 5px;
        padding: 0 5px;
        &:hover {
          background: #f6f6f6;
        }
      }
      .navbar__wrap--right {
        display: flex;
        align-items: center;
        height: @navbarHeight;
        position: absolute;
        top: 0;
        right: 20px;
        @{deep}(.screenfull-container),
        @{deep}(.user-container) {
          line-height: @navbarHeight !important;
        }
      }
    }
    // 固定顶部操作栏
    .navbar__wrap--fixed {
      position: fixed;
      width: calc(~"100% - @{menuWidth} - 35px");
      top: 0;
      left: @menuWidth;
      z-index: 200;
    }
    .navbar__wrap--collapsed {
      width: calc(~"100% - @{menuMinWidth} - 35px");
      left: @menuMinWidth;
    }
    // 固定顶部操作栏

    // content样式
    .main__wrap--content {
      height: 100%;
      @{deep}(.el-scrollbar__wrap) {
        overflow-x: hidden;
      }
    }
    .main__wrap--navFixed {
      padding-top: @navbarHeight;
      height: calc(~"100% - @{navbarHeight}");
    }
    // content样式
  }
  .main__wrap--collapsed {
    width: calc(~"100% - @{menuMinWidth}");
    left: @menuMinWidth;
  }
}

// 项目配置
.setting__wrap {
  position: fixed;
  top: 45%;
  right: 0;
  z-index: 10;
  display: flex;
  padding: 10px;
  color: #fff;
  cursor: pointer;
  background: #018ffb;
  border-radius: 6px 0 0 6px;
  justify-content: center;
  align-items: center;
}
.setting__title {
  font-weight: bold;
  color: black;
}
// 项目配置
</style>
