import { defineStore } from 'pinia'
import { constantRouterMap } from '@/router'
import { generateRoutesByServer, flatMultiLevelRoutes } from '@/utils/routerHelper'
import { store } from '../index'

export interface PermissionState {
  routers: AppRouteRecordRaw[]
  addRouters: AppRouteRecordRaw[]
  isAddRouters: boolean
  menuTabRouters: AppRouteRecordRaw[]
}

export const usePermissionStore = defineStore('permission', {
  state: (): PermissionState => ({
    routers: [],
    addRouters: [],
    isAddRouters: false,
    menuTabRouters: []
  }),
  actions: {
    generateRoutes(routers: AppCustomRouteRecordRaw[]): AppRouteRecordRaw[] {
      const routerMap = generateRoutesByServer(routers)
      this.addRouters = flatMultiLevelRoutes(
        routerMap.concat([
          {
            path: '/:path(.*)*',
            redirect: '/404',
            name: '404Page',
            meta: {
              hidden: true,
              breadcrumb: false
            }
          }
        ])
      )
      this.routers = constantRouterMap.concat(routerMap)
      return this.addRouters
    },
    setIsAddRouters(state: boolean): void {
      this.isAddRouters = state
    },
    setMenuTabRouters(routers: AppRouteRecordRaw[]): void {
      this.menuTabRouters = routers
    },
    reset(): void {
      this.routers = []
      this.addRouters = []
      this.isAddRouters = false
      this.menuTabRouters = []
    }
  }
})

export const usePermissionStoreWithOut = () => {
  return usePermissionStore(store)
}
