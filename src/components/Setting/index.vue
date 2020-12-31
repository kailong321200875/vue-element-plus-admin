<template>
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
    <div class="setting__content">
      <div class="setting__title">导航栏布局</div>
      <div class="icon__wrap">
        <span :class="{'icon--active': layout==='Classic'}" @click="setLayout('Classic')">
          <el-tooltip effect="dark" content="经典布局" placement="bottom">
            <svg-icon icon-class="layout-classic" class="setting-svg-icon" />
          </el-tooltip>
        </span>
        <span :class="{'icon--active': layout==='LeftTop'}" @click="setLayout('LeftTop')">
          <el-tooltip effect="dark" content="左侧顶部布局" placement="bottom">
            <svg-icon icon-class="layout-topLeft" class="setting-svg-icon" />
          </el-tooltip>
        </span>
        <span :class="{'icon--active': layout==='Top'}" @click="setLayout('Top')">
          <el-tooltip effect="dark" content="顶部布局" placement="bottom">
            <svg-icon icon-class="layout-top" class="setting-svg-icon" />
          </el-tooltip>
        </span>
      </div>

      <!--      <div class="setting__title">侧边菜单主题</div>

      <div class="setting__title">顶部菜单主题</div> -->

      <!-- <div class="setting__title">界面功能</div> -->

      <div class="setting__title">界面显示</div>
      <div class="setting__item">
        <span>固定Header</span>
        <el-switch v-model="fixedHeader" @change="setFixedHeader" />
      </div>

      <div v-if="layout !== 'Top'" class="setting__item">
        <span>顶部操作栏</span>
        <el-switch v-model="navbar" @change="setNavbar" />
      </div>

      <div v-if="layout !== 'Top'" class="setting__item">
        <span>侧边栏缩收</span>
        <el-switch v-model="hamburger" @change="setHamburger" />
      </div>

      <div v-if="layout !== 'Top'" class="setting__item">
        <span>面包屑</span>
        <el-switch v-model="breadcrumb" @change="setBreadcrumb" />
      </div>

      <div class="setting__item">
        <span>全屏按钮</span>
        <el-switch v-model="screenfull" @change="setScreenfull" />
      </div>

      <div class="setting__item">
        <span>用户头像</span>
        <el-switch v-model="userInfo" @change="setUserInfo" />
      </div>

      <div class="setting__item">
        <span>标签页</span>
        <el-switch v-model="tagsView" @change="setTagsView" />
      </div>

      <div class="setting__item">
        <span>LOGO</span>
        <el-switch v-model="logo" @change="setLogo" />
      </div>

      <div class="setting__item">
        <span>灰色模式</span>
        <el-switch v-model="greyMode" @change="setGreyMode" />
      </div>

      <div class="setting__item">
        <span>回到顶部</span>
        <el-switch v-model="showBackTop" @change="setShowBackTop" />
      </div>

      <div class="setting__item">
        <span>页面标题</span>
        <el-input v-model="title" size="mini" @change="setTitle" />
      </div>

      <div class="setting__item">
        <span>LOGO标题</span>
        <el-input v-model="logoTitle" size="mini" @change="setLogoTitle" />
      </div>

    </div>
  </el-drawer>
</template>

<script lang="ts">
import { defineComponent, computed, ref } from 'vue'
import { appStore } from '_p/index/store/modules/app'
export default defineComponent({
  name: 'Setting',
  setup() {
    const drawer = ref<boolean>(false)
    function toggleClick(): void {
      drawer.value = !drawer.value
    }

    const layout = computed(() => appStore.layout)
    function setLayout(mode: 'Classic' | 'LeftTop' | 'Top' | 'Test') {
      if (mode === layout.value) return
      appStore.SetLayout(mode)
      appStore.SetCollapsed(false)
    }

    const fixedHeader = ref<boolean>(appStore.fixedHeader)
    function setFixedHeader(fixedHeader: boolean) {
      appStore.SetFixedHeader(fixedHeader)
    }

    const navbar = ref<boolean>(appStore.showNavbar)
    function setNavbar(navbar: boolean) {
      appStore.SetShowNavbar(navbar)
    }

    const hamburger = ref<boolean>(appStore.showHamburger)
    function setHamburger(hamburger: boolean) {
      appStore.SetHamburger(hamburger)
    }

    const breadcrumb = ref<boolean>(appStore.showBreadcrumb)
    function setBreadcrumb(breadcrumb: boolean) {
      appStore.SetBreadcrumb(breadcrumb)
    }

    const screenfull = ref<boolean>(appStore.showScreenfull)
    function setScreenfull(screenfull: boolean) {
      appStore.SetScreenfull(screenfull)
    }

    const userInfo = ref<boolean>(appStore.showUserInfo)
    function setUserInfo(userInfo: boolean) {
      appStore.SetUserInfo(userInfo)
    }

    const tagsView = ref<boolean>(appStore.showTags)
    function setTagsView(tagsView: boolean) {
      appStore.SetShowTags(tagsView)
    }

    const logo = ref<boolean>(appStore.showLogo)
    function setLogo(logo: boolean) {
      appStore.SetShowLogo(logo)
    }

    const title = ref<string>(appStore.title)
    function setTitle(title: string) {
      appStore.SetTitle(title)
    }

    const logoTitle = ref<string>(appStore.logoTitle)
    function setLogoTitle(logoTitle: string) {
      appStore.SetLogoTitle(logoTitle)
    }

    const greyMode = ref<boolean>(appStore.greyMode)
    function setGreyMode(greyMode: boolean) {
      appStore.SetGreyMode(greyMode)
    }

    const showBackTop = ref<boolean>(appStore.showBackTop)
    function setShowBackTop(showBackTop: boolean) {
      appStore.SetShowBackTop(showBackTop)
    }

    return {
      drawer, toggleClick,
      layout, setLayout,
      fixedHeader, setFixedHeader,
      navbar, setNavbar,
      hamburger, setHamburger,
      breadcrumb, setBreadcrumb,
      screenfull, setScreenfull,
      userInfo, setUserInfo,
      tagsView, setTagsView,
      logo, setLogo,
      title, setTitle,
      logoTitle, setLogoTitle,
      greyMode, setGreyMode,
      showBackTop, setShowBackTop
    }
  }
})
</script>

<style lang="less" scoped>
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
.setting__content {
  background: @appBg;
  padding: 0 20px 20px 20px;
  .setting__title {
    text-align: center;
    padding-top: 20px;
  }
  .icon__wrap {
    text-align: center;
    margin-top: 15px;
    &>span {
      display: inline-block;
      padding: 5px 10px;
      border: 2px solid @appBg;
      .setting-svg-icon {
        font-size: 60px;
        cursor: pointer;
      }
      .setting-svg-icon:nth-of-type(2) {
        margin: 0 10px;
      }
    }
    .icon--active {
      border: 2px solid #018ffb;
      border-radius: 4px;
    }
  }
  .setting__item {
    display: flex;
    justify-content: space-between;
    margin: 16px 0;
    align-items: center;
    &>span {
      min-width: 100px;
    }
  }
}
</style>
