/**
 * Options API形式的组件生命周期钩子和Composition API之间的实际对应关系
 * beforeCreate -> setup()
 * created -> setup()
 * beforeMount -> onBeforeMount
 * mounted -> onMounted
 * beforeUpdate -> onBeforeUpdate
 * updated -> onUpdated
 * beforeDestroy -> onBeforeUnmount
 * destroyed -> onUnmounted
 * errorCaptured -> onErrorCaptured
 */

import { createApp } from 'vue'

import App from './App.vue' // 入口组件

import router, { setupRouter } from './router' // 路由

import { setupStore } from './store' // 状态管理

import './permission' // 路由守卫

import { setupElement } from '@/libs/element' // element UI

import { setupSvgIcon } from '@/assets/icons' // svg图标

import { setupGlobCom } from '@/components' // 全局公用组件

import { setupDirectives } from '@/directives' // 自定义指令

import { mockXHR } from '../../../mock'

import '@/styles/reset.css' // 重置不同浏览器之间的标签默认样式

import '@/styles/index.less'

const app = createApp(App)

setupRouter(app) // 引入路由

setupStore(app) // 引入状态管理

setupElement(app) // 引入element组件

setupSvgIcon(app) // 全局注册svgIcon组件

setupGlobCom(app) // 注册全局公用组件

setupDirectives(app) // 注册全局自定义指令

mockXHR() // mock注册

router.isReady().then(() => {
  app.mount('#app')
})
