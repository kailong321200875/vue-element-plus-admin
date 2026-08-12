import router from './router'
import type { RouteRecordRaw } from 'vue-router'
import { useNProgress } from '@/hooks/web/useNProgress'
import { usePermissionStoreWithOut } from '@/store/modules/permission'
import { usePageLoading } from '@/hooks/web/usePageLoading'
import { NO_REDIRECT_WHITE_LIST } from '@/constants'
import { useUserStoreWithOut } from '@/store/modules/user'
import { getRouteListApi } from '@/api/login'

const { start, done } = useNProgress()

const { loadStart, loadDone } = usePageLoading()

router.beforeEach(async (to, from, next) => {
  start()
  loadStart()
  const permissionStore = usePermissionStoreWithOut()
  const userStore = useUserStoreWithOut()
  if (userStore.isAuthenticated) {
    if (to.path === '/login') {
      next({ path: '/' })
    } else {
      if (permissionStore.isAddRouters) {
        next()
        return
      }

      try {
        const { data = [] } = await getRouteListApi()
        permissionStore.generateRoutes(data)
      } catch {
        userStore.clearSession()
        next(`/login?redirect=${encodeURIComponent(to.fullPath)}`)
        return
      }

      permissionStore.addRouters.forEach((route) => {
        router.addRoute(route as unknown as RouteRecordRaw) // 动态添加可访问路由表
      })
      const redirectPath = from.query.redirect || to.path
      const redirect = decodeURIComponent(redirectPath as string)
      const nextData = to.path === redirect ? { ...to, replace: true } : { path: redirect }
      permissionStore.setIsAddRouters(true)
      next(nextData)
    }
  } else {
    if (NO_REDIRECT_WHITE_LIST.indexOf(to.path) !== -1) {
      next()
    } else {
      next(`/login?redirect=${to.path}`) // 否则全部重定向到登录页
    }
  }
})

router.afterEach(() => {
  done() // 结束Progress
  loadDone()
})
