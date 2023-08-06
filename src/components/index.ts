import type { App } from 'vue'
import { Icon } from './Icon'
import { Permission } from './Permission'

export const setupGlobCom = (app: App<Element>): void => {
  app.component('Icon', Icon)
  app.component('Permission', Permission)
}
