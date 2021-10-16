<template>
  <div>
    <div class="setting__wrap" @click="toggleClick">
      <i class="el-icon-setting"></i>
    </div>
    <el-drawer v-model="drawer" direction="rtl" size="20%">
      <template #title>
        <div class="setting__title">项目配置</div>
      </template>
      <div class="setting__content">
        <div class="setting__title">导航栏布局</div>
        <div class="icon__wrap">
          <span :class="{ 'icon--active': layout === 'Classic' }" @click="setLayout('Classic')">
            <el-tooltip content="经典布局" placement="bottom">
              <svg-icon icon-class="layout-classic" class="setting-svg-icon" />
            </el-tooltip>
          </span>
          <span :class="{ 'icon--active': layout === 'LeftTop' }" @click="setLayout('LeftTop')">
            <el-tooltip content="左侧顶部布局" placement="bottom">
              <svg-icon icon-class="layout-topLeft" class="setting-svg-icon" />
            </el-tooltip>
          </span>
          <span :class="{ 'icon--active': layout === 'Top' }" @click="setLayout('Top')">
            <el-tooltip content="顶部布局" placement="bottom">
              <svg-icon icon-class="layout-top" class="setting-svg-icon" />
            </el-tooltip>
          </span>
        </div>

        <!--      <div class="setting__title">侧边菜单主题</div>

        <div class="setting__title">顶部菜单主题</div> -->

        <!-- <div class="setting__title">界面功能</div> -->

        <div class="setting__title">界面显示</div>
        <div v-if="layout !== 'Top'" class="setting__item">
          <span>固定一级菜单</span>
          <el-switch :value="showMenuTab" @change="setShowMenuTab" />
        </div>

        <div class="setting__item">
          <span>固定Header</span>
          <el-switch :value="fixedHeader" @change="setFixedHeader" />
        </div>

        <div v-if="layout !== 'Top'" class="setting__item">
          <span>顶部操作栏</span>
          <el-switch :value="showNavbar" @change="setShowNavbar" />
        </div>

        <div v-if="layout !== 'Top'" class="setting__item">
          <span>侧边栏缩收</span>
          <el-switch :value="showHamburger" @change="setHamburger" />
        </div>

        <div v-if="layout !== 'Top'" class="setting__item">
          <span>面包屑</span>
          <el-switch :value="showBreadcrumb" @change="setBreadcrumb" />
        </div>

        <div class="setting__item">
          <span>全屏按钮</span>
          <el-switch :value="showScreenfull" @change="setScreenfull" />
        </div>

        <div class="setting__item">
          <span>用户头像</span>
          <el-switch :value="showUserInfo" @change="setUserInfo" />
        </div>

        <div class="setting__item">
          <span>标签页</span>
          <el-switch :value="showTags" @change="setShowTags" />
        </div>

        <div class="setting__item">
          <span>LOGO</span>
          <el-switch :value="showLogo" @change="setShowLogo" />
        </div>

        <div class="setting__item">
          <span>灰色模式</span>
          <el-switch :value="greyMode" @change="setGreyMode" />
        </div>

        <div class="setting__item">
          <span>回到顶部</span>
          <el-switch :value="showBackTop" @change="setShowBackTop" />
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
  </div>
</template>

<script setup lang="ts" name="Setting">
import { computed, ref } from 'vue'
import { useAppStore, LayoutType } from '@/store/modules/app'
const appStore = useAppStore()

const drawer = ref<boolean>(false)
const logoTitle = ref<string>(appStore.getLogoTitle)
const title = ref<string>(appStore.getTitle)
const layout = computed(() => appStore.getLayout)
const fixedHeader = computed(() => appStore.getFixedHeader)
const showNavbar = computed(() => appStore.getShowNavbar)
const showHamburger = computed(() => appStore.getShowHamburger)
const showBreadcrumb = computed(() => appStore.getShowBreadcrumb)
const showScreenfull = computed(() => appStore.getShowScreenfull)
const showUserInfo = computed(() => appStore.getShowUserInfo)
const showTags = computed(() => appStore.getShowTags)
const showLogo = computed(() => appStore.getShowLogo)
const greyMode = computed(() => appStore.getGreyMode)
const showBackTop = computed(() => appStore.getShowBackTop)
const showMenuTab = computed(() => appStore.getShowMenuTab)

function toggleClick() {
  drawer.value = true
}

function setLayout(mode: LayoutType) {
  if (mode === layout.value) return
  appStore.setLayout(mode)
  setCollapsed(false)
  ;(mode as string) === 'Top' && setShowMenuTab(false)
}

function setCollapsed(val: boolean) {
  appStore.setCollapsed(val)
}

function setFixedHeader(val: boolean) {
  appStore.setFixedHeader(val)
}

function setShowNavbar(val: boolean) {
  appStore.setShowNavbar(val)
}

function setHamburger(val: boolean) {
  appStore.setHamburger(val)
}

function setBreadcrumb(val: boolean) {
  appStore.setBreadcrumb(val)
}

function setScreenfull(val: boolean) {
  appStore.setScreenfull(val)
}

function setUserInfo(val: boolean) {
  appStore.setUserInfo(val)
}

function setShowTags(val: boolean) {
  appStore.setShowTags(val)
}

function setShowLogo(val: boolean) {
  appStore.setShowLogo(val)
}

function setTitle(val: string) {
  appStore.setTitle(val)
}

function setLogoTitle(val: string) {
  appStore.setLogoTitle(val)
}

function setGreyMode(val: boolean) {
  appStore.setGreyMode(val)
}

function setShowBackTop(val: boolean) {
  appStore.setShowBackTop(val)
}

function setShowMenuTab(val: boolean) {
  appStore.setShowMenuTab(val)
}
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
  padding: 0 20px 20px 20px;
  background: var(--app-background-color);

  .setting__title {
    padding-top: 20px;
    text-align: center;
  }

  .icon__wrap {
    margin-top: 15px;
    text-align: center;

    & > span {
      display: inline-block;
      padding: 5px 10px;
      border: 2px solid var(--app-background-color);

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
    margin: 16px 0;
    justify-content: space-between;
    align-items: center;

    & > span {
      min-width: 100px;
    }
  }
}
</style>
