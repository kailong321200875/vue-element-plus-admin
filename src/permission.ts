import router from './router'
import NProgress from 'nprogress' // progress bar
import 'nprogress/nprogress.css' // progress bar style
import { useAppStoreWithOut } from '@/store/modules/app'
const appStore = useAppStoreWithOut()
import { usePermissionStoreWithOut } from '@/store/modules/permission'
const permissionStore = usePermissionStoreWithOut()
import { useCache } from '@/hooks/web/useCache'
const { wsCache } = useCache()
import type { RouteRecordRaw } from 'vue-router'
import { useTitle } from '@/hooks/web/useTitle'

NProgress.configure({ showSpinner: false }) // NProgress configuration

const whiteList = ['/login'] // 不重定向白名单

router.beforeEach((to, from, next) => {
  NProgress.start()
  if (wsCache.get(appStore.getUserInfo)) {
    if (to.path === '/login') {
      next({ path: '/' })
    } else {
      if (permissionStore.getIsAddRouters) {
        next()
        return
      }
      permissionStore.generateRoutes().then(() => {
        permissionStore.addRouters.forEach(async (route) => {
          await router.addRoute(route as RouteRecordRaw) // 动态添加可访问路由表
        })
        const redirectPath = from.query.redirect || to.path
        const redirect = decodeURIComponent(redirectPath as string)
        const nextData = to.path === redirect ? { ...to, replace: true } : { path: redirect }
        permissionStore.setIsAddRouters(true)
        next(nextData)
      })
    }
  } else {
    if (whiteList.indexOf(to.path) !== -1) {
      next()
    } else {
      next(`/login?redirect=${to.path}`) // 否则全部重定向到登录页
    }
  }
})

router.afterEach((to) => {
  useTitle(to?.meta?.title as string)
  NProgress.done() // 结束Progress
})
