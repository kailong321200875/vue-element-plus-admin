import { defineStore } from 'pinia'
import { store } from '../index'

export type LayoutMode = 'sidebar' | 'top' | 'mixed' | 'dual'

interface AppState {
  collapse: boolean
  pageLoading: boolean
  layout: LayoutMode
  isDark: boolean
  mobile: boolean
}

export const useAppStore = defineStore('app', {
  state: (): AppState => {
    return {
      mobile: false, // 是否是移动端
      pageLoading: false, // 路由跳转loading
      collapse: false, // 折叠菜单
      layout: 'sidebar', // layout布局
      isDark: false // 是否是暗黑模式
    }
  },
  actions: {
    setLayout(layout: LayoutMode) {
      this.layout = layout
    }
  },
  persist: {
    key: 'vea-app-v2',
    pick: ['collapse', 'layout', 'isDark']
  }
})

export const useAppStoreWithOut = () => {
  return useAppStore(store)
}
