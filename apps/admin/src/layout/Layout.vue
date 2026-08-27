<script setup lang="ts">
  import { computed } from 'vue'
  import { ElScrollbar } from 'element-plus'
  import { useRouter } from 'vue-router'
  import { useAppStore } from '@/store/modules/app'
  import { usePermissionStore } from '@/store/modules/permission'
  import { isUrl, pathResolve } from '@/utils/routerHelper'
  import { Menu } from '@/components/Menu'
  import { TagsView } from '@/components/TagsView'
  import { Logo } from '@/components/Logo'
  import { Backtop } from '@/components/Backtop'
  import AppView from './components/AppView.vue'
  import ToolHeader from './components/ToolHeader.vue'
  import PrimaryNav from './components/PrimaryNav.vue'

  const appStore = useAppStore()
  const permissionStore = usePermissionStore()
  const router = useRouter()

  const visibleRoutes = computed(() =>
    permissionStore.routers.filter((route) => !route.meta?.hidden)
  )
  const layout = computed(() => (appStore.mobile ? 'sidebar' : appStore.layout))
  const activePrimary = computed(
    () =>
      visibleRoutes.value.find(
        (route) =>
          router.currentRoute.value.path === route.path ||
          router.currentRoute.value.path.startsWith(`${route.path}/`)
      ) ?? visibleRoutes.value[0]
  )

  const makeAbsoluteRoutes = (
    routes: AppRouteRecordRaw[],
    parentPath: string
  ): AppRouteRecordRaw[] =>
    routes.map((route) => {
      const path = isUrl(route.path) ? route.path : pathResolve(parentPath, route.path)
      return {
        ...route,
        path,
        children: route.children ? makeAbsoluteRoutes(route.children, path) : undefined
      }
    })

  const secondaryRoutes = computed(() =>
    activePrimary.value?.children
      ? makeAbsoluteRoutes(activePrimary.value.children, activePrimary.value.path)
      : []
  )

  const firstRoutePath = (route: AppRouteRecordRaw, parentPath = '/') => {
    if (typeof route.redirect === 'string') return route.redirect
    const path = isUrl(route.path) ? route.path : pathResolve(parentPath, route.path)
    const child = route.children?.find((item) => !item.meta?.hidden)
    return child ? firstRoutePath(child, path) : path
  }

  const selectPrimary = (route: AppRouteRecordRaw) => {
    const path = firstRoutePath(route)
    if (isUrl(path)) {
      window.open(path)
    } else {
      router.push(path)
    }
  }

  const closeMobileMenu = () => {
    appStore.collapse = true
  }
</script>

<template>
  <section :class="['v-layout', `v-layout--${layout}`]">
    <header v-if="layout === 'top' || layout === 'mixed'" class="v-layout__topbar">
      <Logo />
      <Menu v-if="layout === 'top'" mode="horizontal" />
      <PrimaryNav
        v-else
        :routes="visibleRoutes"
        :active-path="activePrimary?.path"
        @select="selectPrimary"
      />
      <ToolHeader
        :show-collapse="layout === 'mixed'"
        :show-breadcrumb="false"
        class="v-layout__top-tools"
      />
    </header>

    <div class="v-layout__body">
      <aside
        v-if="layout === 'sidebar'"
        :class="[
          'v-layout__sidebar',
          { 'is-collapsed': appStore.collapse, 'is-mobile': appStore.mobile }
        ]"
      >
        <Logo />
        <Menu />
      </aside>

      <aside v-if="layout === 'dual'" class="v-layout__rail">
        <Logo compact />
        <ElScrollbar>
          <PrimaryNav
            mode="rail"
            :routes="visibleRoutes"
            :active-path="activePrimary?.path"
            @select="selectPrimary"
          />
        </ElScrollbar>
      </aside>

      <aside
        v-if="layout === 'mixed' || layout === 'dual'"
        :class="['v-layout__secondary', { 'is-collapsed': appStore.collapse }]"
      >
        <div v-if="!appStore.collapse" class="v-layout__secondary-title">
          {{ activePrimary?.meta?.title ? $t(activePrimary.meta.title) : '' }}
        </div>
        <Menu :routers="secondaryRoutes" />
      </aside>

      <main class="v-layout__workspace">
        <ToolHeader v-if="layout === 'sidebar' || layout === 'dual'" class="v-layout__toolbar" />
        <TagsView class="v-layout__tags" />
        <ElScrollbar v-loading="appStore.pageLoading" class="v-layout-content-scrollbar">
          <AppView />
        </ElScrollbar>
      </main>
    </div>

    <button
      v-if="appStore.mobile && !appStore.collapse"
      class="v-layout__mask"
      type="button"
      aria-label="关闭导航菜单"
      @click="closeMobileMenu"
    ></button>

    <Backtop />
  </section>
</template>

<style lang="less" scoped>
  .v-layout {
    display: flex;
    flex-direction: column;
    width: 100%;
    height: 100%;
    overflow: hidden;
    background: var(--app-content-bg-color);

    &__topbar {
      z-index: 20;
      display: flex;
      flex: none;
      align-items: center;
      height: var(--top-tool-height);
      background: color-mix(in srgb, var(--top-header-bg-color) 94%, transparent);
      border-bottom: 1px solid var(--layout-border-color);
      box-shadow: var(--layout-shadow);
      backdrop-filter: blur(16px);

      :deep(.v-logo) {
        min-width: var(--left-menu-max-width);
      }
    }

    &__top-tools {
      flex: none;
      padding-left: 6px;
      border-left: 1px solid var(--layout-border-color);
    }

    &__body {
      display: flex;
      flex: 1;
      min-height: 0;
    }

    &__sidebar,
    &__secondary,
    &__rail {
      z-index: 30;
      display: flex;
      flex: none;
      flex-direction: column;
      min-height: 0;
      overflow: hidden;
      background: var(--left-menu-bg-color);
      border-right: 1px solid var(--layout-border-color);
      transition:
        width var(--transition-time-02),
        transform var(--transition-time-02);
    }

    &__sidebar {
      width: var(--left-menu-max-width);

      &.is-collapsed {
        width: var(--left-menu-min-width);
      }
    }

    &__secondary {
      width: var(--left-menu-max-width);
      background: var(--left-menu-bg-light-color);

      :deep(.v-menu) {
        background: transparent !important;
      }

      &.is-collapsed {
        width: var(--left-menu-min-width);
      }
    }

    &__secondary-title {
      height: 46px;
      padding: 0 18px;
      overflow: hidden;
      font-size: 13px;
      font-weight: 700;
      line-height: 46px;
      color: var(--logo-title-text-color);
      text-overflow: ellipsis;
      white-space: nowrap;
      border-bottom: 1px solid var(--layout-border-color);
      flex: none;

      &::before {
        display: inline-block;
        width: 6px;
        height: 6px;
        margin-right: 9px;
        vertical-align: 1px;
        background: var(--el-color-primary);
        border-radius: 50%;
        content: '';
        box-shadow: 0 0 0 4px var(--el-color-primary-light-9);
      }
    }

    &__rail {
      width: var(--layout-rail-width);

      :deep(.v-logo) {
        justify-content: center;
        width: var(--layout-rail-width);
        padding: 0;
      }
    }

    &__workspace {
      display: flex;
      flex: 1;
      flex-direction: column;
      min-width: 0;
      min-height: 0;
    }

    &__toolbar,
    &__tags {
      z-index: 10;
      flex: none;
      background: color-mix(in srgb, var(--top-header-bg-color) 96%, transparent);
      border-bottom: 1px solid var(--layout-border-color);
      backdrop-filter: blur(16px);
    }

    &__toolbar {
      z-index: 20;
      box-shadow: var(--layout-shadow);
    }

    &-content-scrollbar {
      flex: 1;
      min-height: 0;
    }

    &__mask {
      position: fixed;
      inset: 0;
      z-index: 25;
      cursor: pointer;
      background: rgb(15 23 42 / 45%);
      border: 0;
      backdrop-filter: blur(2px);
    }
  }

  @media (width <= 767px) {
    .v-layout {
      &__sidebar.is-mobile {
        position: fixed;
        inset: 0 auto 0 0;
        z-index: 30;
        width: min(82vw, var(--left-menu-max-width));
        box-shadow: 20px 0 50px rgb(15 23 42 / 25%);

        &.is-collapsed {
          transform: translateX(-100%);
        }

        :deep(.v-menu) {
          width: 100%;
        }
      }
    }
  }

  @media (prefers-reduced-motion: reduce) {
    .v-layout__sidebar,
    .v-layout__secondary,
    .v-layout__rail {
      transition: none;
    }
  }
</style>
