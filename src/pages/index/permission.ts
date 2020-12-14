import router from './router'

import NProgress from 'nprogress' // 引入进度条

import 'nprogress/nprogress.css' // 进度条样式

import config from './config'

const { user_info, title } = config

import wsCache from '@/cache'

import getPageTitle from '@/utils/get-page-title'

NProgress.configure({ showSpinner: false }) // NProgress configuration

import { permissionStore } from '_p/index/store/modules/permission'

import type { RouteRecordRaw } from 'vue-router'

const whiteList: string[] = ['/login'] // 不重定向白名单
router.beforeEach((to, from, next) => {
  if (wsCache.get(user_info)) {
    if (to.path === '/login') {
      next({ path: '/' })
    } else {
      if (permissionStore.isAddRouters) {
        next()
        return
      }
      permissionStore.GenerateRoutes().then(() => {
        permissionStore.addRouters.forEach(async(route: RouteRecordRaw) => {
          await router.addRoute(route.name!, route) // 动态添加可访问路由表
        })
        const redirectPath = (from.query.redirect || to.path) as string
        const redirect = decodeURIComponent(redirectPath)
        const nextData = to.path === redirect ? { ...to, replace: true } : { path: redirect }
        permissionStore.SetIsAddRouters(true)
        next(nextData)
      })
    }
  } else {
    if (whiteList.indexOf(to.path) !== -1) {
      next()
    } else {
      // 否则全部重定向到登录页
      next({
        path: '/login',
        query: {
          redirect: to.path
        }
      })
    }
  }
})

router.afterEach((to) => {
  document.title = getPageTitle(to.meta.title, title)
  NProgress.done() // 结束进度条
})
