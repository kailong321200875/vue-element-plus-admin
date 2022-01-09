import { defineStore } from 'pinia'
import { store } from '../index'
import { useCache } from '@/hooks/web/useCache'
import { appModules } from '@/config/app'
import type { AppState, LayoutType } from '@/config/app'

const { wsCache } = useCache()

export const useAppStore = defineStore({
  id: 'app',
  state: (): AppState => appModules,
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
    getIsDark(): boolean {
      return this.isDark
    },
    getSize(): ElememtPlusSzie {
      return this.size
    },
    getSizeMap(): ElememtPlusSzie[] {
      return this.sizeMap
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
    setIsDark(isDark: boolean) {
      this.isDark = isDark
      if (this.isDark) {
        document.documentElement.classList.add('dark')
        document.documentElement.classList.remove('light')
      } else {
        document.documentElement.classList.add('light')
        document.documentElement.classList.remove('dark')
      }
      wsCache.set('isDark', this.isDark)
    },
    setSize(size: ElememtPlusSzie) {
      this.size = size
      wsCache.set('size', this.size)
    }
  }
})

export function useAppStoreWithOut() {
  return useAppStore(store)
}
