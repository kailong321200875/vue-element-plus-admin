<script lang="tsx">
  import { computed, defineComponent, unref, type PropType } from 'vue'
  import { ElMenu, ElScrollbar } from 'element-plus'
  import { useRouter } from 'vue-router'
  import { useAppStore } from '@/store/modules/app'
  import { usePermissionStore } from '@/store/modules/permission'
  import { appConfig } from '@/config/app'
  import { isUrl } from '@/utils/is'
  import { useRenderMenuItem } from './components/useRenderMenuItem'

  const prefixCls = 'v-menu'

  export default defineComponent({
    name: 'VeMenu',
    props: {
      mode: {
        type: String as PropType<'vertical' | 'horizontal'>,
        default: 'vertical'
      },
      routers: {
        type: Array as PropType<AppRouteRecordRaw[]>,
        default: undefined
      },
      collapsed: {
        type: Boolean,
        default: undefined
      },
      menuSelect: {
        type: Function as PropType<(index: string) => void>,
        default: undefined
      }
    },
    setup(props) {
      const appStore = useAppStore()
      const permissionStore = usePermissionStore()
      const { push, currentRoute } = useRouter()

      const menuMode = computed(() => props.mode)
      const menuRouters = computed(() => props.routers ?? permissionStore.routers)
      const isCollapsed = computed(
        () => props.mode === 'vertical' && (props.collapsed ?? appStore.collapse)
      )
      const activeMenu = computed(() => {
        const { meta, path } = unref(currentRoute)
        return (meta.activeMenu as string) || path
      })
      const { renderMenuItem } = useRenderMenuItem(menuMode)

      const handleSelect = (index: string) => {
        props.menuSelect?.(index)
        if (isUrl(index)) {
          window.open(index)
        } else {
          push(index)
        }
      }

      const renderMenu = () => (
        <ElMenu
          defaultActive={unref(activeMenu)}
          mode={props.mode}
          collapse={unref(isCollapsed)}
          uniqueOpened={props.mode === 'vertical' && appConfig.ui.uniqueOpened}
          backgroundColor="var(--left-menu-bg-color)"
          textColor="var(--left-menu-text-color)"
          activeTextColor="var(--left-menu-text-active-color)"
          popperClass={`${prefixCls}-popper--${props.mode}`}
          onSelect={handleSelect}
        >
          {{ default: () => renderMenuItem(unref(menuRouters)) }}
        </ElMenu>
      )

      return () => (
        <nav
          class={[
            prefixCls,
            `${prefixCls}--${props.mode}`,
            'h-full overflow-hidden bg-[var(--left-menu-bg-color)]',
            {
              'w-[var(--left-menu-min-width)]': unref(isCollapsed),
              'w-[var(--left-menu-max-width)]': !unref(isCollapsed) && props.mode === 'vertical'
            }
          ]}
        >
          {props.mode === 'horizontal' ? renderMenu() : <ElScrollbar>{renderMenu()}</ElScrollbar>}
        </nav>
      )
    }
  })
</script>

<style lang="less" scoped>
  @prefix-cls: v-menu;

  .@{prefix-cls} {
    flex: none;
    transition: width var(--transition-time-02);

    :deep(.el-menu) {
      width: 100%;
      border: none;

      .is-active > .el-sub-menu__title {
        color: var(--left-menu-text-active-color) !important;
      }

      .el-sub-menu__title,
      .el-menu-item {
        &:hover {
          color: var(--left-menu-text-active-color) !important;
          background-color: var(--left-menu-bg-active-color) !important;
        }
      }

      .el-menu-item.is-active {
        color: var(--left-menu-text-active-color) !important;
        background-color: var(--left-menu-bg-active-color) !important;
      }

      .el-menu .el-sub-menu__title,
      .el-menu .el-menu-item:not(.is-active) {
        background-color: var(--left-menu-bg-light-color) !important;
      }
    }

    :deep(.el-menu--collapse) {
      width: var(--left-menu-min-width);
    }

    &--horizontal {
      flex: 1;
      min-width: 0;
      background: transparent;

      :deep(.el-menu--horizontal) {
        height: var(--top-tool-height);
        background: transparent;

        > .el-menu-item,
        > .el-sub-menu .el-sub-menu__title {
          height: var(--top-tool-height);
          color: var(--top-header-text-color) !important;
          border-bottom: 2px solid transparent;
        }

        > .el-menu-item.is-active,
        > .el-sub-menu.is-active .el-sub-menu__title {
          color: var(--el-color-primary) !important;
          background: color-mix(in srgb, var(--el-color-primary) 9%, transparent) !important;
          border-bottom-color: var(--el-color-primary);
        }
      }
    }
  }
</style>

<style lang="less">
  .v-menu-popper--vertical,
  .v-menu-popper--horizontal,
  .v-submenu-popper--vertical {
    .el-menu {
      background-color: var(--left-menu-bg-color) !important;
    }

    .el-sub-menu__title,
    .el-menu-item {
      color: var(--left-menu-text-color) !important;

      &:hover {
        color: var(--left-menu-text-active-color) !important;
        background-color: var(--left-menu-bg-active-color) !important;
      }
    }

    .el-menu-item.is-active {
      color: var(--left-menu-text-active-color) !important;
      background-color: var(--left-menu-bg-active-color) !important;
    }
  }

  .v-submenu-popper--vertical {
    max-height: 100%;
    overflow-y: auto;
  }
</style>
