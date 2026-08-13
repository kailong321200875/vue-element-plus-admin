import type { App } from 'vue'
import { Icon } from '@vea/components'

export const setupGlobCom = (app: App<Element>): void => {
  app.component('Icon', Icon)
}
