import type { App } from 'vue'

import { ElLoading } from 'element-plus'

export const setupElementPlus = (app: App<Element>) => {
  app.use(ElLoading)

  // 为了开发环境启动更快，一次性引入所有样式
  if (import.meta.env.VITE_USE_ALL_ELEMENT_PLUS_STYLE === 'true') {
    void import('element-plus/dist/index.css')
  }
}
