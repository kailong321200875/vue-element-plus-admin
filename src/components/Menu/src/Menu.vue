<script lang="tsx">
import { computed, defineComponent } from 'vue'
import { ElMenu, ElScrollbar } from 'element-plus'
import { useDesign } from '@/hooks/web/useDesign'
import { useAppStore } from '@/store/modules/app'
import { usePermissionStore } from '@/store/modules/permission'
import type { LayoutType } from '@/config/app'
import { useRenderMenuItem } from './components/useRenderMenuItem'
import { useRouter } from 'vue-router'
import { isUrl } from '@/utils/is'

export default defineComponent({
  name: 'Menu',
  setup() {
    const appStore = useAppStore()

    const { push, currentRoute } = useRouter()

    const permissionStore = usePermissionStore()

    const { getPrefixCls } = useDesign()

    const preFixCls = getPrefixCls('menu')

    const menuMode = computed(() => {
      // 水平模式
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
      const { meta, path } = currentRoute.value
      // if set path, the sidebar will highlight the path you set
      if (meta.activeMenu) {
        return meta.activeMenu as string
      }
      return path
    })

    function menuSelect(index: string) {
      if (isUrl(index)) {
        window.open(index)
      } else {
        push(index)
      }
    }

    return () => (
      <div
        class={[
          preFixCls,
          'h-[100%] overflow-hidden',
          appStore.getCollapse
            ? 'w-[var(--left-menu-min-width)]'
            : 'w-[var(--left-menu-max-width)]',
          'bg-[var(--left-menu-bg-color)]'
        ]}
      >
        <ElScrollbar>
          <ElMenu
            defaultActive={activeMenu.value}
            mode={menuMode.value}
            collapse={collapse.value}
            backgroundColor="var(--left-menu-bg-color)"
            textColor="var(--left-menu-text-color)"
            activeTextColor="var(--left-menu-text-active-color)"
            onSelect={menuSelect}
          >
            {{
              default: () => {
                const { renderMenuItem } = useRenderMenuItem(routers.value)
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
  :deep(.el-menu) {
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

  :deep(.el-menu--collapse) {
    width: var(--left-menu-min-width);
  }
}
</style>
