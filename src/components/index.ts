import type { App } from 'vue'
import SvgIcon from './SvgIcon/index.vue' // svg组件
import ComSearch from './Search/index.vue' // search组件
import ComDialog from './Dialog/index.vue' // dialog组件
import ComDetail from './Detail/index.vue' // detail组件

export function setupGlobCom(app: App<Element>): void {
  app.component('SvgIcon', SvgIcon)
  app.component('ComSearch', ComSearch)
  app.component('ComDialog', ComDialog)
  app.component('ComDetail', ComDetail)
}
