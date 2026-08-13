import 'vue/jsx'

import 'virtual:uno.css'

// 初始化多语言
import { setupI18n } from '@/plugins/vueI18n'

// 引入状态管理
import { setupStore } from '@/store'

// 全局组件
import { setupGlobCom } from '@/components'

// 引入element-plus
import { setupElementPlus } from '@/plugins/elementPlus'

// 引入全局样式
import '@vea/styles'

// 路由
import { setupRouter } from './router'

import { createApp } from 'vue'

import App from './App.vue'

import './permission'

// 创建实例
const setupAll = () => {
  const app = createApp(App)

  setupStore(app)

  setupI18n(app)

  setupGlobCom(app)

  setupElementPlus(app)

  setupRouter(app)

  app.mount('#app')
}

setupAll()
