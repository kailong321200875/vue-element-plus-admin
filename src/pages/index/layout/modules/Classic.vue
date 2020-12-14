<template>
  <a-layout class="app-wrapper">
    <a-layout-sider
      v-model:collapsed="collapsed"
      :trigger="null"
      collapsible
      :class="'ant-layout-sider--' + theme"
      class="sidebar-container-wrap"
    >
      <logo
        v-if="show_logo"
        :collapsed="collapsed"
        :theme="theme"
      />
      <silder
        :collapsed="collapsed"
        :theme="theme"
      />
    </a-layout-sider>
    <a-layout>
      <a-layout-header :class="{'ant-layout-header-collapsed': collapsed}">
        <navbar />
      </a-layout-header>
      <a-layout-content :class="{'layout-content-has-tags':has_tags}">
        <scrollbar class="main-wrap">
          <tags-view :class="{'has-tags':has_tags, 'has-tags-collapsed': collapsed && has_tags}" />
          <app-main class="classic-module--wrap" />
        </scrollbar>
      </a-layout-content>
    </a-layout>
  </a-layout>
</template>

<script lang="ts">
import { defineComponent, computed, PropType } from 'vue'
import { appStore } from '_p/index/store/modules/app'
import Silder from '../components/Silder'
import Navbar from '../components/Navbar.vue'
import AppMain from '../components/AppMain.vue'
import TagsView from '../components/TagsView.vue'
import Logo from '../components/Logo.vue'
import Scrollbar from '_c/Scrollbar/index.vue'
import config from '_p/index/config'
const { show_logo, has_tags, theme } = config
export default defineComponent({
  name: 'Classic',
  components: {
    Silder,
    Navbar,
    AppMain,
    TagsView,
    Logo,
    Scrollbar
  },
  props: {
    theme: {
      type: String as PropType<'light' | 'dark'>,
      default: theme
    }
  },
  setup() {
    const collapsed = computed(() => appStore.collapsed)

    return {
      collapsed,
      show_logo,
      has_tags
    }
  }
})
</script>

<style lang="less" scoped>
@{deep}(.ant-layout-header) {
  line-height: @navbarHeight;
  height: @navbarHeight;
  position: fixed;
  top: 0;
  left: @menuWidth;
  width: calc(~"100% - @{menuWidth}");
  padding: 0;
  background: #fff;
  transition: all 0.2s;
}
.ant-layout-sider--light {
  background: @menuLightBg;
}
.ant-layout-sider--dark {
  background: @menuBg;
}
.ant-layout-content {
  margin-top: @navbarHeight;
  .mian-wrap {
    background-color: @contentBg;
  }
}
.layout-content-has-tags {
  margin-top: @navbarHeight + @tagsViewHeight;
}
.has-tags {
  position: fixed;
  top: @navbarHeight;
  left: @menuWidth;
  width: calc(~"100% - @{menuWidth}");
  transition: all 0.2s;
}
.ant-layout-header-collapsed,
.has-tags-collapsed {
  left: 80px;
  width: calc(~"100% - 80px");
}
</style>
