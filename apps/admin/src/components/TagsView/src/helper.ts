import type { RouteLocationNormalizedLoaded } from 'vue-router'
import { pathResolve } from '@/utils/routerHelper'

export const filterAffixTags = (routes: AppRouteRecordRaw[], parentPath = '') => {
  return routes.flatMap((route) => {
    const tagPath = pathResolve(parentPath, route.path)
    const current = route.meta?.affix
      ? [{ ...route, path: tagPath, fullPath: tagPath } as RouteLocationNormalizedLoaded]
      : []
    const children = route.children ? filterAffixTags(route.children, tagPath) : []

    return [...current, ...children]
  })
}
