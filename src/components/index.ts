import type { App } from 'vue'
import SvgIcon from './SvgIcon/index.vue' // svg组件

export function setupGlobCom(app: App<Element>): void {
  app.component('SvgIcon', SvgIcon)
}
