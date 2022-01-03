import type { App } from 'vue'
import { Icon } from './Icon'

export function setupGlobCom(app: App<Element>): void {
  app.component('Icon', Icon)
}
