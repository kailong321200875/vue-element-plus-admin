import type { App } from 'vue'
import { Icon, registerIcons } from '@vea/components'
import { icons } from '@/icons'

export const setupGlobCom = (app: App<Element>): void => {
  registerIcons(icons)
  app.component('Icon', Icon)
}
