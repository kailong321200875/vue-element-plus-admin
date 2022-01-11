import { defineStore } from 'pinia'
import { asyncRouterMap, constantRouterMap } from '@/router'
// import { useCache } from '@/hooks/web/useCache'
import { flatMultiLevelRoutes } from '@/utils/routerHelper'
// import { generateRoutesFn1, generateRoutesFn2, flatMultiLevelRoutes } from '@/utils/routerHelper'
import { store } from '../index'
// import { useAppStoreWithOut } from '@/store/modules/app'
import { cloneDeep } from 'lodash-es'

// const { wsCache } = useCache()

// const appStore = useAppStoreWithOut()

export interface PermissionState {
  routers: AppRouteRecordRaw[]
  addRouters: AppRouteRecordRaw[]
  isAddRouters: boolean
  activeTab: string
  menuTabRouters: AppRouteRecordRaw[]
}

export const usePermissionStore = defineStore({
  id: 'permission',
  state: (): PermissionState => ({
    routers: [],
    addRouters: [],
    isAddRouters: false,
    menuTabRouters: [],
    activeTab: ''
  }),
  getters: {
    getRouters(): AppRouteRecordRaw[] {
      return this.routers
    },
    getAddRouters(): AppRouteRecordRaw[] {
      return flatMultiLevelRoutes(cloneDeep(this.addRouters))
    },
    getIsAddRouters(): boolean {
      return this.isAddRouters
    },
    getActiveTab(): string {
      return this.activeTab
    },
    getMenuTabRouters(): AppRouteRecordRaw[] {
      return this.menuTabRouters
    }
  },
  actions: {
    generateRoutes(): Promise<unknown> {
      return new Promise<void>((resolve) => {
        // 路由权限控制，如果不需要权限控制，请注释
        // let routerMap: AppRouteRecordRaw[] = []
        // if (wsCache.get(appStore.getUserInfo).username === 'admin') {
        //   // 模拟前端控制权限
        //   routerMap = generateRoutesFn1(cloneDeep(asyncRouterMap))
        // } else {
        //   // 模拟后端控制权限
        //   routerMap = generateRoutesFn2(wsCache.get(appStore.getUserInfo).checkedNodes)
        // }

        // 不需要权限控制
        const routerMap: AppRouteRecordRaw[] = cloneDeep(asyncRouterMap)

        // 动态路由，404一定要放到最后面
        this.addRouters = routerMap
        // .concat([
        //   {
        //     path: '/:path(.*)*',
        //     redirect: '/404',
        //     name: '404',
        //     meta: {
        //       hidden: true,
        //       breadcrumb: false
        //     }
        //   }
        // ])
        // 渲染菜单的所有路由
        this.routers = cloneDeep(constantRouterMap).concat(routerMap)
        resolve()
      })
    },
    setIsAddRouters(state: boolean): void {
      this.isAddRouters = state
    },
    setMenuTabRouters(routers: AppRouteRecordRaw[]): void {
      this.menuTabRouters = routers
    },
    setAcitveTab(activeTab: string): void {
      this.activeTab = activeTab
    }
  }
})

export function usePermissionStoreWithOut() {
  return usePermissionStore(store)
}
