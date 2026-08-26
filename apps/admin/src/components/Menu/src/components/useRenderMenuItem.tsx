import { ElSubMenu, ElMenuItem } from 'element-plus'
import { unref } from 'vue'
import { hasOneShowingChild } from '../helper'
import { useRenderMenuTitle } from './useRenderMenuTitle'
import { isUrl, pathResolve } from '@/utils/routerHelper'
const prefixCls = 'v-submenu'

export const useRenderMenuItem = (menuMode) => {
  const { renderMenuTitle } = useRenderMenuTitle()

  // allRouters: AppRouteRecordRaw[] = [],
  const renderMenuItem = (routers: AppRouteRecordRaw[], parentPath = '/') => {
    return routers
      .filter((v) => !v.meta?.hidden)
      .map((v) => {
        const meta = v.meta ?? {}
        const { oneShowingChild, onlyOneChild } = hasOneShowingChild(v.children, v)
        const fullPath = isUrl(v.path) ? v.path : pathResolve(parentPath, v.path)

        if (
          oneShowingChild &&
          (!onlyOneChild?.children || onlyOneChild?.noShowingChildren) &&
          !meta?.alwaysShow
        ) {
          return (
            <ElMenuItem index={onlyOneChild ? pathResolve(fullPath, onlyOneChild.path) : fullPath}>
              {{
                default: () =>
                  renderMenuTitle(onlyOneChild ? { ...meta, ...(onlyOneChild.meta ?? {}) } : meta)
              }}
            </ElMenuItem>
          )
        } else {
          return (
            <ElSubMenu
              index={fullPath}
              teleported
              popperClass={unref(menuMode) === 'vertical' ? `${prefixCls}-popper--vertical` : ''}
            >
              {{
                title: () => renderMenuTitle(meta),
                default: () => renderMenuItem(v.children!, fullPath)
              }}
            </ElSubMenu>
          )
        }
      })
  }

  return {
    renderMenuItem
  }
}
