import type { App, Directive, DirectiveBinding } from 'vue'
import { useI18n } from '@/hooks/web/useI18n'
import { useCache } from '@/hooks/web/useCache'
import { intersection } from 'lodash-es'
import { isArray } from '@/utils/is'
import { useAppStoreWithOut } from '@/store/modules/app'

const { t } = useI18n()
const { wsCache } = useCache()
const appStore = useAppStoreWithOut()

// 全部权限
const all_permission = ['*.*.*']
const hasPermission = (value: string | string[]): boolean => {
  const permissions = wsCache.get(appStore.getUserInfo).permissions as string[]
  if (!value) {
    throw new Error(t('permission.hasPermission'))
  }
  if (!isArray(value)) {
    return permissions?.includes(value as string)
  }
  if (all_permission[0] === permissions[0]) {
    return true
  }
  return (intersection(value, permissions) as string[]).length > 0
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
