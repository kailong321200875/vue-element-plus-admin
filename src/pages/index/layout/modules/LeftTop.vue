<template>
  <a-layout>
    <a-layout-header :class="'ant-layout-header--' + silderTheme">
      <logo
        v-if="show_logo"
        :theme="silderTheme"
      />
      <silder
        :theme="silderTheme"
        mode="horizontal"
        class="header-silder--wrap"
      />
      <div class="right-menu">
        <screenfull class="right-menu-item hover-effect screenfull-item" />

        <user-info class="right-menu-item hover-effect" />
      </div>
    </a-layout-header>
    <a-layout class="layout-content">
      <a-layout-sider
        v-model:collapsed="collapsed"
        :trigger="null"
        collapsible
        :class="'ant-layout-sider--' + theme"
        class="sidebar-container-wrap"
      >
        <silder
          :collapsed="collapsed"
          :theme="theme"
          class="left-sider-wrap"
        />
      </a-layout-sider>
      <a-layout>
        <div class="navbar-wrap">
          <hamburger :collapsed="collapsed" class="hamburger-container" @toggleClick="setCollapsed" />
          <breadcrumb class="breadcrumb-container" />
        </div>
        <a-layout-content :class="{'layout-content-has-tags':has_tags}">
          <scrollbar class="main-wrap">
            <tags-view :class="{'has-tags':has_tags, 'has-tags-collapsed': collapsed && has_tags}" />
            <app-main class="classic-module--wrap" />
          </scrollbar>
        </a-layout-content>
      </a-layout>
    </a-layout>
  </a-layout>
</template>

<script lang="ts">
import { defineComponent, PropType, computed } from 'vue'
import Logo from '../components/Logo.vue'
import Silder from '../components/Silder'
import UserInfo from '../components/UserInfo.vue'
import TagsView from '../components/TagsView.vue'
import AppMain from '../components/AppMain.vue'
import Screenfull from '_c/Screenfull/index.vue'
import Scrollbar from '_c/Scrollbar/index.vue'
import Hamburger from '_c/Hamburger/index.vue'
import Breadcrumb from '_c/Breadcrumb/index.vue'
import { appStore } from '_p/index/store/modules/app'
import config from '_p/index/config'
const { show_logo, has_tags, theme } = config
export default defineComponent({
  name: 'LeftTop',
  components: {
    Logo,
    Silder,
    UserInfo,
    TagsView,
    AppMain,
    Screenfull,
    Scrollbar,
    Hamburger,
    Breadcrumb
  },
  props: {
    theme: {
      type: String as PropType<'light' | 'dark'>,
      default: theme
    },
    silderTheme: {
      type: String as PropType<'light' | 'dark'>,
      default: 'light'
    }
  },
  setup() {
    const collapsed = computed(() => appStore.collapsed)
    function setCollapsed(collapsed: boolean): void {
      appStore.SetCollapsed(collapsed)
    }
    return {
      collapsed,
      show_logo,
      has_tags,
      setCollapsed
    }
  }
})
</script>

<style lang="less" scoped>
@{deep}(.ant-layout-header) {
  height: @topSilderHeight;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  position: fixed;
  width: 100%;
  top: 0;
  left: 0;
  z-index: 20;
  &--light {
    background: @menuLightBg;
  }
  &--dark {
    background: @menuBg;
    .screenfull-item,
    .name-item {
      color: #fff;
    }
  }
  .header-silder--wrap {
    flex: 1;
    margin: 0 50px;
    height: 100% !important;
    .ant-menu-horizontal {
      height: @topSilderHeight;
      line-height: @topSilderHeight;
      border-bottom: 0;
    }
    .ant-menu-light {
      height: calc(~"@{topSilderHeight} - 4px");
      line-height: calc(~"@{topSilderHeight} - 2px");
    }
  }
  .right-menu {
    display: flex;
    .screenfull-item {
      line-height: @topSilderHeight;
    }
    .avatar-container {
      margin-right: 0;
    }
  }
}
.ant-layout-sider--light {
  background: @menuLightBg;
}
.ant-layout-sider--dark {
  background: @menuBg;
}
.layout-content {
  margin-top: @topSilderHeight;
  height: calc(~"100vh - @{topSilderHeight}");
  .navbar-wrap {
    background: #fff;
    padding: 0 20px;
    border-top: 1px solid #f0f0f0;
    height: @navbarHeight;
    line-height: @navbarHeight;
    display: flex;
  }
  .layout-content-has-tags {
    margin-top: @tagsViewHeight;
    .mian-wrap {
      background-color: @contentBg;
    }
  }
  .left-sider-wrap {
    height: 100%;
  }
  .has-tags {
    position: fixed;
    top: @topSilderHeight + @navbarHeight;
    left: @menuWidth;
    width: calc(~"100% - @{menuWidth}");
    z-index: 20;
    transition: all 0.2s;
  }
  .has-tags-collapsed {
    left: 80px;
    width: calc(~"100% - 80px");
  }
}
</style>
