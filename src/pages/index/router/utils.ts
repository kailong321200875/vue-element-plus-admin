import ParentLayout from '_c/ParentView/index.vue'
import type { RouteLocationNormalized, RouteRecordNormalized } from 'vue-router'

export const getParentLayout = (name: string) => {
  return () =>
    new Promise((resolve) => {
      resolve({
        ...ParentLayout,
        name
      })
    })
}

export function getRoute(route: RouteLocationNormalized): RouteLocationNormalized {
  if (!route) return route
  const { matched, ...opt } = route
  return {
    ...opt,
    matched: (matched
      ? matched.map((item) => ({
        meta: item.meta,
        name: item.name,
        path: item.path
      }))
      : undefined) as RouteRecordNormalized[]
  }
}

