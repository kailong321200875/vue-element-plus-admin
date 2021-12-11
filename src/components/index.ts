import type { App } from 'vue'
import { BfFrom } from './Form'

export function setupGlobCom(app: App<Element>) {
  app.component('BfFrom', BfFrom)
}
