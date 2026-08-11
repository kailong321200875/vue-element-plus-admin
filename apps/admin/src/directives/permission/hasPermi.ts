import type { App, Directive, DirectiveBinding } from 'vue'
import { i18n } from '@/plugins/vueI18n'
import router from '@/router'

const hasPermission = (value: string): boolean => {
  const permission = (router.currentRoute.value.meta.permission || []) as string[]
  if (!value) {
    throw new Error(i18n.global.t('permission.hasPermission'))
  }
  if (permission.includes(value)) {
    return true
  }
  return false
}
function hasPermi(el: Element, binding: DirectiveBinding) {
  const value = binding.value

  const flag = hasPermission(value)
  if (!flag) {
    el.parentNode?.removeChild(el)
  }
}
const mounted = (el: Element, binding: DirectiveBinding<any>) => {
  hasPermi(el, binding)
}

const permiDirective: Directive = {
  mounted
}

export const setupPermissionDirective = (app: App<Element>) => {
  app.directive('hasPermi', permiDirective)
}

export default permiDirective
