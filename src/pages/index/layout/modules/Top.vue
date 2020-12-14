<template>
  <a-layout>
    <a-layout-header :class="'ant-layout-header--' + theme">
      <logo
        v-if="show_logo"
        :theme="theme"
      />
      <silder
        :theme="theme"
        mode="horizontal"
        class="header-silder--wrap"
      />
      <div class="right-menu">
        <screenfull class="right-menu-item hover-effect screenfull-item" />

        <user-info class="right-menu-item hover-effect" />
      </div>
    </a-layout-header>
    <a-layout-content :class="{'layout-content-has-tags':has_tags}">
      <scrollbar class="main-wrap">
        <tags-view :class="{'has-tags':has_tags}" />
        <app-main class="top-module--wrap" />
      </scrollbar>
    </a-layout-content>
  </a-layout>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue'
import Logo from '../components/Logo.vue'
import Silder from '../components/Silder'
import UserInfo from '../components/UserInfo.vue'
import TagsView from '../components/TagsView.vue'
import AppMain from '../components/AppMain.vue'
import Screenfull from '_c/Screenfull/index.vue'
import Scrollbar from '_c/Scrollbar/index.vue'
import config from '_p/index/config'
const { show_logo, has_tags, theme } = config
export default defineComponent({
  name: 'Top',
  components: {
    Logo,
    Silder,
    UserInfo,
    TagsView,
    AppMain,
    Screenfull,
    Scrollbar
  },
  props: {
    theme: {
      type: String as PropType<'light' | 'dark'>,
      default: theme
    }
  },
  setup() {
    return {
      show_logo,
      has_tags
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
      line-height: calc(~"@{topSilderHeight} - 4px");
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
.ant-layout-content {
  margin-top: @topSilderHeight;
  height: calc(~"100vh - @{topSilderHeight}");
  .main-wrap {
    background-color: @contentBg;
  }
}
.layout-content-has-tags {
  margin-top: @topSilderHeight + @tagsViewHeight;
  height: calc(~"100vh - @{topSilderHeight} - @{tagsViewHeight}");
}
.has-tags {
  position: fixed;
  top: @topSilderHeight;
  left: 0;
  width: 100%;
  z-index: 20;
}
</style>
