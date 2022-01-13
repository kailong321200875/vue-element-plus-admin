<script lang="tsx">
import { computed, defineComponent, KeepAlive } from 'vue'
import { useTagsViewStore } from '@/store/modules/tagsView'
import { useAppStore } from '@/store/modules/app'
import { Menu } from '@/components/Menu'
import { useDesign } from '@/hooks/web/useDesign'
import { Collapse } from '@/components/Collapse'
import { LocaleDropdown } from '@/components/LocaleDropdown'
import { SizeDropdown } from '@/components/SizeDropdown'
import { UserInfo } from '@/components/UserInfo'
import { Screenfull } from '@/components/Screenfull'
// import { TagsView } from '@/components/TagsView'

const tagsViewStore = useTagsViewStore()

const getCaches = computed((): string[] => {
  return tagsViewStore.getCachedViews
})

const appStore = useAppStore()

const classSuffix = computed(() => appStore.getLayout)

const { getPrefixCls } = useDesign()

const perFixCls = getPrefixCls('app')

export default defineComponent({
  name: 'Layout',
  setup() {
    return () => (
      <section
        class={[perFixCls, `${perFixCls}__${classSuffix.value}`, 'w-[100%] h-[100%] relative']}
      >
        <Menu class="absolute top-0 left-0"></Menu>
        <div
          class={[
            `${perFixCls}-right`,
            'absolute top-0 h-[100%]',
            appStore.getCollapse
              ? 'w-[calc(100%-var(--left-menu-min-width))]'
              : 'w-[calc(100%-var(--left-menu-max-width))]',
            appStore.getCollapse
              ? 'left-[var(--left-menu-min-width)]'
              : 'left-[var(--left-menu-max-width)]'
          ]}
        >
          <div
            class={[
              `${perFixCls}-right__tool`,
              'h-[var(--top-tool-height)] relative px-[var(--top-tool-p-x)] flex items-center justify-between'
            ]}
          >
            <div class="h-full flex items-center">
              <Collapse class="header__tigger"></Collapse>
            </div>
            <div class="h-full flex items-center">
              <Screenfull class="header__tigger"></Screenfull>
              <SizeDropdown class="header__tigger"></SizeDropdown>
              <LocaleDropdown class="header__tigger"></LocaleDropdown>
              <UserInfo class="header__tigger"></UserInfo>
            </div>
          </div>
          <router-view>
            {{
              default: ({ Component, route }) => (
                <KeepAlive include={getCaches.value}>
                  <Component is={Component} key={route.fullPath}></Component>
                </KeepAlive>
              )
            }}
          </router-view>
        </div>
      </section>
    )
  }
})
</script>

<style lang="less" scoped>
@prefix-cls: ~'@{namespace}-app';

.header__tigger {
  display: flex;
  height: 100%;
  padding: 1px 10px 0;
  cursor: pointer;
  align-items: center;
  transition: background var(--transition-time-02);

  &:hover {
    background-color: #f6f6f6;
  }
}

.@{prefix-cls} {
  &-right {
    transition: left var(--transition-time-02);

    &__tool {
      &::after {
        position: absolute;
        bottom: 0;
        left: 0;
        width: 100%;
        height: 1px;
        border-top: 1px solid var(--top-tool-border-color);
        content: '';
      }
    }
  }
}
</style>
