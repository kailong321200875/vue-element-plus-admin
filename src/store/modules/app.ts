import { defineStore } from 'pinia'

import { store } from '../index'

export type LayoutType = 'Classic' | 'LeftTop' | 'Top' | 'Test'

export interface AppState {
  collapsed: boolean
  showTags: boolean
  showLogo: boolean
  showNavbar: boolean
  fixedHeader: boolean
  layout: LayoutType
  showBreadcrumb: boolean
  showHamburger: boolean
  showScreenfull: boolean
  showUserInfo: boolean
  title: string
  logoTitle: string
  userInfo: string
  greyMode: boolean
  showBackTop: boolean
  showMenuTab: boolean
  requestTime: boolean
  isDark: boolean
  size: ElememtPlusSzie
  lang: string
}

export const useAppStore = defineStore({
  id: 'app',
  state: (): AppState => ({
    collapsed: false, // 菜单栏是否栏缩收
    showLogo: true, // 是否显示logo
    showTags: true, // 是否显示标签栏
    showNavbar: true, // 是否显示navbar
    fixedHeader: true, // 是否固定header
    layout: 'Classic', // layout布局
    showBreadcrumb: true, // 是否显示面包屑
    showHamburger: true, // 是否显示侧边栏缩收按钮
    showScreenfull: true, // 是否全屏按钮
    showUserInfo: true, // 是否显示用户头像
    title: 'butterfly-admin', // 标题
    logoTitle: 'butterfly-admin', // logo标题
    userInfo: 'userInfo', // 登录信息存储字段-建议每个项目换一个字段，避免与其他项目冲突
    greyMode: false, // 是否开始灰色模式，用于特殊悼念日
    showBackTop: true, // 是否显示回到顶部
    showMenuTab: false, // 是否固定一级菜单
    requestTime: false, // 是否在接口调用时添加时间戳，避免IE缓存
    isDark: false, // 是否是暗黑模式
    size: 'default', // 组件尺寸
    lang: 'zh-CN' // 语言
  }),
  getters: {
    getCollapsed(): boolean {
      return this.collapsed
    },
    getShowLogo(): boolean {
      return this.showLogo
    },
    getShowTags(): boolean {
      return this.showTags
    },
    getShowNavbar(): boolean {
      return this.showNavbar
    },
    getFixedHeader(): boolean {
      return this.fixedHeader
    },
    getLayout(): LayoutType {
      return this.layout
    },
    getShowBreadcrumb(): boolean {
      return this.showBreadcrumb
    },
    getShowHamburger(): boolean {
      return this.showHamburger
    },
    getShowScreenfull(): boolean {
      return this.showScreenfull
    },
    getShowUserInfo(): boolean {
      return this.showUserInfo
    },
    getTitle(): string {
      return this.title
    },
    getLogoTitle(): string {
      return this.logoTitle
    },
    getUserInfo(): string {
      return this.userInfo
    },
    getGreyMode(): boolean {
      return this.greyMode
    },
    getShowBackTop(): boolean {
      return this.showBackTop
    },
    getShowMenuTab(): boolean {
      return this.showMenuTab
    },
    getRequestTime(): boolean {
      return this.requestTime
    },
    getIsDark(): boolean {
      return this.isDark
    },
    getSize(): ElememtPlusSzie {
      return this.size
    },
    getLang(): string {
      return this.lang
    }
  },
  actions: {
    setCollapsed(collapsed: boolean) {
      this.collapsed = collapsed
    },
    setShowLogo(showLogo: boolean) {
      this.showLogo = showLogo
    },
    setShowTags(showTags: boolean) {
      this.showTags = showTags
    },
    setShowNavbar(showNavbar: boolean) {
      this.showNavbar = showNavbar
    },
    setFixedHeader(fixedHeader: boolean) {
      this.fixedHeader = fixedHeader
    },
    setLayout(layout: LayoutType) {
      this.layout = layout
    },
    setBreadcrumb(showBreadcrumb: boolean) {
      this.showBreadcrumb = showBreadcrumb
    },
    setHamburger(showHamburger: boolean) {
      this.showHamburger = showHamburger
    },
    setScreenfull(showScreenfull: boolean) {
      this.showScreenfull = showScreenfull
    },
    setUserInfo(showUserInfo: boolean) {
      this.showUserInfo = showUserInfo
    },
    setTitle(title: string) {
      this.title = title
    },
    setLogoTitle(logoTitle: string) {
      this.logoTitle = logoTitle
    },
    setGreyMode(greyMode: boolean) {
      this.greyMode = greyMode
    },
    setShowBackTop(showBackTop: boolean) {
      this.showBackTop = showBackTop
    },
    setShowMenuTab(showMenuTab: boolean) {
      this.showMenuTab = showMenuTab
    },
    setRequestTime(requestTime: boolean) {
      this.requestTime = requestTime
    },
    setIsDark(isDark: boolean) {
      this.isDark = isDark
      if (this.isDark) {
        document.documentElement.classList.add('dark')
        document.documentElement.classList.remove('light')
      } else {
        document.documentElement.classList.add('light')
        document.documentElement.classList.remove('dark')
      }
    },
    setSize(size: ElememtPlusSzie) {
      this.size = size
    },
    setLang(lang: string) {
      this.lang = lang
    }
  }
})

export function useAppStoreWithOut() {
  return useAppStore(store)
}
