import type { App } from 'vue'
import Dialog from './Dialog/index.vue'// Dialog组件

export function setupGlobCom(app: App<Element>): void {
  app.component('ComDialog', Dialog)
}
