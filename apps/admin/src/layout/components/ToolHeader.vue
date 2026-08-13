<script lang="tsx">
  import { defineComponent } from 'vue'
  import { Collapse } from '@/components/Collapse'
  import { LocaleDropdown } from '@/components/LocaleDropdown'
  import { SizeDropdown } from '@/components/SizeDropdown'
  import { UserInfo } from '@/components/UserInfo'
  import { Screenfull } from '@/components/Screenfull'
  import { Breadcrumb } from '@/components/Breadcrumb'
  import { appConfig } from '@/config/app'
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
                <Collapse class="custom-hover" color="var(--top-header-text-color)"></Collapse>
              ) : undefined}
              {appConfig.ui.breadcrumb && props.showBreadcrumb ? (
                <Breadcrumb class="<md:hidden"></Breadcrumb>
              ) : undefined}
            </div>
          ) : undefined}
          <div class="h-full flex items-center">
            <LayoutSwitcher></LayoutSwitcher>
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
  @prefix-cls: v-tool-header;

  .@{prefix-cls} {
    transition: left var(--transition-time-02);
  }
</style>
