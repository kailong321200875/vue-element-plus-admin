import { ElSubMenu, ElMenuItem } from 'element-plus'
import { hasOneShowingChild } from '../helper'
import { isUrl } from '@/utils/is'
import { useRenderMenuTitle } from './useRenderMenuTitle'
import { useDesign } from '@/hooks/web/useDesign'
import { pathResolve } from '@/utils/routerHelper'

const { renderMenuTitle } = useRenderMenuTitle()

export const useRenderMenuItem = (
  // allRouters: AppRouteRecordRaw[] = [],
  menuMode: 'vertical' | 'horizontal'
) => {
  const renderMenuItem = (routers: AppRouteRecordRaw[], parentPath = '/') => {
    return routers.map((v) => {
      const meta = v.meta ?? {}
      if (!meta.hidden) {
        const { oneShowingChild, onlyOneChild } = hasOneShowingChild(v.children, v)
        const fullPath = isUrl(v.path) ? v.path : pathResolve(parentPath, v.path) // getAllParentPath<AppRouteRecordRaw>(allRouters, v.path).join('/')

        if (
          oneShowingChild &&
          (!onlyOneChild?.children || onlyOneChild?.noShowingChildren) &&
          !meta?.alwaysShow
        ) {
          return (
            <ElMenuItem index={onlyOneChild ? pathResolve(fullPath, onlyOneChild.path) : fullPath}>
              {{
                default: () => renderMenuTitle(onlyOneChild ? onlyOneChild?.meta : meta)
              }}
            </ElMenuItem>
          )
        } else {
          const { getPrefixCls } = useDesign()

          const preFixCls = getPrefixCls('menu-popper')
          return (
            <ElSubMenu
              index={fullPath}
              popperClass={
                menuMode === 'vertical' ? `${preFixCls}--vertical` : `${preFixCls}--horizontal`
              }
            >
              {{
                title: () => renderMenuTitle(meta),
                default: () => renderMenuItem(v.children!, fullPath)
              }}
            </ElSubMenu>
          )
        }
      }
    })
  }

  return {
    renderMenuItem
  }
}
