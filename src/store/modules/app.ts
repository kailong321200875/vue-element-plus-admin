import { defineStore } from 'pinia'
import { store } from '../index'
import { useCache } from '@/hooks/web/useCache'
import { appModules } from '@/config/app'
import type { AppState, LayoutType } from '@/config/app'
import { setCssVar, humpToUnderline } from '@/utils'

const { wsCache } = useCache()

export const useAppStore = defineStore({
  id: 'app',
  state: (): AppState => appModules,
  getters: {
    getBreadcrumb(): boolean {
      return this.breadcrumb
    },
    getBreadcrumbIcon(): boolean {
      return this.breadcrumbIcon
    },
    getCollapse(): boolean {
      return this.collapse
    },
    getHamburger(): boolean {
      return this.hamburger
    },
    getScreenfull(): boolean {
      return this.screenfull
    },
    getSize(): boolean {
      return this.size
    },
    getLocale(): boolean {
      return this.locale
    },
    getTagsView(): boolean {
      return this.tagsView
    },
    getLogo(): boolean {
      return this.logo
    },
    getGreyMode(): boolean {
      return this.greyMode
    },

    getLayout(): LayoutType {
      return this.layout
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
    getIsDark(): boolean {
      return this.isDark
    },
    getCurrentSize(): ElememtPlusSzie {
      return this.currentSize
    },
    getSizeMap(): ElememtPlusSzie[] {
      return this.sizeMap
    },
    getMobile(): boolean {
      return this.mobile
    },
    getTheme(): Recordable {
      return this.theme
    }
  },
  actions: {
    setBreadcrumb(breadcrumb: boolean) {
      this.breadcrumb = breadcrumb
    },
    setBreadcrumbIcon(breadcrumbIcon: boolean) {
      this.breadcrumbIcon = breadcrumbIcon
    },
    setCollapse(collapse: boolean) {
      this.collapse = collapse
    },
    setHamburger(hamburger: boolean) {
      this.hamburger = hamburger
    },
    setScreenfull(screenfull: boolean) {
      this.screenfull = screenfull
    },
    setSize(size: boolean) {
      this.size = size
    },
    setLocale(locale: boolean) {
      this.locale = locale
    },
    setTagsView(tagsView: boolean) {
      this.tagsView = tagsView
    },
    setLogo(logo: boolean) {
      this.logo = logo
    },
    setGreyMode(greyMode: boolean) {
      this.greyMode = greyMode
    },

    setLayout(layout: LayoutType) {
      this.layout = layout
    },
    setTitle(title: string) {
      this.title = title
    },
    setLogoTitle(logoTitle: string) {
      this.logoTitle = logoTitle
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
    setCurrentSize(currentSize: ElememtPlusSzie) {
      this.currentSize = currentSize
      wsCache.set('currentSize', this.currentSize)
    },
    setMobile(mobile: boolean) {
      this.mobile = mobile
    },
    setTheme(theme: Recordable) {
      this.theme = Object.assign(this.theme, theme)
      wsCache.set('theme', this.theme)
    },
    setCssVarTheme() {
      for (const key in this.theme) {
        setCssVar(`--${humpToUnderline(key)}`, this.theme[key])
      }
    }
  }
})

export const useAppStoreWithOut = () => {
  return useAppStore(store)
}
