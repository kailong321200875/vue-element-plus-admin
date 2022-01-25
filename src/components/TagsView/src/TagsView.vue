<script setup lang="ts">
import { onMounted, watch, computed, unref, ref, nextTick } from 'vue'
import { useRouter } from 'vue-router'
import type { RouteLocationNormalizedLoaded } from 'vue-router'
import { usePermissionStore } from '@/store/modules/permission'
import { useTagsViewStore } from '@/store/modules/tagsView'
import { useI18n } from '@/hooks/web/useI18n'
import { filterAffixTags } from './helper'
import { ContextMenu, ContextMenuExpose } from '@/components/ContextMenu'
import { useDesign } from '@/hooks/web/useDesign'
import { useTemplateRefsList } from '@vueuse/core'

const { getPrefixCls } = useDesign()

const prefixCls = getPrefixCls('tags-view')

const { t } = useI18n()

const { currentRoute, push, replace } = useRouter()

const permissionStore = usePermissionStore()

const routers = computed(() => permissionStore.getRouters)

const tagsViewStore = useTagsViewStore()

const visitedViews = computed(() => tagsViewStore.getVisitedViews)

const affixTagArr = ref<RouteLocationNormalizedLoaded[]>([])

// 初始化tag
const initTags = () => {
  affixTagArr.value = filterAffixTags(unref(routers))
  for (const tag of unref(affixTagArr)) {
    // Must have tag name
    if (tag.name) {
      tagsViewStore.addVisitedView(tag)
    }
  }
}

const selectedTag = ref<RouteLocationNormalizedLoaded>()

// 新增tag
const addTags = () => {
  const { name } = unref(currentRoute)
  if (name) {
    selectedTag.value = unref(currentRoute)
    tagsViewStore.addView(unref(currentRoute))
  }
  return false
}

// 关闭选中的tag
const closeSelectedTag = (view: RouteLocationNormalizedLoaded) => {
  if (view?.meta?.affix) return
  tagsViewStore.delView(view)
  if (isActive(view)) {
    toLastView()
  }
}

// 关闭全部
const closeAllTags = () => {
  tagsViewStore.delAllViews()
  toLastView()
}

// 关闭其他
const closeOthersTags = () => {
  tagsViewStore.delOthersViews(unref(selectedTag) as RouteLocationNormalizedLoaded)
}

// 重新加载
const refreshSelectedTag = async (view?: RouteLocationNormalizedLoaded) => {
  if (!view) return
  tagsViewStore.delCachedView()
  const { fullPath } = view
  await nextTick()
  replace({
    path: '/redirect' + fullPath
  })
}

// 关闭左侧
const closeLeftTags = () => {
  tagsViewStore.delLeftViews(unref(selectedTag) as RouteLocationNormalizedLoaded)
}

// 关闭右侧
const closeRightTags = () => {
  tagsViewStore.delRightViews(unref(selectedTag) as RouteLocationNormalizedLoaded)
}

// 跳转到最后一个
const toLastView = () => {
  const visitedViews = tagsViewStore.getVisitedViews
  const latestView = visitedViews.slice(-1)[0]
  if (latestView) {
    push(latestView)
  } else {
    if (
      unref(currentRoute).path === permissionStore.getAddRouters[0].path ||
      unref(currentRoute).path === permissionStore.getAddRouters[0].redirect
    ) {
      addTags()
      return
    }
    // You can set another route
    push(permissionStore.getAddRouters[0].path)
  }
}

// 是否是当前tag
const isActive = (route: RouteLocationNormalizedLoaded): boolean => {
  return route.path === unref(currentRoute).path
}

const itemRefs = useTemplateRefsList<ComponentRef<typeof ContextMenu & ContextMenuExpose>>()

const visibleChange = (
  visible: boolean,
  ref: ComponentRef<typeof ContextMenu & ContextMenuExpose>
) => {
  const uid = ref.$el['__vueParentComponent'].uid
  if (visible) {
    for (const v of unref(itemRefs)) {
      const elDropdownMenuRef = v.elDropdownMenuRef
      if (uid !== elDropdownMenuRef?.$el['__vueParentComponent'].uid) {
        elDropdownMenuRef?.handleClose()
      }
    }
  }
}

onMounted(() => {
  initTags()
  addTags()
})

watch(
  () => currentRoute.value,
  () => {
    addTags()
    // moveToCurrentTag()
  }
)
</script>

<template>
  <div :id="prefixCls" :class="prefixCls" class="h-[var(--tags-view-height)] flex w-full relative">
    <span
      :class="`${prefixCls}__tool`"
      class="w-[var(--tags-view-height)] h-[var(--tags-view-height)] text-center leading-[var(--tags-view-height)] cursor-pointer"
    >
      <Icon icon="ep:d-arrow-left" color="#333" />
    </span>
    <div class="overflow-hidden flex-1">
      <ElScrollbar class="h-full">
        <div class="flex h-full">
          <ContextMenu
            :ref="itemRefs.set"
            :schema="[
              {
                icon: 'ant-design:sync-outlined',
                label: t('common.reload'),
                disabled: selectedTag?.fullPath !== item.fullPath,
                command: () => {
                  refreshSelectedTag(item)
                }
              },
              {
                icon: 'ant-design:close-outlined',
                label: t('common.closeTab'),
                disabled: !!visitedViews?.length && selectedTag?.meta.affix,
                command: () => {
                  closeSelectedTag(item)
                }
              },
              {
                divided: true,
                icon: 'ant-design:vertical-right-outlined',
                label: t('common.closeTheLeftTab'),
                disabled:
                  !!visitedViews?.length &&
                  (item.fullPath === visitedViews[0].fullPath ||
                    selectedTag?.fullPath !== item.fullPath),
                command: () => {
                  closeLeftTags()
                }
              },
              {
                icon: 'ant-design:vertical-left-outlined',
                label: t('common.closeTheRightTab'),
                disabled:
                  !!visitedViews?.length &&
                  (item.fullPath === visitedViews[visitedViews.length - 1].fullPath ||
                    selectedTag?.fullPath !== item.fullPath),
                command: () => {
                  closeRightTags()
                }
              },
              {
                divided: true,
                icon: 'ant-design:tag-outlined',
                label: t('common.closeOther'),
                disabled: selectedTag?.fullPath !== item.fullPath,
                command: () => {
                  closeOthersTags()
                }
              },
              {
                icon: 'ant-design:line-outlined',
                label: t('common.closeAll'),
                command: () => {
                  closeAllTags()
                }
              }
            ]"
            v-for="item in visitedViews"
            :key="item.fullPath"
            :class="[
              `${prefixCls}__item`,
              item?.meta?.affix ? `${prefixCls}__item--affix` : '',
              {
                'is-active': isActive(item)
              }
            ]"
            @visible-change="visibleChange"
          >
            <router-link :to="{ ...item }" custom v-slot="{ navigate }">
              <div
                @click="navigate"
                class="h-full flex justify-center items-center whitespace-nowrap"
              >
                {{ t(item?.meta?.title as string) }}
                <Icon
                  :class="`${prefixCls}__item--close`"
                  color="#333"
                  icon="ant-design:close-outlined"
                  :size="12"
                  @click.prevent.stop="closeSelectedTag(item)"
                />
              </div>
            </router-link>
          </ContextMenu>
        </div>
      </ElScrollbar>
    </div>
    <span
      :class="`${prefixCls}__tool`"
      class="w-[var(--tags-view-height)] h-[var(--tags-view-height)] text-center leading-[var(--tags-view-height)] cursor-pointer"
    >
      <Icon icon="ep:d-arrow-right" color="#333" />
    </span>
    <span
      :class="`${prefixCls}__tool`"
      class="w-[var(--tags-view-height)] h-[var(--tags-view-height)] text-center leading-[var(--tags-view-height)] cursor-pointer"
      @click="refreshSelectedTag(selectedTag)"
    >
      <Icon icon="ant-design:reload-outlined" color="#333" />
    </span>
    <ContextMenu
      trigger="click"
      :schema="[
        {
          icon: 'ant-design:sync-outlined',
          label: t('common.reload'),
          command: () => {
            refreshSelectedTag(selectedTag)
          }
        },
        {
          icon: 'ant-design:close-outlined',
          label: t('common.closeTab'),
          disabled: !!visitedViews?.length && selectedTag?.meta.affix
        },
        {
          divided: true,
          icon: 'ant-design:vertical-right-outlined',
          label: t('common.closeTheLeftTab'),
          disabled: !!visitedViews?.length && selectedTag?.fullPath === visitedViews[0].fullPath,
          command: () => {
            closeLeftTags()
          }
        },
        {
          icon: 'ant-design:vertical-left-outlined',
          label: t('common.closeTheRightTab'),
          disabled:
            !!visitedViews?.length &&
            selectedTag?.fullPath === visitedViews[visitedViews.length - 1].fullPath,
          command: () => {
            closeRightTags()
          }
        },
        {
          divided: true,
          icon: 'ant-design:tag-outlined',
          label: t('common.closeOther'),
          command: () => {
            closeOthersTags()
          }
        },
        {
          icon: 'ant-design:line-outlined',
          label: t('common.closeAll'),
          command: () => {
            closeAllTags()
          }
        }
      ]"
    >
      <span
        :class="`${prefixCls}__tool`"
        class="w-[var(--tags-view-height)] h-[var(--tags-view-height)] text-center leading-[var(--tags-view-height)] cursor-pointer block"
      >
        <Icon icon="ant-design:setting-outlined" color="#333" />
      </span>
    </ContextMenu>
  </div>
</template>

<style lang="less" scoped>
@prefix-cls: ~'@{namespace}-tags-view';

.@{prefix-cls} {
  :deep(.@{elNamespace}-scrollbar__view) {
    height: 100%;
  }

  &__tool {
    position: relative;

    &:hover {
      :deep(span) {
        color: var(--el-color-black) !important;
      }
    }

    &:after {
      position: absolute;
      top: 1px;
      left: 0;
      width: 100%;
      height: calc(~'100% - 1px');
      border-right: 1px solid var(--tags-view-border-color);
      border-left: 1px solid var(--tags-view-border-color);
      content: '';
    }
  }

  &__item + &__item {
    margin-left: 4px;
  }

  &__item {
    position: relative;
    top: 2px;
    height: calc(~'100% - 4px');
    padding: 0 15px;
    font-size: 12px;
    line-height: calc(~'var( - -tags-view-height) - 4px');
    cursor: pointer;
    border: 1px solid #d9d9d9;

    &--close {
      position: absolute;
      top: 50%;
      right: 5px;
      display: none;
      transform: translate(0, -50%);
    }
    &:not(.@{prefix-cls}__item--affix):hover {
      .@{prefix-cls}__item--close {
        display: block;
      }
    }
  }

  &__item:not(.@{prefix-cls}__item--affix) {
    padding-right: 25px;
  }

  &__item:not(.is-active) {
    &:hover {
      color: var(--el-color-primary);
    }
  }

  &__item.is-active {
    color: var(--el-color-white);
    background-color: var(--el-color-primary);
    .@{prefix-cls}__item--close {
      :deep(span) {
        color: var(--el-color-white) !important;
      }
    }
  }
}
</style>
