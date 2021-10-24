import { defineStore } from 'pinia'
import { asyncRouterMap, constantRouterMap } from '@/router'
import { deepClone } from '@/utils'
import { AppRouteRecordRaw } from '@/router/types'
// import { useCache } from '@/hooks/web/useCache'
// const { wsCache } = useCache()
// import { isExternal } from '@/utils/validate'
import path from 'path-browserify'
// import { getParentLayout } from '@/router/utils'
import { store } from '../index'

// import { useAppStoreWithOut } from '@/store/modules/app'
// const appStore = useAppStoreWithOut()

// const modules = import.meta.glob('../../views/**/*.vue')

/* Layout */
// const Layout = () => import('@/layout/index.vue')

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
      return this.addRouters
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
        // 路由权限控制
        // let routerMap: AppRouteRecordRaw[] = []
        // if (wsCache.get(appStore.getUserInfo).roleName === 'admin') {
        //   // 模拟前端控制权限
        //   routerMap = generateRoutesFn(deepClone(asyncRouterMap, ['component']))
        // } else {
        //   // 模拟后端控制权限
        //   routerMap = getFilterRoutes(wsCache.get(appStore.getUserInfo).checkedNodes)
        // }
        const routerMap: AppRouteRecordRaw[] = generateRoutesFn(
          deepClone(asyncRouterMap, ['component'])
        )
        // 动态路由，404一定要放到最后面
        this.addRouters = routerMap.concat([
          {
            path: '/:path(.*)*',
            redirect: '/404',
            name: '404',
            meta: {
              hidden: true,
              breadcrumb: false
            }
          }
        ])
        // 渲染菜单的所有路由
        this.routers = deepClone(constantRouterMap, ['component']).concat(routerMap)
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

// 路由过滤，主要用于权限控制
function generateRoutesFn(routes: AppRouteRecordRaw[], basePath = '/'): AppRouteRecordRaw[] {
  const res: AppRouteRecordRaw[] = []

  for (const route of routes) {
    // skip some route
    if (route.meta && route.meta.hidden && !route.meta.showMainRoute) {
      continue
    }

    // let onlyOneChild: Nullable<string> = null

    // if (route.children && route.children.length === 1 && !route.meta.alwaysShow) {
    //   onlyOneChild = (
    //     isExternal(route.children[0].path)
    //       ? route.children[0].path
    //       : path.resolve(path.resolve(basePath, route.path), route.children[0].path)
    //   ) as string
    // }

    let data: Nullable<IObj> = null

    // 如不需要路由权限，可注释以下逻辑
    // 权限过滤，通过获取登录信息里面的角色权限，动态的渲染菜单。
    // const list = wsCache.get(appStore.getUserInfo).checkedNodes
    // // 开发者可以根据实际情况进行扩展
    // for (const item of list) {
    //   // 通过路径去匹配
    //   if (isExternal(item.path) && (onlyOneChild === item.path || route.path === item.path)) {
    //     data = Object.assign({}, route)
    //   } else {
    //     const routePath = path.resolve(basePath, onlyOneChild || route.path)
    //     if (routePath === item.path || (route.meta && route.meta.followRoute === item.path)) {
    //       data = Object.assign({}, route)
    //     }
    //   }
    // }
    // 如不需要路由权限，解注释下面一行
    data = Object.assign({}, route)

    // recursive child routes
    if (route.children && data) {
      data.children = generateRoutesFn(route.children, path.resolve(basePath, data.path))
    }
    if (data) {
      res.push(data as AppRouteRecordRaw)
    }
  }
  return res
}

// 模拟后端过滤路由
// function getFilterRoutes(routes: AppRouteRecordRaw[]): AppRouteRecordRaw[] {
//   const res: AppRouteRecordRaw[] = []

//   for (const route of routes) {
//     const data: AppRouteRecordRaw | IObj = {
//       path: route.path,
//       name: route.name,
//       redirect: route.redirect
//     }
//     data.meta = Object.assign({}, route.meta || {}, { title: route.meta.title })
//     if (route.component) {
//       // 动态加载路由文件，可根据实际情况进行自定义逻辑
//       data.component = (
//         (route.component as any) === '#'
//           ? Layout
//           : (route.component as any).includes('##')
//           ? getParentLayout((route.component as any).split('##')[1])
//           : modules[`../../${route.component}.vue`]
//       ) as any
//     }
//     // recursive child routes
//     if (route.children) {
//       data.children = getFilterRoutes(route.children)
//     }
//     res.push(data as AppRouteRecordRaw)
//   }
//   return res
// }

export function usePermissionStoreWithOut() {
  return usePermissionStore(store)
}
