<template>
  <div class="app__wrap">
    <div class="sidebar__wrap">
      <logo
        v-if="show_logo"
        :collapsed="collapsed"
      />
      <sider /></div>
    <div class="main__wrap">
      <div class="navbar__wrap" />
      <div class="tags__wrap" />
      <div class="main__wrap" />
    </div>
    <!-- <sidebar class="sidebar-wrap" />
    <div :class="{hasTagsView: has_tags}" class="main-wrap">
      <div>
        <navbar />
        <tags-view v-if="has_tags" />
      </div>
      <app-main />
    </div> -->
  </div>
</template>

<script lang="ts">
import { defineComponent, computed } from 'vue'
import { appStore } from '_p/index/store/modules/app'

import AppMain from '../components/AppMain.vue'
import TagsView from '../components/TagsView.vue'
import Logo from '_c/Logo/index.vue'
import Scrollbar from '_c/Scrollbar/index.vue'
import Sider from '_c/Sider/index.vue'
import Navbar from '../components/Navbar.vue'

import config from '_p/index/config'
const { show_logo, has_tags } = config
export default defineComponent({
  name: 'Layout',
  components: {
    Sider,
    Navbar,
    AppMain,
    TagsView,
    Logo,
    Scrollbar
  },
  setup() {
    return {
      show_logo, has_tags
    }
  }
})
</script>

<style lang="less" scoped>
.app-wrap {
  position: relative;
  height: 100%;
  width: 100%;
}
</style>
