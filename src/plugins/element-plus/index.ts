// 按需加载element
// 目前需要手动引入loading等插件，无法自动导入
// size和zIndex也需要这样设置，暂时还无法在全局配置组件中去设置
// 需要看看后面官方是不是能优化这点
import type { App } from 'vue'

import ElementConfig from './element.config'

// element全局配置项
const { size, zIndex } = ElementConfig

import { ElLoading } from 'element-plus'

const plugins = [ElLoading]

export function setupElement(app: App<Element>): void {
  plugins.forEach((plugin: any) => {
    app.use(plugin)
  })

  // 全局配置
  app.config.globalProperties.$ELEMENT = { size: size, zIndex: zIndex }
}
