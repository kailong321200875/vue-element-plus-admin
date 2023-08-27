import { createRouter, createWebHashHistory } from 'vue-router'
import type {
  Router,
  RouteLocationNormalized,
  RouteRecordNormalized,
  RouteRecordRaw
} from 'vue-router'
import { isUrl } from '@/utils/is'
import { omit, cloneDeep } from 'lodash-es'

const modules = import.meta.glob('../views/**/*.{vue,tsx}')

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

export const getRawRoute = (route: RouteLocationNormalized): RouteLocationNormalized => {
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
export const generateRoutesByFrontEnd = (
  routes: AppRouteRecordRaw[],
  keys: string[],
  basePath = '/'
): AppRouteRecordRaw[] => {
  const res: AppRouteRecordRaw[] = []

  for (const route of routes) {
    const meta = route.meta ?? {}
    // skip some route
    if (meta.hidden && !meta.canTo) {
      continue
    }

    let data: Nullable<AppRouteRecordRaw> = null

    let onlyOneChild: Nullable<string> = null
    if (route.children && route.children.length === 1 && !meta.alwaysShow) {
      onlyOneChild = (
        isUrl(route.children[0].path)
          ? route.children[0].path
          : pathResolve(pathResolve(basePath, route.path), route.children[0].path)
      ) as string
    }

    // 开发者可以根据实际情况进行扩展
    for (const item of keys) {
      // 通过路径去匹配
      if (isUrl(item) && (onlyOneChild === item || route.path === item)) {
        data = Object.assign({}, route)
      } else {
        const routePath = (onlyOneChild ?? pathResolve(basePath, route.path)).trim()
        if (routePath === item || meta.followRoute === item) {
          data = Object.assign({}, route)
        }
      }
    }

    // recursive child routes
    if (route.children && data) {
      data.children = generateRoutesByFrontEnd(
        route.children,
        keys,
        pathResolve(basePath, data.path)
      )
    }
    if (data) {
      res.push(data as AppRouteRecordRaw)
    }
  }
  return res
}

// 后端控制路由生成
export const generateRoutesByServer = (routes: AppCustomRouteRecordRaw[]): AppRouteRecordRaw[] => {
  const res: AppRouteRecordRaw[] = []

  for (const route of routes) {
    const data: AppRouteRecordRaw = {
      path: route.path,
      name: route.name,
      redirect: route.redirect,
      meta: route.meta
    }
    if (route.component) {
      const comModule = modules[`../${route.component}.vue`] || modules[`../${route.component}.tsx`]
      const component = route.component as string
      if (!comModule && !component.includes('#')) {
        console.error(`未找到${route.component}.vue文件或${route.component}.tsx文件，请创建`)
      } else {
        // 动态加载路由文件，可根据实际情况进行自定义逻辑
        data.component =
          component === '#' ? Layout : component.includes('##') ? getParentLayout() : comModule
      }
    }
    // recursive child routes
    if (route.children) {
      data.children = generateRoutesByServer(route.children)
    }
    res.push(data as AppRouteRecordRaw)
  }
  return res
}

export const pathResolve = (parentPath: string, path: string) => {
  if (isUrl(path)) return path
  const childPath = path.startsWith('/') || !path ? path : `/${path}`
  return `${parentPath}${childPath}`.replace(/\/\//g, '/').trim()
}

// 路由降级
export const flatMultiLevelRoutes = (routes: AppRouteRecordRaw[]) => {
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
const isMultipleRoute = (route: AppRouteRecordRaw) => {
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
const promoteRouteLevel = (route: AppRouteRecordRaw) => {
  let router: Router | null = createRouter({
    routes: [route as RouteRecordRaw],
    history: createWebHashHistory()
  })

  const routes = router.getRoutes()
  addToChildren(routes, route.children || [], route)
  router = null

  route.children = route.children?.map((item) => omit(item, 'children'))
}

// 添加所有子菜单
const addToChildren = (
  routes: RouteRecordNormalized[],
  children: AppRouteRecordRaw[],
  routeModule: AppRouteRecordRaw
) => {
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
