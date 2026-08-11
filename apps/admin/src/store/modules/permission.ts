import { defineStore } from 'pinia'
import { asyncRouterMap, constantRouterMap } from '@/router'
import {
  generateRoutesByFrontEnd,
  generateRoutesByServer,
  flatMultiLevelRoutes
} from '@/utils/routerHelper'
import { store } from '../index'
import { cloneDeep } from 'lodash-es'

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
    generateRoutes(
      type: 'server' | 'frontEnd' | 'static',
      routers?: AppCustomRouteRecordRaw[] | string[]
    ): AppRouteRecordRaw[] {
      let routerMap: AppRouteRecordRaw[] = []
      if (type === 'server') {
        routerMap = generateRoutesByServer(routers as AppCustomRouteRecordRaw[])
      } else if (type === 'frontEnd') {
        routerMap = generateRoutesByFrontEnd(cloneDeep(asyncRouterMap), routers as string[])
      } else {
        routerMap = cloneDeep(asyncRouterMap)
      }

      this.addRouters = flatMultiLevelRoutes(
        cloneDeep(routerMap).concat([
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
      this.routers = cloneDeep(constantRouterMap).concat(routerMap)
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
