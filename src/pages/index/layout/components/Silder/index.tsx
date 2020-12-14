import { ref, defineComponent, PropType, computed, watch } from 'vue'
// import { Menu } from 'element-plus'
import { useRouter } from 'vue-router'
import type { RouteRecordRaw, RouteLocationNormalizedLoaded } from 'vue-router'
import Scrollbar from '_c/Scrollbar/index.vue'
import Item from './Item.vue'
import { permissionStore } from '_p/index/store/modules/permission'
import { setSidebarItem } from './hooks/setSidebarItem'
import { isExternal } from '@/utils/validate'
import { findIndex } from '@/utils'
import config from '_p/index/config'
const { show_logo } = config

import './index.less'

export default defineComponent({
  name: 'Silder',
  components: {
    Scrollbar,
    Item
  },
  props: {
    collapsed: {
      type: Boolean as PropType<boolean>,
      default: true
    },
    inlineIndent: {
      type: Number as PropType<number>,
      default: 24
    },
    forceSubMenuRender: {
      type: Boolean as PropType<boolean>,
      default: false
    },
    mode: {
      type: String as PropType<'vertical' | 'horizontal' | 'vertical-right' | 'inline'>,
      default: 'inline'
    },
    theme: {
      type: String as PropType<'light' | 'dark'>,
      default: 'dark'
    }
  },
  setup(props) {
    const { currentRoute, push } = useRouter()
    const { resolvePath, treeFindRouter, getFullPath, findCurrentRoute } = setSidebarItem()
    const routers = computed((): RouteRecordRaw[] => {
      return permissionStore.routers
    })
    const selectedKeys = ref<string[]>([])
    const openKeys = ref<string[]>([])
    const activeMenuName = ref<string>('')

    watch(
      () => currentRoute.value,
      (route: RouteLocationNormalizedLoaded) => {
        setSelectedKeys(route)
      },
      {
        immediate: true
      }
    )

    watch(
      () => props.collapsed,
      (collapsed: boolean) => {
        setOpenKeys(currentRoute.value, collapsed)
      },
      {
        immediate: true
      }
    )

    function handleOpenChange(keyArr: string[]) {
      // 需要自己管理openKeys
      openKeys.value = keyArr
    }

    function setOpenKeys(route: RouteLocationNormalizedLoaded, collapsed: boolean) {
      let currentRoute: any = null
      if (route.meta.activeMenu) {
        currentRoute = findCurrentRoute(routers.value, route.meta.activeMenu)
      } else {
        currentRoute = route
      }
      const parentRoute: RouteRecordRaw[] = treeFindRouter(permissionStore.routers, (data: any) => data.name === currentRoute.name)
      openKeys.value = collapsed ? [] : getFullPath(parentRoute.map((v: RouteRecordRaw) => v.path))
    }

    function setSelectedKeys(route: RouteLocationNormalizedLoaded) {
      const { meta, path, name } = route
      activeMenuName.value = name as string
      if (meta.activeMenu) {
        selectedKeys.value = [meta.activeMenu]
        return
      }
      selectedKeys.value = [path]
    }

    function highlightMenu(className: string, basePath: string) {
      const parentRoute: RouteRecordRaw[] = treeFindRouter(permissionStore.routers, (data: any) => data.name === currentRoute.value.name)
      const parentFullPath: string[] = getFullPath(parentRoute.map((v: RouteRecordRaw) => v.path))
      return findIndex(parentFullPath, (item: string) => item === basePath) !== -1 ? className : ''
    }

    function handleMenuClick({ key }: any) {
      console.log(key)
      if (isExternal(key)) {
        window.open(key)
      } else {
        push({ path: key })
      }
    }

    // function renderMenu(routers: RouteRecordRaw[], basePath = '/') {
    //   if (routers && routers.length) {
    //     return routers.map((item: RouteRecordRaw) => {
    //       if (!item.meta?.hidden) {
    //         const _basePath = resolvePath(basePath, item.path)
    //         const { onlyOneChild, hasOneShowingChild } = setSidebarItem()
    //         if (hasOneShowingChild(item.children, item) && (!onlyOneChild.value.children || onlyOneChild.value.noShowingChildren) && !item.meta?.alwaysShow) {
    //           return (
    //             <Menu.Item key={resolvePath(_basePath, onlyOneChild.value.path)} v-slots={{
    //               default: () => [
    //                 <Item
    //                   icon={onlyOneChild.value.meta && onlyOneChild.value.meta.icon}
    //                   title={onlyOneChild.value.meta?.title}
    //                 />
    //               ]
    //             }}>
    //             </Menu.Item>
    //           )
    //         } else {
    //           return (
    //             <Menu.SubMenu
    //               key={_basePath}
    //               class={highlightMenu(props.theme + '-active-item', _basePath)}
    //               popupClassName={highlightMenu(props.theme + '-popup-active-item', _basePath)}
    //               v-slots={{
    //                 title: () => [
    //                   <Item
    //                     icon={item.meta && item.meta.icon}
    //                     title={item.meta?.title}
    //                   />
    //                 ]
    //               }}
    //             >
    //               {renderMenu(item.children as any, _basePath)}
    //             </Menu.SubMenu>
    //           )
    //         }
    //       }
    //     })
    //   }
    // }

    // return () => {
    //   return (
    //     // <div class={{ 'has-logo': show_logo, 'sidebar-container': true }}>
    //     //   <scrollbar class='menu-wrap'>
    //     //     <Menu
    //     //       selectedKeys={selectedKeys.value}
    //     //       openKeys={openKeys.value}
    //     //       theme={props.theme}
    //     //       mode={props.mode}
    //     //       onClick={handleMenuClick}
    //     //       onOpenChange={handleOpenChange}
    //     //     >
    //     //       {renderMenu(routers.value)}
    //     //     </Menu>
    //     //   </scrollbar>
    //     // </div>
    //   )
    // }
  }
})
