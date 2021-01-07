import type { App } from 'vue'
import SvgIcon from './SvgIcon/index.vue'// svg组件
import Dialog from './Dialog/index.vue'// Dialog组件
import ComTable from './Table/index.vue'// Table组件
import ComSearch from './Search/index.vue'// Search组件
import ComDetail from './Detail/index.vue'// Detail组件

import '@/assets/icons' // 引入svg图标

export function setupGlobCom(app: App<Element>): void {
  app.component('ComDialog', Dialog)
  app.component('ComTable', ComTable)
  app.component('ComSearch', ComSearch)
  app.component('ComDetail', ComDetail)
  app.component('SvgIcon', SvgIcon)
}
