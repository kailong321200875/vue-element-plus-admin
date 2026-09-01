import type { TagView } from '@/store/modules/tagsView'
import { pathResolve } from '@/utils/routerHelper'

export const filterAffixTags = (routes: AppRouteRecordRaw[], parentPath = ''): TagView[] => {
  return routes.flatMap((route) => {
    const tagPath = pathResolve(parentPath, route.path)
    const current = route.meta?.affix
      ? [
          {
            path: tagPath,
            fullPath: tagPath,
            name: route.name,
            title: route.meta.title,
            icon: route.meta.icon,
            query: {},
            hash: '',
            affix: true,
            noCache: Boolean(route.meta.noCache)
          }
        ]
      : []
    const children: TagView[] = route.children ? filterAffixTags(route.children, tagPath) : []

    return [...current, ...children]
  })
}
