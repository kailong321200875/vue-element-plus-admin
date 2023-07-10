import router from './router'
import { useAppStoreWithOut } from '@/store/modules/app'
import { useCache } from '@/hooks/web/useCache'
import type { RouteRecordRaw } from 'vue-router'
import { useTitle } from '@/hooks/web/useTitle'
import { useNProgress } from '@/hooks/web/useNProgress'
import { usePermissionStoreWithOut } from '@/store/modules/permission'
import { useDictStoreWithOut } from '@/store/modules/dict'
import { usePageLoading } from '@/hooks/web/usePageLoading'
import { getDictApi } from '@/api/common'

const permissionStore = usePermissionStoreWithOut()

const appStore = useAppStoreWithOut()

const dictStore = useDictStoreWithOut()

const { wsCache } = useCache()

const { start, done } = useNProgress()

const { loadStart, loadDone } = usePageLoading()

const whiteList = ['/login'] // 不重定向白名单

router.beforeEach(async (to, from, next) => {
  start()
  loadStart()
  if (wsCache.get(appStore.getUserInfo)) {
    if (to.path === '/login') {
      next({ path: '/' })
    } else {
      if (!dictStore.getIsSetDict) {
        // 获取所有字典
        const res = await getDictApi()
        if (res) {
          dictStore.setDictObj(res.data)
          dictStore.setIsSetDict(true)
        }
      }
      if (permissionStore.getIsAddRouters) {
        next()
        return
      }

      // 开发者可根据实际情况进行修改
      const roleRouters = wsCache.get('roleRouters') || []
      const userInfo = wsCache.get(appStore.getUserInfo)

      // 是否使用动态路由
      if (appStore.getDynamicRouter) {
        userInfo.role === 'admin'
          ? await permissionStore.generateRoutes('admin', roleRouters as AppCustomRouteRecordRaw[])
          : await permissionStore.generateRoutes('test', roleRouters as string[])
      } else {
        await permissionStore.generateRoutes('none')
      }

      permissionStore.getAddRouters.forEach((route) => {
        router.addRoute(route as unknown as RouteRecordRaw) // 动态添加可访问路由表
      })
      const redirectPath = from.query.redirect || to.path
      const redirect = decodeURIComponent(redirectPath as string)
      const nextData = to.path === redirect ? { ...to, replace: true } : { path: redirect }
      permissionStore.setIsAddRouters(true)
      next(nextData)
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
  done() // 结束Progress
  loadDone()
})
