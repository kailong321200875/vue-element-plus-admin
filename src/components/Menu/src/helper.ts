import type { RouteMeta } from 'vue-router'
import { ref, unref } from 'vue'

interface TreeConfig {
  id: string
  children: string
  pid: string
}

type OnlyOneChildType = AppRouteRecordRaw & { noShowingChildren?: boolean }

interface HasOneShowingChild {
  oneShowingChild?: boolean
  onlyOneChild?: OnlyOneChildType
}

const DEFAULT_CONFIG: TreeConfig = {
  id: 'id',
  children: 'children',
  pid: 'pid'
}

const getConfig = (config: Partial<TreeConfig>) => Object.assign({}, DEFAULT_CONFIG, config)

export function getAllParentPath<T = Recordable>(treeData: T[], path: string) {
  const menuList = findPath(treeData, (n) => n.path === path) as AppRouteRecordRaw[]
  return (menuList || []).map((item) => item.path)
}

export function findPath<T = any>(
  tree: any,
  func: Fn,
  config: Partial<TreeConfig> = {}
): T | T[] | null {
  config = getConfig(config)
  const path: T[] = []
  const list = [...tree]
  const visitedSet = new Set()
  const { children } = config
  while (list.length) {
    const node = list[0]
    if (visitedSet.has(node)) {
      path.pop()
      list.shift()
    } else {
      visitedSet.add(node)
      node[children!] && list.unshift(...node[children!])
      path.push(node)
      if (func(node)) {
        return path
      }
    }
  }
  return null
}

export function hasOneShowingChild(
  children: AppRouteRecordRaw[] = [],
  parent: AppRouteRecordRaw
): HasOneShowingChild {
  const onlyOneChild = ref<OnlyOneChildType>()

  const showingChildren = children.filter((v) => {
    const meta = (v.meta ?? {}) as RouteMeta
    if (meta.hidden) {
      return false
    } else {
      // Temp set(will be used if only has one showing child)
      onlyOneChild.value = v
      return true
    }
  })

  // When there is only one child router, the child router is displayed by default
  if (showingChildren.length === 1) {
    return {
      oneShowingChild: true,
      onlyOneChild: unref(onlyOneChild)
    }
  }

  // Show parent if there are no child router to display
  if (!showingChildren.length) {
    onlyOneChild.value = { ...parent, path: '', noShowingChildren: true }
    return {
      oneShowingChild: true,
      onlyOneChild: unref(onlyOneChild)
    }
  }

  return {
    oneShowingChild: false,
    onlyOneChild: unref(onlyOneChild)
  }
}
