<script lang="tsx">
import { computed, defineComponent, KeepAlive } from 'vue'
import { useTagsViewStore } from '@/store/modules/tagsView'
import { useAppStore } from '@/store/modules/app'
import { Menu } from '@/components/Menu'
import { useDesign } from '@/hooks/web/useDesign'

const tagsViewStore = useTagsViewStore()

const getCaches = computed((): string[] => {
  return tagsViewStore.getCachedViews
})

const appStore = useAppStore()
console.log(appStore)
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
        <Menu></Menu>
        <router-view class="absolute top-0 right-0 ">
          {{
            default: ({ Component, route }) => (
              <KeepAlive include={getCaches.value}>
                <Component is={Component} key={route.fullPath}></Component>
              </KeepAlive>
            )
          }}
        </router-view>
      </section>
    )
  }
})
</script>
