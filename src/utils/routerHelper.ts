import { createRouter, createWebHashHistory } from 'vue-router'
import type { Router, RouteLocationNormalized, RouteRecordNormalized } from 'vue-router'
import { isUrl } from '@/utils/is'
import { useCache } from '@/hooks/web/useCache'
import { useAppStoreWithOut } from '@/store/modules/app'
import { omit, cloneDeep } from 'lodash-es'

const appStore = useAppStoreWithOut()

const { wsCache } = useCache()

const modules = import.meta.glob('../../views/**/*.{vue,tsx}')

/* Layout */
export const Layout = () => import('@/layout/Layout.vue')

export const getParentLayout = () => {
  return () =>
    new Promise((resolve) => {
      resolve({
        name: 'ParentLayout'
      })
    })
}

export function getRawRoute(route: RouteLocationNormalized): RouteLocationNormalized {
  if (!route) return route
  const { matched, ...opt } = route
  return {
    ...opt,
    matched: (matched
      ? matched.map((item) => ({
          meta: item.meta,
          name: item.name,
          path: item.path
        }))
      : undefined) as RouteRecordNormalized[]
  }
}

// 前端控制路由生成
export function generateRoutesFn1(
  routes: AppRouteRecordRaw[],
  basePath = '/'
): AppRouteRecordRaw[] {
  const res: AppRouteRecordRaw[] = []

  for (const route of routes) {
    // skip some route
    if (route.meta && route.meta.hidden && !route.meta.showMainRoute) {
      continue
    }

    let data: Nullable<AppRouteRecordRaw> = null

    let onlyOneChild: Nullable<string> = null

    if (route.children && route.children.length === 1 && !route.meta.alwaysShow) {
      onlyOneChild = (
        isUrl(route.children[0].path)
          ? route.children[0].path
          : pathResolve(pathResolve(basePath, route.path), route.children[0].path)
      ) as string
    }

    // 权限过滤，通过获取登录信息里面的角色权限，动态的渲染菜单。
    const list = wsCache.get(appStore.getUserInfo).checkedNodes
    // 开发者可以根据实际情况进行扩展
    for (const item of list) {
      // 通过路径去匹配
      if (isUrl(item.path) && (onlyOneChild === item.path || route.path === item.path)) {
        data = Object.assign({}, route)
      } else {
        const routePath = pathResolve(basePath, onlyOneChild || route.path)
        if (routePath === item.path || (route.meta && route.meta.followRoute === item.path)) {
          data = Object.assign({}, route)
        }
      }
    }

    // recursive child routes
    if (route.children && data) {
      data.children = generateRoutesFn1(route.children, pathResolve(basePath, data.path))
    }
    if (data) {
      res.push(data as AppRouteRecordRaw)
    }
  }
  return res
}

// 后端控制路由生成
export function generateRoutesFn2(routes: AppRouteRecordRaw[]): AppRouteRecordRaw[] {
  const res: AppRouteRecordRaw[] = []

  for (const route of routes) {
    const data: AppRouteRecordRaw = {
      path: route.path,
      name: route.name,
      redirect: route.redirect,
      meta: route.meta
    }
    if (route.component) {
      const comModule =
        modules[`../../${route.component}.vue`] || modules[`../../${route.component}.tsx`]
      if (comModule) {
        // 动态加载路由文件，可根据实际情况进行自定义逻辑
        const component = route.component as string
        data.component =
          component === '#' ? Layout : component.includes('##') ? getParentLayout() : comModule
      } else {
        console.error(`未找到${route.component}.vue文件或${route.component}.tsx文件，请创建`)
      }
    }
    // recursive child routes
    if (route.children) {
      data.children = generateRoutesFn2(route.children)
    }
    res.push(data as AppRouteRecordRaw)
  }
  return res
}

export function pathResolve(parentPath: string, path: string) {
  return `${parentPath}/${path}`
}

// 路由降级
export function flatMultiLevelRoutes(routes: AppRouteRecordRaw[]) {
  const modules: AppRouteRecordRaw[] = cloneDeep(routes)
  for (let index = 0; index < modules.length; index++) {
    const route = modules[index]
    if (!isMultipleRoute(route)) {
      continue
    }
    promoteRouteLevel(route)
  }
  return modules
}

// 层级是否大于2
function isMultipleRoute(route: AppRouteRecordRaw) {
  if (!route || !Reflect.has(route, 'children') || !route.children?.length) {
    return false
  }

  const children = route.children

  let flag = false
  for (let index = 0; index < children.length; index++) {
    const child = children[index]
    if (child.children?.length) {
      flag = true
      break
    }
  }
  return flag
}

// 生成二级路由
function promoteRouteLevel(route: AppRouteRecordRaw) {
  let router: Router | null = createRouter({
    routes: [route as unknown as RouteRecordNormalized],
    history: createWebHashHistory()
  })

  const routes = router.getRoutes()
  addToChildren(routes, route.children || [], route)
  router = null

  route.children = route.children?.map((item) => omit(item, 'children'))
}

// 添加所有子菜单
function addToChildren(
  routes: RouteRecordNormalized[],
  children: AppRouteRecordRaw[],
  routeModule: AppRouteRecordRaw
) {
  for (let index = 0; index < children.length; index++) {
    const child = children[index]
    const route = routes.find((item) => item.name === child.name)
    if (!route) {
      continue
    }
    routeModule.children = routeModule.children || []
    if (!routeModule.children.find((item) => item.name === route.name)) {
      routeModule.children?.push(route as unknown as AppRouteRecordRaw)
    }
    if (child.children?.length) {
      addToChildren(routes, child.children, routeModule)
    }
  }
}
