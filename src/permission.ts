import router from './router'
import { useAppStoreWithOut } from '@/store/modules/app'
import { useCache } from '@/hooks/web/useCache'
// import type { RouteRecordRaw } from 'vue-router'
import { useTitle } from '@/hooks/web/useTitle'
import { useNProgress } from '@/hooks/web/useNProgress'

const appStore = useAppStoreWithOut()

const { wsCache } = useCache()

const { toggle } = useNProgress()

const whiteList = ['/login'] // 不重定向白名单

router.beforeEach((to, from, next) => {
  console.log(from)
  toggle()
  if (wsCache.get(appStore.getUserInfo)) {
    if (to.path === '/login') {
      next({ path: '/' })
    } else {
      // if (permissionStore.getIsAddRouters) {
      //   next()
      //   return
      // }
      // permissionStore.generateRoutes().then(() => {
      //   permissionStore.addRouters.forEach(async (route) => {
      //     await router.addRoute(route as RouteRecordRaw) // 动态添加可访问路由表
      //   })
      //   const redirectPath = from.query.redirect || to.path
      //   const redirect = decodeURIComponent(redirectPath as string)
      //   const nextData = to.path === redirect ? { ...to, replace: true } : { path: redirect }
      //   permissionStore.setIsAddRouters(true)
      //   next(nextData)
      // })
      next()
    }
  } else {
    if (whiteList.indexOf(to.path) !== -1) {
      next()
    } else {
      next(`/login?redirect=${to.path}`) // 否则全部重定向到登录页
    }
  }
})

router.afterEach(async (to) => {
  useTitle(to?.meta?.title as string)
  toggle() // 结束Progress
})
