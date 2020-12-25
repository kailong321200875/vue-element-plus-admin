// import path from 'path'
import { asyncRouterMap, constantRouterMap } from '_p/index/router'
import { deepClone } from '@/utils'
import store from '../index'
import { VuexModule, getModule, Module, Mutation, Action } from 'vuex-module-decorators'
import { AppRouteRecordRaw } from '_p/index/router/types'

export interface PermissionState {
  routers: AppRouteRecordRaw[]
  addRouters: AppRouteRecordRaw[]
  isAddRouters: boolean
}

@Module({ dynamic: true, namespaced: true, store, name: 'permission' })
class Permission extends VuexModule implements PermissionState {
  public routers = [] as any[]
  public addRouters = [] as any[]
  public isAddRouters = false

  @Mutation
  private SET_ROUTERS(routers: AppRouteRecordRaw[]): void {
    // const flatRoutes: AppRouteRecordRaw[] = getFlatRoutes(deepClone(asyncRouterMap, ['component']))
    // const flatRoutes: AppRouteRecordRaw[] = deepClone(asyncRouterMap, ['component'])
    this.addRouters = routers.concat([{
      path: '/:path(.*)*',
      redirect: '/404',
      name: '404',
      meta: {
        hidden: true,
        breadcrumb: false
      }
    }])
    this.routers = deepClone(constantRouterMap, ['component']).concat(routers)
  }
  @Mutation
  private SET_ISADDROUTERS(state: boolean): void {
    this.isAddRouters = state
  }

  @Action
  public GenerateRoutes(): Promise<unknown> {
    return new Promise(resolve => {
      const routerMap: AppRouteRecordRaw[] = generateRoutes(deepClone(asyncRouterMap, ['component']))
      this.SET_ROUTERS(routerMap)
      resolve()
    })
  }
  @Action
  public SetIsAddRouters(state: boolean): void {
    this.SET_ISADDROUTERS(state)
  }
}

// 路由过滤，主要用于权限控制
function generateRoutes(routes: AppRouteRecordRaw[]): AppRouteRecordRaw[] {
  const res: AppRouteRecordRaw[] = []

  for (const route of routes) {
    // skip some route
    if (route.meta && route.meta.hidden && !route.meta.showMainRoute) {
      continue
    }

    let data: any = null
    data = Object.assign({}, route)

    // recursive child routes
    if (route.children && data) {
      data.children = generateRoutes(route.children)
    }
    if (data) {
      res.push(data as AppRouteRecordRaw)
    }
  }
  return res
}

export const permissionStore = getModule<Permission>(Permission)
