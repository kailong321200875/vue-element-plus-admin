import { defineStore } from 'pinia'
import { store } from '../index'
import type { ComponentSize } from 'element-plus'

interface AppState {
  collapse: boolean
  pageLoading: boolean
  layout: LayoutType
  isDark: boolean
  currentSize: ComponentSize
  mobile: boolean
}

export const useAppStore = defineStore('app', {
  state: (): AppState => {
    return {
      mobile: false, // 是否是移动端
      pageLoading: false, // 路由跳转loading
      collapse: false, // 折叠菜单
      layout: 'classic', // layout布局
      isDark: false, // 是否是暗黑模式
      currentSize: 'default' // 组件尺寸
    }
  },
  actions: {
    setLayout(layout: LayoutType) {
      this.layout = this.mobile ? 'classic' : layout
    }
  },
  persist: {
    key: 'vea-app-v1',
    pick: ['collapse', 'layout', 'isDark', 'currentSize']
  }
})

export const useAppStoreWithOut = () => {
  return useAppStore(store)
}
