<script lang="tsx">
import { computed, defineComponent, unref } from 'vue'
import { ElMenu, ElScrollbar } from 'element-plus'
import { useAppStore } from '@/store/modules/app'
import { usePermissionStore } from '@/store/modules/permission'
import type { LayoutType } from '@/config/app'
import { useRenderMenuItem } from './components/useRenderMenuItem'
import { useRouter } from 'vue-router'
import { isUrl } from '@/utils/is'
import { Logo } from '@/components/Logo'

export default defineComponent({
  name: 'Menu',
  setup() {
    const appStore = useAppStore()

    const { push, currentRoute } = useRouter()

    const permissionStore = usePermissionStore()

    const menuMode = computed((): 'vertical' | 'horizontal' => {
      // 竖
      const vertical: LayoutType[] = ['classic']

      if (vertical.includes(appStore.getLayout)) {
        return 'vertical'
      } else {
        return 'horizontal'
      }
    })

    const routers = computed(() => permissionStore.getRouters)

    const collapse = computed(() => appStore.getCollapse)

    const activeMenu = computed(() => {
      const { meta, path } = unref(currentRoute)
      // if set path, the sidebar will highlight the path you set
      if (meta.activeMenu) {
        return meta.activeMenu as string
      }
      return path
    })

    const menuSelect = (index: string) => {
      if (isUrl(index)) {
        window.open(index)
      } else {
        push(index)
      }
    }

    return () => (
      <div
        class={[
          'v-menu',
          'h-[100%] overflow-hidden z-100 flex-col',
          appStore.getCollapse
            ? 'w-[var(--left-menu-min-width)]'
            : 'w-[var(--left-menu-max-width)]',
          'bg-[var(--left-menu-bg-color)]'
        ]}
      >
        <Logo></Logo>
        <ElScrollbar class={[{ '!h-[calc(100%-var(--top-tool-height))]': true }]}>
          <ElMenu
            defaultActive={unref(activeMenu)}
            mode={unref(menuMode)}
            collapse={unref(collapse)}
            backgroundColor="var(--left-menu-bg-color)"
            textColor="var(--left-menu-text-color)"
            activeTextColor="var(--left-menu-text-active-color)"
            onSelect={menuSelect}
          >
            {{
              default: () => {
                const { renderMenuItem } = useRenderMenuItem(unref(routers), unref(menuMode))
                return renderMenuItem()
              }
            }}
          </ElMenu>
        </ElScrollbar>
      </div>
    )
  }
})
</script>

<style lang="less" scoped>
@prefix-cls: ~'@{namespace}-menu';

.@{prefix-cls} {
  transition: width var(--transition-time-02);

  :deep(.el-menu) {
    width: 100% !important;
    border-right: none;

    // 设置选中时子标题的颜色
    .is-active {
      & > .el-sub-menu__title {
        color: var(--left-menu-text-active-color) !important;
      }
    }

    // 设置子菜单悬停的高亮和背景色
    .el-sub-menu__title,
    .el-menu-item {
      &:hover {
        color: var(--left-menu-text-active-color) !important;
        background-color: var(--left-menu-bg-color) !important;
      }
    }

    // 设置选中时的高亮背景和高亮颜色
    .el-sub-menu.is-active,
    .el-menu-item.is-active {
      color: var(--left-menu-text-active-color) !important;
      background-color: var(--left-menu-bg-active-color) !important;

      &:hover {
        background-color: var(--left-menu-bg-active-color) !important;
      }
    }

    // 设置子菜单的背景颜色
    .el-menu {
      .el-sub-menu__title,
      .el-menu-item:not(.is-active) {
        background-color: var(--left-menu-bg-light-color) !important;
      }
    }
  }

  // 折叠时的最小宽度
  :deep(.el-menu--collapse) {
    width: var(--left-menu-min-width);

    & > .is-active,
    & > .is-active > .el-sub-menu__title {
      background-color: var(--left-menu-collapse-bg-active-color) !important;
    }
  }

  // 折叠动画的时候，就需要把文字给隐藏掉
  :deep(.horizontal-collapse-transition) {
    // transition: 0s width ease-in-out, 0s padding-left ease-in-out, 0s padding-right ease-in-out !important;
    .@{prefix-cls}__title {
      display: none;
    }
  }
}
</style>

<style lang="less">
@prefix-cls: ~'@{namespace}-menu-popper';

.@{prefix-cls} {
  &--vertical {
    // 设置选中时子标题的颜色
    .is-active {
      & > .el-sub-menu__title {
        color: var(--left-menu-text-active-color) !important;
      }
    }

    // 设置子菜单悬停的高亮和背景色
    .el-sub-menu__title,
    .el-menu-item {
      &:hover {
        color: var(--left-menu-text-active-color) !important;
        background-color: var(--left-menu-bg-color) !important;
      }
    }

    // 设置选中时的高亮背景
    .el-menu-item.is-active {
      background-color: var(--left-menu-bg-active-color) !important;

      &:hover {
        background-color: var(--left-menu-bg-active-color) !important;
      }
    }
  }
}
</style>
