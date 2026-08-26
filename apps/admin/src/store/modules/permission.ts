import { defineStore } from 'pinia'
import { constantRouterMap } from '@/router'
import { generateRoutesByServer } from '@/utils/routerHelper'
import { store } from '../index'

export interface PermissionState {
  routers: AppRouteRecordRaw[]
  addRouters: AppRouteRecordRaw[]
  isAddRouters: boolean
}

export const usePermissionStore = defineStore('permission', {
  state: (): PermissionState => ({
    routers: [],
    addRouters: [],
    isAddRouters: false
  }),
  actions: {
    generateRoutes(routers: AppCustomRouteRecordRaw[]): AppRouteRecordRaw[] {
      const routerMap = generateRoutesByServer(routers)
      this.addRouters = routerMap
      this.routers = constantRouterMap.concat(routerMap)
      return this.addRouters
    },
    setIsAddRouters(state: boolean): void {
      this.isAddRouters = state
    },
    reset(): void {
      this.routers = []
      this.addRouters = []
      this.isAddRouters = false
    }
  }
})

export const usePermissionStoreWithOut = () => {
  return usePermissionStore(store)
}
