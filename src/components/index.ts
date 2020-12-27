import type { App } from 'vue'
import Dialog from './Dialog/index.vue'// Dialog组件
import ComTable from './Table/index.vue'// Table组件
import ComSearch from './Search/index.vue'// Search组件
import ComDetail from './Detail/index.vue'// Detail组件

export function setupGlobCom(app: App<Element>): void {
  app.component('ComDialog', Dialog)
  app.component('ComTable', ComTable)
  app.component('ComSearch', ComSearch)
  app.component('ComDetail', ComDetail)
}
