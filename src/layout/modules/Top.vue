<template>
  <div :class="classObj" class="app__wrap">
    <!-- Top -->
    <div class="sidebar__wrap--Top">
      <div>
        <logo v-if="showLogo" :collapsed="collapsed" />
      </div>
      <div
        id="sidebar__wrap"
        class="sidebar__item--Top"
        :style="{
          marginRight: marginRight + 'px'
        }"
      >
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
          <div v-if="showTags" id="tag-container" class="tags__wrap">
            <tags-view />
          </div>
        </div>
        <app-main />
      </el-scrollbar>
    </div>

    <!-- setting -->
    <setting />
    <!-- setting -->

    <backtop v-if="showBackTop" />
  </div>
</template>

<script setup lang="ts" name="Top">
import { computed, ref, onMounted } from 'vue'
import { useAppStore } from '@/store/modules/app'
const appStore = useAppStore()

import AppMain from '../components/AppMain/index.vue'
import TagsView from '../components/TagsView/index.vue'
import Logo from '../components/Logo/index.vue'
import Sider from '../components/Sider/index.vue'
import Screenfull from '../components/Screenfull/index.vue'
import UserInfo from '../components/UserInfo/index.vue'
import Setting from '../components/Setting/index.vue'
import Backtop from '../components/Backtop/index.vue'

const marginRight = ref<number>(0)
const layout = computed(() => appStore.getLayout)
const collapsed = computed(() => appStore.getCollapsed)
const showLogo = computed(() => appStore.getShowLogo)
const showTags = computed(() => appStore.getShowTags)
const showScreenfull = computed(() => appStore.getShowScreenfull)
const showUserInfo = computed(() => appStore.getShowUserInfo)
const showNavbar = computed(() => appStore.getShowNavbar)
const fixedHeader = computed(() => appStore.getFixedHeader)
const showBackTop = computed(() => appStore.getShowBackTop)

const classObj = computed(() => {
  const obj = {}
  obj[`app__wrap--${layout.value}`] = true
  return obj
})

function setSidebarStyle() {
  const sidebar = document.getElementsByClassName('navbar__wrap--right')[0]
  marginRight.value = sidebar.clientWidth
}

onMounted(() => {
  setSidebarStyle()
})
</script>

<style lang="less" scoped>
@import './style.less';
</style>
