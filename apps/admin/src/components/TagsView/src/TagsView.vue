<script setup lang="ts">
  import { computed, nextTick, ref, watch } from 'vue'
  import { ElScrollbar, type ScrollbarInstance } from 'element-plus'
  import type { RouteLocationNormalizedLoaded } from 'vue-router'
  import { useRouter } from 'vue-router'
  import { useI18n } from 'vue-i18n'
  import { appConfig } from '@/config/app'
  import { ContextMenu } from '@/components/ContextMenu'
  import type { ContextMenuSchema } from '@/components/ContextMenu'
  import { usePermissionStore } from '@/store/modules/permission'
  import { useTagsViewStore } from '@/store/modules/tagsView'
  import { filterAffixTags } from './helper'

  const prefixCls = 'v-tags-view'
  const { t } = useI18n()
  const { currentRoute, push, replace } = useRouter()
  const permissionStore = usePermissionStore()
  const tagsViewStore = useTagsViewStore()

  const tagsViewRef = ref<HTMLElement>()
  const scrollbarRef = ref<ScrollbarInstance>()
  const routers = computed(() => permissionStore.routers)
  const visitedViews = computed(() => tagsViewStore.visitedViews)
  const activeTag = computed(() =>
    visitedViews.value.find((view) => view.path === currentRoute.value.path)
  )
  const defaultPath = computed(
    () => permissionStore.addRouters.find((route) => !route.meta?.hidden)?.path ?? '/'
  )

  const isActive = (view: RouteLocationNormalizedLoaded) => view.path === currentRoute.value.path

  const getTagIcon = (view: RouteLocationNormalizedLoaded) => {
    if (!appConfig.ui.tagsViewIcon) return
    return (
      [...(view.matched ?? [])].reverse().find((route) => route.meta?.icon)?.meta.icon ??
      view.meta?.icon
    )
  }

  const moveActiveIntoView = async () => {
    await nextTick()
    tagsViewRef.value
      ?.querySelector<HTMLElement>(`.${prefixCls}__item.is-active`)
      ?.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'nearest' })
  }

  const scrollTags = (left: number) => {
    scrollbarRef.value?.wrapRef?.scrollBy({ left, behavior: 'smooth' })
  }

  const navigateTo = (view?: RouteLocationNormalizedLoaded) =>
    push(view?.fullPath || defaultPath.value)

  const closeTag = async (view: RouteLocationNormalizedLoaded) => {
    if (view.meta?.affix) return

    const index = visitedViews.value.findIndex((item) => item.path === view.path)
    const wasActive = isActive(view)
    tagsViewStore.removeView(view)
    if (!wasActive) return

    await navigateTo(visitedViews.value[index] ?? visitedViews.value[index - 1])
  }

  const closeAllTags = async () => {
    tagsViewStore.removeAllViews()
    await navigateTo(visitedViews.value.at(-1))
  }

  const keepCurrentRouteVisible = async (fallback: RouteLocationNormalizedLoaded) => {
    if (!visitedViews.value.some((view) => isActive(view))) {
      await navigateTo(fallback)
    }
  }

  const closeOtherTags = async (view: RouteLocationNormalizedLoaded) => {
    tagsViewStore.removeOtherViews(view)
    await keepCurrentRouteVisible(view)
  }

  const closeLeftTags = async (view: RouteLocationNormalizedLoaded) => {
    tagsViewStore.removeLeftViews(view)
    await keepCurrentRouteVisible(view)
  }

  const closeRightTags = async (view: RouteLocationNormalizedLoaded) => {
    tagsViewStore.removeRightViews(view)
    await keepCurrentRouteVisible(view)
  }

  const refreshTag = async (view?: RouteLocationNormalizedLoaded) => {
    if (!view) return

    tagsViewStore.removeCachedView(view.name)
    await nextTick()
    await replace({ path: `/redirect${view.path}`, query: view.query, hash: view.hash })
  }

  const hasClosableView = (views: RouteLocationNormalizedLoaded[]) =>
    views.some((view) => !view.meta?.affix)

  const createContextMenu = (view: RouteLocationNormalizedLoaded): ContextMenuSchema[] => {
    const index = visitedViews.value.findIndex((item) => item.path === view.path)
    const otherViews = visitedViews.value.filter((item) => item.path !== view.path)

    return [
      {
        icon: 'mdi:sync',
        label: 'common.reload',
        disabled: !view.name,
        command: () => refreshTag(view)
      },
      {
        icon: 'mdi:close',
        label: 'common.closeTab',
        disabled: Boolean(view.meta?.affix),
        command: () => closeTag(view)
      },
      {
        divided: true,
        icon: 'mdi:page-last',
        label: 'common.closeTheLeftTab',
        disabled: index <= 0 || !hasClosableView(visitedViews.value.slice(0, index)),
        command: () => closeLeftTags(view)
      },
      {
        icon: 'mdi:page-first',
        label: 'common.closeTheRightTab',
        disabled: index < 0 || !hasClosableView(visitedViews.value.slice(index + 1)),
        command: () => closeRightTags(view)
      },
      {
        divided: true,
        icon: 'mdi:tag-outline',
        label: 'common.closeOther',
        disabled: !hasClosableView(otherViews),
        command: () => closeOtherTags(view)
      },
      {
        icon: 'mdi:minus',
        label: 'common.closeAll',
        disabled: !hasClosableView(visitedViews.value),
        command: closeAllTags
      }
    ]
  }

  watch(
    routers,
    (routes) => {
      filterAffixTags(routes).forEach((view) => tagsViewStore.addView(view))
    },
    { immediate: true }
  )

  watch(
    () => currentRoute.value.fullPath,
    async () => {
      tagsViewStore.addView(currentRoute.value)
      await moveActiveIntoView()
    },
    { immediate: true, flush: 'post' }
  )
</script>

<template>
  <div ref="tagsViewRef" :id="prefixCls" :class="prefixCls">
    <button
      :class="[`${prefixCls}__tool`, `${prefixCls}__tool--first`]"
      type="button"
      :title="t('common.scrollTagsLeft')"
      :aria-label="t('common.scrollTagsLeft')"
      @click="scrollTags(-200)"
    >
      <Icon icon="mdi:chevron-double-left" />
    </button>

    <div :class="`${prefixCls}__viewport`">
      <ElScrollbar ref="scrollbarRef" :class="`${prefixCls}__scrollbar`">
        <div :class="`${prefixCls}__list`">
          <ContextMenu
            v-for="item in visitedViews"
            :key="item.path"
            :schema="createContextMenu(item)"
            :class="[
              `${prefixCls}__item`,
              { [`${prefixCls}__item--affix`]: item.meta?.affix, 'is-active': isActive(item) }
            ]"
          >
            <div :class="`${prefixCls}__item-body`">
              <RouterLink :to="item.fullPath" :class="`${prefixCls}__link`">
                <Icon v-if="getTagIcon(item)" :icon="getTagIcon(item)" :size="13" />
                <span>{{ t(item.meta?.title as string) }}</span>
              </RouterLink>
              <button
                v-if="!item.meta?.affix"
                :class="`${prefixCls}__close`"
                type="button"
                :aria-label="`${t('common.closeTab')}: ${t(item.meta?.title as string)}`"
                @click.stop="closeTag(item)"
              >
                <Icon icon="mdi:close" :size="13" />
              </button>
            </div>
          </ContextMenu>
        </div>
      </ElScrollbar>
    </div>

    <button
      :class="`${prefixCls}__tool`"
      type="button"
      :title="t('common.scrollTagsRight')"
      :aria-label="t('common.scrollTagsRight')"
      @click="scrollTags(200)"
    >
      <Icon icon="mdi:chevron-double-right" />
    </button>
    <button
      :class="`${prefixCls}__tool`"
      type="button"
      :title="t('common.reload')"
      :aria-label="t('common.reload')"
      :disabled="!activeTag"
      @click="refreshTag(activeTag)"
    >
      <Icon icon="mdi:reload" />
    </button>
    <ContextMenu trigger="click" :schema="activeTag ? createContextMenu(activeTag) : []">
      <button
        :class="`${prefixCls}__tool`"
        type="button"
        :title="t('common.moreTabActions')"
        :aria-label="t('common.moreTabActions')"
        :disabled="!activeTag"
      >
        <Icon icon="mdi:dots-horizontal" />
      </button>
    </ContextMenu>
  </div>
</template>

<style lang="less" scoped>
  @prefix-cls: v-tags-view;

  .@{prefix-cls} {
    position: relative;
    display: flex;
    width: 100%;
    height: var(--tags-view-height);
    background: var(--top-header-bg-color);

    :deep(.el-scrollbar__view) {
      height: 100%;
    }

    &__viewport {
      flex: 1;
      min-width: 0;
      overflow: hidden;
    }

    &__scrollbar,
    &__list {
      height: 100%;
    }

    &__list {
      display: flex;
      gap: 4px;
      padding: 3px 4px;
      box-sizing: border-box;
    }

    &__tool {
      display: grid;
      flex: none;
      width: var(--tags-view-height);
      height: var(--tags-view-height);
      padding: 0;
      color: var(--el-text-color-placeholder);
      cursor: pointer;
      background: transparent;
      border: 0;
      border-left: 1px solid var(--layout-border-color);
      transition:
        color 160ms ease,
        background-color 160ms ease;
      place-items: center;

      &:hover:not(:disabled),
      &:focus-visible {
        color: var(--el-color-primary);
        background: var(--top-header-hover-color);
        outline: none;
      }

      &:disabled {
        cursor: default;
        opacity: 0.45;
      }

      &--first {
        border-right: 1px solid var(--layout-border-color);
        border-left: 0;
      }
    }

    &__item {
      flex: none;
      height: 100%;
      overflow: hidden;
      color: var(--el-text-color-regular);
      cursor: pointer;
      background: var(--top-header-bg-color);
      border: 1px solid var(--layout-border-color);
      border-radius: 8px;
      transition:
        color 160ms ease,
        background-color 160ms ease,
        border-color 160ms ease;

      &:hover,
      &:focus-within {
        color: var(--el-color-primary);
      }

      &.is-active {
        font-weight: 600;
        color: var(--el-color-primary);
        background: var(--el-color-primary-light-9);
        border-color: var(--el-color-primary-light-7);
      }
    }

    &__item-body,
    &__link {
      display: flex;
      align-items: center;
      height: 100%;
    }

    &__link {
      gap: 5px;
      padding: 0 12px;
      font-size: 12px;
      color: inherit;
      text-decoration: none;
      white-space: nowrap;

      &:focus-visible {
        outline: 2px solid var(--el-color-primary-light-7);
        outline-offset: -2px;
      }
    }

    &__item:not(&__item--affix) &__link {
      padding-right: 4px;
    }

    &__close {
      display: grid;
      width: 24px;
      height: 100%;
      padding: 0;
      color: inherit;
      pointer-events: none;
      cursor: pointer;
      background: transparent;
      border: 0;
      opacity: 0;
      transition:
        color 160ms ease,
        opacity 160ms ease;
      place-items: center;

      &:hover,
      &:focus-visible {
        color: var(--el-color-danger);
        outline: none;
      }
    }

    &__item:hover &__close,
    &__item.is-active &__close,
    &__close:focus-visible {
      pointer-events: auto;
      opacity: 1;
    }
  }
</style>
