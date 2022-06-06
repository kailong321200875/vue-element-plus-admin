import type { AppContext } from 'vue'
import { Icon } from './Icon'

export const setupGlobCom = (app: AppContext['app']): void => {
  app.component('Icon', Icon)
}
