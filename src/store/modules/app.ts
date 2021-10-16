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
    title: 'vue-element-plus-admin', // 标题
    logoTitle: 'vue-ElPlus-admin', // logo标题
    userInfo: 'userInfo', // 登录信息存储字段-建议每个项目换一个字段，避免与其他项目冲突
    greyMode: false, // 是否开始灰色模式，用于特殊悼念日
    showBackTop: true, // 是否显示回到顶部
    showMenuTab: false, // 是否固定一级菜单
    requestTime: false // 是否在接口调用时添加时间戳，避免IE缓存
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
    }
  },
  actions: {
    setCollapsed(collapsed: boolean): void {
      this.collapsed = collapsed
    },
    setShowLogo(showLogo: boolean): void {
      this.showLogo = showLogo
    },
    setShowTags(showTags: boolean): void {
      this.showTags = showTags
    },
    setShowNavbar(showNavbar: boolean): void {
      this.showNavbar = showNavbar
    },
    setFixedHeader(fixedHeader: boolean): void {
      this.fixedHeader = fixedHeader
    },
    setLayout(layout: LayoutType): void {
      this.layout = layout
    },
    setBreadcrumb(showBreadcrumb: boolean): void {
      this.showBreadcrumb = showBreadcrumb
    },
    setHamburger(showHamburger: boolean): void {
      this.showHamburger = showHamburger
    },
    setScreenfull(showScreenfull: boolean): void {
      this.showScreenfull = showScreenfull
    },
    setUserInfo(showUserInfo: boolean): void {
      this.showUserInfo = showUserInfo
    },
    setTitle(title: string): void {
      this.title = title
    },
    setLogoTitle(logoTitle: string): void {
      this.logoTitle = logoTitle
    },
    setGreyMode(greyMode: boolean): void {
      this.greyMode = greyMode
    },
    setShowBackTop(showBackTop: boolean): void {
      this.showBackTop = showBackTop
    },
    setShowMenuTab(showMenuTab: boolean): void {
      this.showMenuTab = showMenuTab
    },
    setRequestTime(requestTime: boolean): void {
      this.requestTime = requestTime
    }
  }
})

export function useAppStoreWithOut() {
  return useAppStore(store)
}
