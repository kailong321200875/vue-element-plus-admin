// import path from 'path'
import { asyncRouterMap, constantRouterMap } from '_p/index/router'
import { deepClone } from '@/utils'
import store from '../index'
import { VuexModule, getModule, Module, Mutation, Action } from 'vuex-module-decorators'
import { AppRouteRecordRaw } from '_p/index/router/types'
import wsCache from '@/cache'
import { isExternal } from '@/utils/validate'
import path from 'path'
import { getParentLayout } from '_p/index/router/utils'

import { appStore } from '_p/index/store/modules/app'

/* Layout */
const Layout = () => import('_p/index/layout/index.vue')

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
    // 动态路由，404一定要放到最后面
    this.addRouters = routers.concat([{
      path: '/:path(.*)*',
      redirect: '/404',
      name: '404',
      meta: {
        hidden: true,
        breadcrumb: false
      }
    }])
    // 渲染菜单的所有路由
    this.routers = deepClone(constantRouterMap, ['component']).concat(routers)
  }
  @Mutation
  private SET_ISADDROUTERS(state: boolean): void {
    this.isAddRouters = state
  }

  @Action
  public GenerateRoutes(): Promise<unknown> {
    return new Promise(resolve => {
      // 路由权限控制
      let routerMap: AppRouteRecordRaw[] = []
      if (wsCache.get(appStore.userInfo).roleName === 'admin') {
        // 模拟前端控制权限
        routerMap = generateRoutes(deepClone(asyncRouterMap, ['component']))
      } else {
        // 模拟后端控制权限
        routerMap = getFilterRoutes(wsCache.get(appStore.userInfo).checkedNodes)
      }
      // const routerMap: AppRouteRecordRaw[] = generateRoutes(deepClone(asyncRouterMap, ['component']))
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
function generateRoutes(routes: AppRouteRecordRaw[], basePath = '/'): AppRouteRecordRaw[] {
  const res: AppRouteRecordRaw[] = []

  for (const route of routes) {
    // skip some route
    if (route.meta && route.meta.hidden && !route.meta.showMainRoute) {
      continue
    }

    let onlyOneChild = null

    if (route.children && route.children.length === 1 && !route.meta.alwaysShow) {
      onlyOneChild = isExternal(route.children[0].path)
        ? route.children[0].path
        : path.resolve(path.resolve(basePath, route.path), route.children[0].path)
    }

    let data: any = null

    // 如不需要路由权限，可注释以下逻辑
    // 权限过滤，通过获取登录信息里面的角色权限，动态的渲染菜单。
    const list = wsCache.get(appStore.userInfo).checkedNodes
    // 开发者可以根据实际情况进行扩展
    for (const item of list) {
      // 通过路径去匹配
      if (isExternal(item.path) && (onlyOneChild === item.path || route.path === item.path)) {
        data = Object.assign({}, route)
      } else {
        const routePath = path.resolve(basePath, onlyOneChild || route.path)
        if (routePath === item.path || (route.meta && route.meta.followRoute === item.path)) {
          data = Object.assign({}, route)
        }
      }
    }
    // 如不需要路由权限，解注释下面一行
    // data = Object.assign({}, route)

    // recursive child routes
    if (route.children && data) {
      data.children = generateRoutes(route.children, path.resolve(basePath, data.path))
    }
    if (data) {
      res.push(data as AppRouteRecordRaw)
    }
  }
  return res
}

// 模拟后端过滤路由
function getFilterRoutes(routes: any[]): any[] {
  const res = []

  for (const route of routes) {
    const data: any = {
      path: route.path,
      name: route.name,
      redirect: route.redirect
    }
    data.meta = Object.assign({}, route.meta || {}, { title: route.title })
    if (route.component) {
      // 动态加载路由文件，可根据实际情况进行自定义逻辑
      data.component = route.component === '#'
        ? Layout
        : (route.component.includes('##')
          ? getParentLayout(route.component.split('##')[1])
          : () => new Promise((resolve) => {
            resolve(import(`${route.component}`))
          }))
    }
    // recursive child routes
    if (route.children) {
      data.children = getFilterRoutes(route.children)
    }
    res.push(data)
  }
  return res
}

export const permissionStore = getModule<Permission>(Permission)
