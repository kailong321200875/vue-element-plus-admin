import { getAllParentPath } from '@/components/Menu/src/helper'
import { isUrl } from '@/utils/is'
import { cloneDeep } from 'lodash-es'
import { reactive } from 'vue'

export type TabPathMap = {
  [key: string]: string[]
}

export const tabPathMap = reactive<TabPathMap>({})

export const initTabMap = (routes: AppRouteRecordRaw[]) => {
  for (const v of routes) {
    const meta = v.meta ?? {}
    if (!meta?.hidden) {
      tabPathMap[v.path] = []
    }
  }
}

export const filterMenusPath = (
  routes: AppRouteRecordRaw[],
  allRoutes: AppRouteRecordRaw[]
): AppRouteRecordRaw[] => {
  const res: AppRouteRecordRaw[] = []
  for (const v of routes) {
    const meta = v.meta ?? {}
    if (!meta.hidden || meta.canTo) {
      const allParentPath = getAllParentPath<AppRouteRecordRaw>(allRoutes, v.path)

      const fullPath = isUrl(v.path) ? v.path : allParentPath.join('/')

      const data = cloneDeep(v)
      data.path = fullPath
      if (v.children) {
        data.children = filterMenusPath(v.children, allRoutes)
      }

      res.push(data)

      if (allParentPath.length && Reflect.has(tabPathMap, allParentPath[0])) {
        tabPathMap[allParentPath[0]].push(fullPath)
      }
    }
  }

  return res
}
