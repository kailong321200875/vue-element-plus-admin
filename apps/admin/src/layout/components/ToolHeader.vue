<script lang="tsx">
  import { defineComponent, computed } from 'vue'
  import { Collapse } from '@/components/Collapse'
  import { LocaleDropdown } from '@/components/LocaleDropdown'
  import { SizeDropdown } from '@/components/SizeDropdown'
  import { UserInfo } from '@/components/UserInfo'
  import { Screenfull } from '@/components/Screenfull'
  import { Breadcrumb } from '@/components/Breadcrumb'
  import { useAppStore } from '@/store/modules/app'
  import { useDesign } from '@/hooks/web/useDesign'
  import { appConfig } from '@/config/app'

  const { getPrefixCls, variables } = useDesign()

  const prefixCls = getPrefixCls('tool-header')

  const appStore = useAppStore()

  // 布局
  const layout = computed(() => appStore.layout)

  export default defineComponent({
    name: 'ToolHeader',
    setup() {
      return () => (
        <div
          id={`${variables.namespace}-tool-header`}
          class={[
            prefixCls,
            'h-[var(--top-tool-height)] relative px-[var(--top-tool-p-x)] flex items-center justify-between'
          ]}
        >
          {layout.value !== 'top' ? (
            <div class="h-full flex items-center">
              {appConfig.ui.hamburger && layout.value !== 'cutMenu' ? (
                <Collapse class="custom-hover" color="var(--top-header-text-color)"></Collapse>
              ) : undefined}
              {appConfig.ui.breadcrumb ? <Breadcrumb class="<md:hidden"></Breadcrumb> : undefined}
            </div>
          ) : undefined}
          <div class="h-full flex items-center">
            {appConfig.ui.screenfull ? (
              <Screenfull class="custom-hover" color="var(--top-header-text-color)"></Screenfull>
            ) : undefined}
            {appConfig.ui.componentSize ? (
              <SizeDropdown
                class="custom-hover"
                color="var(--top-header-text-color)"
              ></SizeDropdown>
            ) : undefined}
            {appConfig.ui.locale ? (
              <LocaleDropdown
                class="custom-hover"
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
  @prefix-cls: ~'@{adminNamespace}-tool-header';

  .@{prefix-cls} {
    transition: left var(--transition-time-02);
  }
</style>
