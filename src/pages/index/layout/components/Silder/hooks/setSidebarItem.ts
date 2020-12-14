import { ref } from 'vue'
import type { RouteRecordRaw } from 'vue-router'
import path from 'path'
import { isExternal } from '@/utils/validate'
// import { setSidebarItem } from './types'

export function setSidebarItem() {
  const onlyOneChild = ref<any>(null)

  function hasOneShowingChild(children: RouteRecordRaw[] = [], parent: RouteRecordRaw): boolean {
    const showingChildren: RouteRecordRaw[] = children.filter((item: RouteRecordRaw) => {
      if (item.meta && item.meta.hidden) {
        return false
      } else {
        // Temp set(will be used if only has one showing child)
        onlyOneChild.value = item
        return true
      }
    })

    // When there is only one child router, the child router is displayed by default
    if (showingChildren.length === 1) {
      return true
    }

    // Show parent if there are no child router to display
    if (showingChildren.length === 0) {
      onlyOneChild.value = { ...parent, path: '', noShowingChildren: true }
      return true
    }
    return false
  }

  function resolvePath(basePath: string, routePath: string): string {
    if (isExternal(routePath)) {
      return routePath
    }
    return path.resolve(basePath, routePath)
  }

  function treeFindRouter(tree: any[], func: Function, result: RouteRecordRaw[] = []): RouteRecordRaw[] {
    if (!tree) return []
    for (const data of tree) {
      result.push(data)
      if (func(data)) return result
      if (data.children) {
        const findChildren = treeFindRouter(data.children, func, result)
        if (findChildren.length) return findChildren
      }
      result.pop()
    }
    return []
  }

  function getFullPath(arr: string[]): string[] {
    const result: string[] = []
    let basePath = '/'
    for (let i = 0; i < arr.length; i++) {
      if (i === arr.length) {
        continue
      }
      result.push(resolvePath(basePath, arr[i]))
      basePath = resolvePath(basePath, arr[i])
    }
    return result
  }

  function findCurrentRoute(routers: RouteRecordRaw[], path: string, basePath = '/', result: Array<any> = []): any {
    for (const item of routers) {
      if (!item.meta?.hidden) {
        const _basePath = resolvePath(basePath, item.path)
        if (_basePath === path && !item.children) {
          result.push(item)
        } else {
          if (item.children) {
            findCurrentRoute(item.children, path, _basePath, result)
          }
        }
      }
    }
    return result ? result[0] : null
  }

  return {
    onlyOneChild,
    hasOneShowingChild,
    resolvePath,
    treeFindRouter,
    getFullPath,
    findCurrentRoute
  }
}
