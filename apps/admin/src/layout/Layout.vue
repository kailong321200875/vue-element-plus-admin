<script lang="tsx">
  import { computed, defineComponent, unref } from 'vue'
  import { useAppStore } from '@/store/modules/app'
  import { Backtop } from '@/components/Backtop'
  import { useRenderLayout } from './components/useRenderLayout'
  import { useDesign } from '@/hooks/web/useDesign'

  const { getPrefixCls } = useDesign()

  const prefixCls = getPrefixCls('layout')

  const appStore = useAppStore()

  // 是否是移动端
  const mobile = computed(() => appStore.mobile)

  // 菜单折叠
  const collapse = computed(() => appStore.collapse)

  const layout = computed(() => appStore.layout)

  const handleClickOutside = () => {
    appStore.collapse = true
  }

  const renderLayout = () => {
    const { renderClassic, renderTopLeft, renderTop, renderCutMenu } = useRenderLayout()
    switch (unref(layout)) {
      case 'classic':
        return renderClassic()
      case 'topLeft':
        return renderTopLeft()
      case 'top':
        return renderTop()
      case 'cutMenu':
        return renderCutMenu()
      default:
        break
    }
  }

  export default defineComponent({
    name: 'Layout',
    setup() {
      return () => (
        <section class={[prefixCls, `${prefixCls}__${layout.value}`, 'w-[100%] h-[100%] relative']}>
          {mobile.value && !collapse.value ? (
            <div
              class="absolute top-0 left-0 w-full h-full opacity-30 z-99 bg-[var(--el-color-black)]"
              onClick={handleClickOutside}
            ></div>
          ) : undefined}

          {renderLayout()}

          <Backtop></Backtop>
        </section>
      )
    }
  })
</script>

<style lang="less" scoped>
  @prefix-cls: ~'@{adminNamespace}-layout';

  .@{prefix-cls} {
    background-color: var(--app-content-bg-color);
  }
</style>
