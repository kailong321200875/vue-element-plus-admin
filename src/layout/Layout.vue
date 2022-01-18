<script lang="tsx">
import { computed, defineComponent } from 'vue'
import { useAppStore } from '@/store/modules/app'
import { Menu } from '@/components/Menu'
import { Collapse } from '@/components/Collapse'
import { LocaleDropdown } from '@/components/LocaleDropdown'
import { SizeDropdown } from '@/components/SizeDropdown'
import { UserInfo } from '@/components/UserInfo'
import { Screenfull } from '@/components/Screenfull'
import { Breadcrumb } from '@/components/Breadcrumb'
import { TagsView } from '@/components/TagsView'
import { Backtop } from '@/components/Backtop'
import { Setting } from '@/components/Setting'
import AppView from './components/AppView.vue'

const appStore = useAppStore()

// 是否是移动端
const mobile = computed(() => appStore.getMobile)

// 面包屑
const breadcrumb = computed(() => appStore.getBreadcrumb)

// 菜单折叠
const collapse = computed(() => appStore.getCollapse)

// 折叠图标
const hamburger = computed(() => appStore.getHamburger)

// 全屏图标
const screenfull = computed(() => appStore.getScreenfull)

// 尺寸图标
const size = computed(() => appStore.getSize)

// 多语言图标
const locale = computed(() => appStore.getLocale)

// 标签页
const tagsView = computed(() => appStore.getTagsView)

const classSuffix = computed(() => appStore.getLayout)

const handleClickOutside = () => {
  appStore.setCollapse(true)
}

export default defineComponent({
  name: 'Layout',
  setup() {
    return () => (
      <section class={['v-app', `v-app__${classSuffix.value}`, 'w-[100%] h-[100%] relative']}>
        {mobile.value && !collapse.value ? (
          <div
            class="absolute top-0 left-0 w-full h-full opacity-30 z-99 bg-[var(--el-color-black)]"
            onClick={handleClickOutside}
          ></div>
        ) : undefined}
        <Menu class="absolute top-0 left-0"></Menu>
        <div
          class={[
            'v-app-right',
            'absolute top-0 h-[100%]',
            collapse.value
              ? 'w-[calc(100%-var(--left-menu-min-width))]'
              : 'w-[calc(100%-var(--left-menu-max-width))]',
            collapse.value
              ? 'left-[var(--left-menu-min-width)]'
              : 'left-[var(--left-menu-max-width)]',
            '<md:(!left-0 !w-[100%])'
          ]}
        >
          <div
            class={[
              'v-app-right__tool',
              'h-[var(--top-tool-height)] relative px-[var(--top-tool-p-x)] flex items-center justify-between'
            ]}
          >
            <div class="h-full flex items-center">
              {hamburger.value ? <Collapse class="header__tigger"></Collapse> : undefined}
              {breadcrumb.value ? <Breadcrumb class="<md:hidden"></Breadcrumb> : undefined}
            </div>
            <div class="h-full flex items-center">
              {screenfull.value ? <Screenfull class="header__tigger"></Screenfull> : undefined}
              {size.value ? <SizeDropdown class="header__tigger"></SizeDropdown> : undefined}
              {locale.value ? <LocaleDropdown class="header__tigger"></LocaleDropdown> : undefined}
              <UserInfo class="header__tigger"></UserInfo>
            </div>
          </div>
          {tagsView.value ? (
            <div class="v-app-right__tags-view relative">
              <TagsView></TagsView>
            </div>
          ) : undefined}

          <AppView></AppView>
        </div>

        <Backtop></Backtop>

        <Setting></Setting>
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

    &__tool,
    &__tags-view {
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
