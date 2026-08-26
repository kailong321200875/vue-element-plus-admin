<script lang="tsx">
  import { computed, defineComponent, unref, type PropType } from 'vue'
  import { ElMenu, ElScrollbar } from 'element-plus'
  import { useRouter } from 'vue-router'
  import { useAppStore } from '@/store/modules/app'
  import { usePermissionStore } from '@/store/modules/permission'
  import { appConfig } from '@/config/app'
  import { isUrl } from '@/utils/routerHelper'
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
      }
    },
    setup(props) {
      const appStore = useAppStore()
      const permissionStore = usePermissionStore()
      const { push, currentRoute } = useRouter()

      const menuMode = computed(() => props.mode)
      const menuRouters = computed(() => props.routers ?? permissionStore.routers)
      const isCollapsed = computed(() => props.mode === 'vertical' && appStore.collapse)
      const activeMenu = computed(() => {
        const { meta, path } = unref(currentRoute)
        return (meta.activeMenu as string) || path
      })
      const { renderMenuItem } = useRenderMenuItem(menuMode)

      const handleSelect = (index: string) => {
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
          backgroundColor={
            props.mode === 'horizontal' ? 'var(--top-header-bg-color)' : 'var(--left-menu-bg-color)'
          }
          textColor={
            props.mode === 'horizontal'
              ? 'var(--top-header-text-color)'
              : 'var(--left-menu-text-color)'
          }
          activeTextColor={
            props.mode === 'horizontal'
              ? 'var(--el-color-primary)'
              : 'var(--left-menu-text-active-color)'
          }
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
      padding: 8px 0;
      border: none;

      .el-sub-menu__title,
      .el-menu-item {
        width: calc(100% - 20px);
        height: 44px;
        margin: 3px 10px;
        line-height: 44px;
        border-radius: 10px;
        transition:
          color 160ms ease,
          background-color 160ms ease;
      }

      .el-sub-menu__icon-arrow {
        width: 1em;
      }

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
        font-weight: 600;
        color: var(--left-menu-text-active-color) !important;
        background-color: var(--left-menu-bg-active-color) !important;
      }

      .el-menu--inline {
        display: flex;
        flex-direction: column;
        gap: 6px;
        padding: 6px 0 0;
        background-color: var(--left-menu-bg-light-color) !important;

        > .el-sub-menu {
          display: flex;
          flex-direction: column;
        }

        .el-menu-item {
          margin-top: 0;
          margin-bottom: 0;
        }
      }
    }

    :deep(.el-menu--collapse) {
      width: var(--left-menu-min-width);

      > .el-menu-item,
      > .el-sub-menu > .el-sub-menu__title {
        justify-content: center;
        width: 48px;
        padding: 0 !important;
        margin-right: 12px;
        margin-left: 12px;
      }

      .v-icon {
        flex: none;
        width: 22px;
        height: 22px;
      }
    }

    &--vertical {
      :deep(.el-menu > .el-sub-menu > .el-sub-menu__title) {
        margin-top: 0;
        margin-bottom: 0;
      }

      :deep(.el-menu--vertical > .el-sub-menu) {
        margin: 3px 0;
      }

      :deep(.el-sub-menu__title),
      :deep(.el-menu-item) {
        gap: 10px;
      }

      :deep(.el-menu--collapse) {
        > .el-menu-item,
        > .el-sub-menu > .el-sub-menu__title {
          gap: 0;
        }
      }
    }

    &--horizontal {
      flex: 1;
      min-width: 0;
      background: transparent;

      :deep(.el-menu--horizontal) {
        gap: 4px;
        align-items: center;
        height: var(--top-tool-height);
        padding: 0 12px;
        background: transparent;

        > .el-menu-item,
        > .el-sub-menu .el-sub-menu__title {
          width: auto;
          height: 38px;
          padding: 0 15px;
          margin: 0;
          line-height: 38px;
          color: var(--top-header-text-color) !important;
          border: 0;
          border-radius: 10px;

          &:hover {
            color: var(--el-color-primary) !important;
            background: var(--top-header-hover-color) !important;
          }
        }

        > .el-menu-item.is-active,
        > .el-sub-menu.is-active .el-sub-menu__title {
          font-weight: 600;
          color: var(--el-color-primary) !important;
          background: var(--el-color-primary-light-9) !important;
        }
      }
    }
  }
</style>

<style lang="less">
  .v-menu-popper--vertical,
  .v-submenu-popper--vertical {
    overflow: hidden;
    border: 1px solid var(--layout-border-color) !important;
    border-radius: 12px !important;
    box-shadow: var(--layout-shadow) !important;

    .el-menu {
      padding: 6px;
      background-color: var(--left-menu-bg-color) !important;
    }

    .el-sub-menu__title,
    .el-menu-item {
      height: 40px;
      margin: 2px 0;
      line-height: 40px;
      color: var(--left-menu-text-color) !important;
      border-radius: 8px;

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

  .v-menu-popper--horizontal {
    overflow: hidden;
    border: 1px solid var(--layout-border-color) !important;
    border-radius: 12px !important;
    box-shadow: var(--layout-shadow) !important;

    .el-menu {
      min-width: 180px;
      padding: 6px;
      background-color: var(--top-header-bg-color) !important;
    }

    .el-sub-menu__title,
    .el-menu-item {
      height: 40px;
      margin: 2px 0;
      line-height: 40px;
      color: var(--top-header-text-color) !important;
      border-radius: 8px;

      &:hover {
        color: var(--el-color-primary) !important;
        background-color: var(--top-header-hover-color) !important;
      }
    }

    .el-menu-item.is-active {
      font-weight: 600;
      color: var(--el-color-primary) !important;
      background-color: var(--el-color-primary-light-9) !important;
    }
  }

  .v-submenu-popper--vertical {
    max-height: 100%;
    overflow-y: auto;
  }
</style>
