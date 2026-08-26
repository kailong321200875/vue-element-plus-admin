import type { RouteRecordRaw } from 'vue-router'
import NProgress from 'nprogress'
import router from './router'
import { getRouteListApi } from '@/api/login'
import { NO_REDIRECT_WHITE_LIST } from '@/constants'
import { useAppStoreWithOut } from '@/store/modules/app'
import { usePermissionStoreWithOut } from '@/store/modules/permission'
import { useUserStoreWithOut } from '@/store/modules/user'
import 'nprogress/nprogress.css'

NProgress.configure({ showSpinner: false })

export const ensureDynamicRoutes = async () => {
  const permissionStore = usePermissionStoreWithOut()
  if (permissionStore.isAddRouters) return false

  const { data = [] } = await getRouteListApi()
  permissionStore.generateRoutes(data).forEach((route) => {
    router.addRoute(route as unknown as RouteRecordRaw)
  })
  permissionStore.setIsAddRouters(true)
  return true
}

export const setupPermission = async () => {
  const userStore = useUserStoreWithOut()

  if (userStore.isAuthenticated) {
    try {
      await ensureDynamicRoutes()
    } catch {
      userStore.clearSession()
    }
  }

  router.beforeEach(async (to) => {
    NProgress.start()
    useAppStoreWithOut().pageLoading = true

    if (!userStore.isAuthenticated) {
      if (NO_REDIRECT_WHITE_LIST.includes(to.path)) return true
      return { path: '/login', query: { redirect: to.fullPath } }
    }

    if (to.path === '/login') return { path: '/' }

    try {
      const routesAdded = await ensureDynamicRoutes()
      if (routesAdded) return { path: to.fullPath, replace: true }
    } catch {
      userStore.clearSession()
      return { path: '/login', query: { redirect: to.fullPath } }
    }

    if (to.name === 'Fallback') return { path: '/404', replace: true }
    return true
  })

  router.afterEach(() => {
    NProgress.done()
    useAppStoreWithOut().pageLoading = false
  })
}
