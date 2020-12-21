<template>
  <div :class="classObj" class="app__wrap">
    <!-- Classic -->
    <div
      class="sidebar__wrap"
      :class="{'sidebar__wrap--collapsed': collapsed}"
    >
      <logo
        v-if="showLogo && layout === 'Classic'"
        :collapsed="collapsed"
      />
      <sider :layout="layout" mode="vertical" />
    </div>
    <!-- Classic -->

    <!-- Top -->
    <div v-if="layout !== 'Classic'" class="sidebar__wrap--Top">
      <div>
        <logo
          v-if="showLogo"
          :collapsed="collapsed"
        />
      </div>
      <div v-if="layout === 'Top'" class="sidebar__item--Top">
        <sider :layout="layout" mode="horizontal" />
      </div>
      <div>
        <div v-if="showScreenfull || showUserInfo" class="navbar__wrap--right">
          <screenfull v-if="showScreenfull" class="hover-container screenfull-container" />
          <user-info v-if="showUserInfo" class="hover-container user-container" />
        </div>
      </div>
    </div>
    <!-- Top -->

    <div
      class="main__wrap"
      :class="{
        'main__wrap--collapsed': collapsed
      }"
    >
      <el-scrollbar
        class="main__wrap--content"
        :class="{
          'main__wrap--fixed--all': fixedHeader && showNavbar && showTags,
          'main__wrap--fixed--nav': fixedHeader && showNavbar && !showTags,
          'main__wrap--fixed--tags': fixedHeader && !showNavbar && showTags
        }"
      >
        <div
          class="header__wrap"
          :class="{
            'header__wrap--fixed': fixedHeader,
            'header__wrap--collapsed': fixedHeader && collapsed
          }"
        >
          <div
            v-if="showNavbar && layout !== 'Top'"
            class="navbar__wrap"
          >
            <hamburger
              v-if="showHamburger"
              :collapsed="collapsed"
              class="hover-container"
              @toggleClick="setCollapsed"
            />
            <breadcrumb v-if="showBreadcrumb" />
            <!-- <div v-if="showScreenfull || showUserInfo" class="navbar__wrap--right">
              <screenfull v-if="showScreenfull" class="hover-container screenfull-container" />
              <user-info v-if="showUserInfo" class="hover-container user-container" />
            </div> -->
          </div>
          <div
            v-if="showTags"
            class="tags__wrap"
          >
            <tags-view />
          </div>
        </div>
        <app-main />
      </el-scrollbar>
    </div>

    <!-- setting -->
    <setting />
    <!-- setting -->
  </div>
</template>

<script lang="ts">
import { defineComponent, computed } from 'vue'
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
  name: 'LeftTop',
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
    const layout = computed(() => appStore.layout)
    const collapsed = computed(() => appStore.collapsed)
    const showLogo = computed(() => appStore.showLogo)
    const showTags = computed(() => appStore.showTags)
    const showBreadcrumb = computed(() => appStore.showBreadcrumb)
    const showHamburger = computed(() => appStore.showHamburger)
    const showScreenfull = computed(() => appStore.showScreenfull)
    const showUserInfo = computed(() => appStore.showUserInfo)
    const showNavbar = computed(() => appStore.showNavbar)
    // const fixedNavbar = computed(() => appStore.fixedNavbar)
    // const fixedTags = computed(() => appStore.fixedTags)
    const fixedHeader = computed(() => appStore.fixedHeader)

    const classObj = computed(() => {
      const obj = {}
      obj[`app__wrap--${layout.value}`] = true
      return obj
    })

    function setCollapsed(collapsed: boolean): void {
      appStore.SetCollapsed(collapsed)
    }

    return {
      classObj,
      layout,
      collapsed,
      showLogo,
      showTags,
      showBreadcrumb,
      showHamburger,
      showScreenfull,
      showUserInfo,
      showNavbar,
      fixedHeader,
      // fixedNavbar,
      // fixedTags,
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
    .header__wrap {
      transition: all 0.2s;
      .navbar__wrap {
        display: flex;
        align-items: center;
        height: @navbarHeight;
        padding: 0 20px 0 15px;
        position: relative;
        background: @contentBg;
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
          text-align: center;
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
    }

    // content样式
    .main__wrap--content {
      height: 100%;
      @{deep}(.el-scrollbar__wrap) {
        overflow-x: hidden;
      }
    }
    // content样式
  }
  .main__wrap--collapsed {
    width: calc(~"100% - @{menuMinWidth}");
    left: @menuMinWidth;
  }
}

// LeftTop模式
.app__wrap--LeftTop {
  .main__wrap--fixed--all {
    margin-top: @navbarHeight + @tagsViewHeight !important;
    height: calc(~"100% - @{navbarHeight} - @{tagsViewHeight}") !important;
  }
  .main__wrap--fixed--nav {
    margin-top: @navbarHeight !important;
    height: calc(~"100% - @{navbarHeight}") !important;
  }
  .main__wrap--fixed--tags {
    margin-top: @tagsViewHeight !important;
    height: calc(~"100% - @{tagsViewHeight}") !important;
  }
  .header__wrap--fixed {
    position: fixed !important;
    width: calc(~"100% - @{menuWidth}") !important;
    top: @topSiderHeight !important;
    left: @menuWidth !important;
    z-index: 200;
  }
  .header__wrap--collapsed {
    width: calc(~"100% - @{menuMinWidth}") !important;
    left: @menuMinWidth !important;
  }
}

// 顶部模式
.app__wrap--LeftTop {
  .sidebar__wrap--Top {
    height: @topSiderHeight;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    padding: 0 20px;
    background-color: @topMenuBg;
    position: relative;
    &:after {
      content: "";
      width: 100%;
      height: 1px;
      border-top: 1px solid #d8dce5;
      position: absolute;
      bottom: 0;
      left: 0;
    }
    .sidebar__item--Top {
      flex: 1;
      margin: 0 50px;
    }
    .navbar__wrap--right {
      display: flex;
      align-items: center;
      height: @topSiderHeight;
      @{deep}(.hover-container) {
        transition: background 0.2s;
        height: 100%;
        line-height: @topSiderHeight;
        padding: 0 5px;
        text-align: center;
        &:hover {
          background: #f6f6f6;
        }
      }
    }
  }
}

.app__wrap--LeftTop {
  .sidebar__wrap {
    top: @topSiderHeight;
    left: 0;
    height: calc(~"100% - @{topSiderHeight}");
  }
  .main__wrap {
    width: calc(~"100% - @{menuWidth}");
    left: @menuWidth;
    height: calc(~"100% - @{topSiderHeight}");
    top: @topSiderHeight;
  }
  .main__wrap--collapsed {
    width: calc(~"100% - @{menuMinWidth}");
    left: @menuMinWidth;
  }
}
</style>
