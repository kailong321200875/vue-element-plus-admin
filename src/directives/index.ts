import type { App } from 'vue'

import { clipboard } from './clipboard'

export function setupDirectives(app: App) {
  app.directive('clipboard', clipboard)
}
