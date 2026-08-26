<script lang="tsx">
  import { defineComponent } from 'vue'
  import { ThemeSwitch } from '@vea/components'
  import { Collapse } from '@/components/Collapse'
  import { LocaleDropdown } from '@/components/LocaleDropdown'
  import { UserInfo } from '@/components/UserInfo'
  import { Breadcrumb } from '@/components/Breadcrumb'
  import { appConfig } from '@/config/app'
  import { useAppStore } from '@/store/modules/app'
  import LayoutSwitcher from './LayoutSwitcher.vue'

  const prefixCls = 'v-tool-header'

  export default defineComponent({
    name: 'ToolHeader',
    props: {
      showCollapse: {
        type: Boolean,
        default: true
      },
      showBreadcrumb: {
        type: Boolean,
        default: true
      }
    },
    setup(props) {
      const appStore = useAppStore()
      const updateTheme = (isDark: boolean) => {
        appStore.isDark = isDark
      }

      return () => (
        <div
          id="v-tool-header"
          class={[
            prefixCls,
            'h-[var(--top-tool-height)] relative px-[var(--top-tool-p-x)] flex items-center justify-between'
          ]}
        >
          {props.showCollapse || props.showBreadcrumb ? (
            <div class="h-full flex items-center min-w-0">
              {appConfig.ui.hamburger && props.showCollapse ? (
                <Collapse class="header-action" color="var(--top-header-text-color)"></Collapse>
              ) : undefined}
              {appConfig.ui.breadcrumb && props.showBreadcrumb ? (
                <Breadcrumb class="<md:hidden"></Breadcrumb>
              ) : undefined}
            </div>
          ) : undefined}
          <div class="h-full flex items-center">
            <LayoutSwitcher></LayoutSwitcher>
            {appConfig.ui.theme ? (
              <ThemeSwitch
                modelValue={appStore.isDark}
                {...{ 'onUpdate:modelValue': updateTheme }}
                class="header-action"
              ></ThemeSwitch>
            ) : undefined}
            {appConfig.ui.locale ? (
              <LocaleDropdown
                class="header-action"
                color="var(--top-header-text-color)"
              ></LocaleDropdown>
            ) : undefined}
            <UserInfo></UserInfo>
          </div>
        </div>
      )
    }
  })
</script>

<style lang="less" scoped>
  @prefix-cls: v-tool-header;

  .@{prefix-cls} {
    transition: left var(--transition-time-02);

    :deep(.el-switch.header-action) {
      height: 100%;

      &:hover,
      &:focus-within {
        background: var(--top-header-hover-color);
      }
    }

    :deep(.locale-dropdown) {
      height: 100%;
    }

    :deep(.locale-trigger.header-action) {
      height: 100%;
      padding: 0 10px;

      &:hover,
      &:focus-visible {
        color: var(--el-color-primary) !important;
        background: var(--top-header-hover-color);
        outline: none;
      }
    }
  }
</style>
