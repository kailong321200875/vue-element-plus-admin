import type { App } from 'vue'
import SvgIcon from '@/components/SvgIcon/index.vue'// svg组件

const req: any = require.context('./svg', false, /\.svg$/)
const requireAll: any = (requireContext: any) => {
  requireContext.keys().map(requireContext)
}
requireAll(req)

export function setupSvgIcon(app: App<Element>): void {
  app.component('SvgIcon', SvgIcon)
}
