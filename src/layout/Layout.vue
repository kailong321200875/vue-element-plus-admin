<script lang="tsx">
import { computed, defineComponent, KeepAlive } from 'vue'
import { useTagsViewStore } from '@/store/modules/tagsView'
import { useAppStore } from '@/store/modules/app'
import { Menu } from '@/components/Menu'
import { useDesign } from '@/hooks/web/useDesign'
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
              'h-[var(--top-tool-height)] relative px-[var(--top-tool-p-x)] flex items-center'
            ]}
          >
            ssss
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

.@{prefix-cls} {
  &-right {
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
