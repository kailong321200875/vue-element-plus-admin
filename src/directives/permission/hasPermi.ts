import type { App, Directive, DirectiveBinding } from 'vue'
import { useI18n } from '@/hooks/web/useI18n'
import { useCache } from '@/hooks/web/useCache'
import { intersection } from 'lodash-es'
import { isArray } from '@/utils/is'

const { t } = useI18n()
const { wsCache } = useCache()
// 全部权限
const all_permission = '*:*:*'
const permissions = wsCache.get('userInfo').permissions

function hasPermi(el: Element, binding: DirectiveBinding) {
  const value = binding.value

  const hasPermission = (value: string | string[]): boolean => {
    if (all_permission === permissions) return true

    if (!value) return true

    if (!isArray(value)) {
      return permissions?.includes(value as string)
    }
    return (intersection(value, permissions) as string[]).length > 0
  }

  if (!hasPermission(value)) {
    el.parentNode?.removeChild(el)
  } else {
    el.parentNode && el.parentNode.removeChild(el)
    throw new Error(t('permission.hasPermission'))
  }
}
const mounted = (el: Element, binding: DirectiveBinding<any>) => {
  hasPermi(el, binding)
}

const permiDirective: Directive = {
  mounted
}

export function setupPermissionDirective(app: App<Element>) {
  app.directive('hasPermi', permiDirective)
}

export default permiDirective
