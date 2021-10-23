<template>
  <div ref="wrapper" class="tags-view-container">
    <div class="container-left hover-container" @click="move(-200)">
      <i class="el-icon-d-arrow-left"></i>
    </div>
    <scroll-pane ref="scrollPaneRef" class="tags-view-wrapper">
      <router-link
        v-for="tag in visitedViews"
        :ref="setTagRef"
        :key="tag.path"
        :class="isActive(tag) ? 'active' : ''"
        :to="{ path: tag.path, query: tag.query, fullPath: tag.fullPath }"
        tag="span"
        class="tags-view-item"
        @click.middle="closeSelectedTag(tag)"
        @contextmenu.prevent="openMenu(tag, $event)"
      >
        {{ (tag as any).title }}
        <span
          v-if="!tag.meta.affix"
          class="el-icon-close"
          @click.prevent.stop="closeSelectedTag(tag)"
        ></span>
      </router-link>
    </scroll-pane>
    <div class="container-right">
      <div class="hover-container">
        <i class="el-icon-d-arrow-right" @click="move(200)"></i>
      </div>
      <div class="hover-container" @click="refreshSelectedTag(selectedTag)">
        <el-tooltip content="刷新" placement="bottom">
          <div>
            <svg-icon icon-class="refresh" />
          </div>
        </el-tooltip>
      </div>
      <div class="hover-container" @click="closeSelectedTag(selectedTag)">
        <el-tooltip content="关闭" placement="bottom">
          <div>
            <svg-icon icon-class="close" />
          </div>
        </el-tooltip>
      </div>
      <div class="hover-container">
        <screenfull />
      </div>
      <!-- <div class="hover-container" @click="toHome">
        <el-tooltip content="首页" placement="bottom">
          <svg-icon icon-class="home" />
        </el-tooltip>
      </div> -->
    </div>

    <ul v-show="visible" :style="{ left: left + 'px', top: top + 'px' }" class="contextmenu">
      <li @click="refreshSelectedTag(selectedTag)">刷新</li>
      <li
        v-if="!(selectedTag.meta && selectedTag.meta.affix)"
        @click="closeSelectedTag(selectedTag)"
      >
        关闭
      </li>
      <li @click="closeOthersTags">关闭其他</li>
      <li @click="closeAllTags">关闭全部</li>
    </ul>
  </div>
</template>

<script setup lang="ts" name="TagsViews">
import { ref, unref, computed, watch, onMounted, nextTick } from 'vue'
import { useTagsViewStore } from '@/store/modules/tags-view'
const tagsViewStore = useTagsViewStore()
import { usePermissionStore } from '@/store/modules/permission'
const permissionStore = usePermissionStore()
import path from 'path-browserify'
import type { RouteLocationNormalizedLoaded, RouteRecordRaw } from 'vue-router'
import { useRouter } from 'vue-router'
import ScrollPane from './ScrollPane.vue'
import Screenfull from '../Screenfull/index.vue'

const { currentRoute, push, replace } = useRouter()
const wrapper = ref<HTMLElement | null>(null)
const scrollPaneRef = ref<HTMLElement | null>(null)
const visible = ref<boolean>(false)
const top = ref<number>(0)
const left = ref<number>(0)
const selectedTag = ref<any>({})
const affixTags = ref<any[]>([])
const visitedViews = computed(() => tagsViewStore.visitedViews)
const routers = computed(() => permissionStore.routers)

const tagRefs = ref<any[]>([])

function setTagRef(el: any): void {
  tagRefs.value.push(el)
}

function isActive(route: RouteLocationNormalizedLoaded): boolean {
  return route.path === currentRoute.value.path
}

function filterAffixTags(routes: RouteRecordRaw[], basePath = '/'): any[] {
  let tags: any[] = []
  routes.forEach((route: RouteRecordRaw) => {
    if (route.meta && route.meta.affix) {
      const tagPath = path.resolve(basePath, route.path)
      tags.push({
        fullPath: tagPath,
        path: tagPath,
        name: route.name,
        meta: { ...route.meta }
      })
    }
    if (route.children) {
      const tempTags: any[] = filterAffixTags(route.children, route.path)
      if (tempTags.length >= 1) {
        tags = [...tags, ...tempTags]
      }
    }
  })

  return tags
}

function initTags(): void {
  affixTags.value = filterAffixTags(routers.value as RouteRecordRaw[])
  const affixTagArr: any[] = affixTags.value
  for (const tag of affixTagArr) {
    // Must have tag name
    if (tag.name) {
      tagsViewStore.addVisitedView(tag)
    }
  }
}

function addTags(): void | boolean {
  const { name } = currentRoute.value
  if (name) {
    selectedTag.value = currentRoute.value
    tagsViewStore.addView(currentRoute.value)
  }
  return false
}

function moveToCurrentTag() {
  // TODO 要手动清除tagRefs，不然会一直重复，后续看看有没有什么解决办法
  tagRefs.value = []
  const tags = unref(tagRefs)
  nextTick(() => {
    for (const tag of tags) {
      if (tag && tag.to.path === currentRoute.value.path) {
        ;(unref(scrollPaneRef) as any).moveToTarget(tag)
        // when query is different then update
        if (tag.to.fullPath !== currentRoute.value.fullPath) {
          tagsViewStore.updateVisitedView(currentRoute.value)
        }

        break
      }
    }
  })
}

async function refreshSelectedTag(view: RouteLocationNormalizedLoaded) {
  await tagsViewStore.delCachedView()
  const { fullPath } = view
  nextTick(() => {
    replace({
      path: '/redirect' + fullPath
    })
  })
}

async function closeSelectedTag(view: RouteLocationNormalizedLoaded) {
  if (view.meta && view.meta.affix) return
  const views: any = await tagsViewStore.delView(view)
  if (isActive(view)) {
    toLastView(views.visitedViews)
  }
}

function closeOthersTags() {
  push(selectedTag.value)
  tagsViewStore.delOthersViews(selectedTag.value).then(() => {
    moveToCurrentTag()
  })
}

async function closeAllTags() {
  const views: any = await tagsViewStore.delAllViews()
  // console.log(affixTags.value.some(tag => tag.path === view.path))
  // if (affixTags.value.some(tag => tag.path === view.path)) {
  //   return
  // }
  toLastView(views.visitedViews)
}

function toLastView(visitedViews: RouteLocationNormalizedLoaded[]) {
  const latestView = visitedViews.slice(-1)[0]
  if (latestView) {
    push(latestView)
  } else {
    if (
      currentRoute.value.path === permissionStore.getAddRouters[0].path ||
      currentRoute.value.path === permissionStore.getAddRouters[0].redirect
    ) {
      addTags()
      return
    }
    // You can set another route
    push(permissionStore.getAddRouters[0].path)
  }
}

function openMenu(tag: RouteLocationNormalizedLoaded, e: any) {
  const menuMinWidth = 105
  const offsetWidth: number = (unref(wrapper) as any).offsetWidth // container width
  const maxLeft: number = offsetWidth - menuMinWidth // left boundary
  const itemLeft: number = e.clientX + 4

  if (itemLeft > maxLeft) {
    left.value = maxLeft
  } else {
    left.value = itemLeft
  }
  top.value = e.clientY

  visible.value = true
  selectedTag.value = tag
}

function closeMenu() {
  visible.value = false
}

function move(to: number) {
  ;(unref(scrollPaneRef) as any).moveTo(to)
}

onMounted(() => {
  initTags()
  addTags()
})

watch(
  () => currentRoute.value,
  () => {
    addTags()
    moveToCurrentTag()
  }
)

watch(
  () => visible.value,
  (visible: boolean) => {
    if (visible) {
      document.body.addEventListener('click', closeMenu)
    } else {
      document.body.removeEventListener('click', closeMenu)
    }
  }
)

defineExpose({
  tagRefs
})
</script>

<style lang="less" scoped>
.tags-view-container {
  z-index: 1;
  display: flex;
  width: 100%;
  height: var(--tags-view-height);
  background-color: var(--tag-background-color);
  box-shadow: 0 2px 8px 0 rgba(135, 118, 114, 0.15);

  .container-left {
    width: 45px;
    line-height: var(--tags-view-height);
    text-align: center;
    cursor: pointer;
    border-right: 1px solid #e7edf1;
  }

  .container-right {
    display: flex;
    width: 220px;
    line-height: var(--tags-view-height);
    border-left: 1px solid #e7edf1;

    & > div {
      text-align: center;
      cursor: pointer;
      flex: 1;
    }
  }

  .tags-view-wrapper {
    height: var(--tags-view-height);

    .tags-view-item {
      position: relative;
      top: -1px;
      display: inline-block;
      height: var(--tags-view-height);
      padding: 0 40px 0 20px;
      font-size: 14px;
      line-height: var(--tags-view-height);
      color: #495060;
      color: #333;
      cursor: pointer;
      background: #fff;
      background-color: #f7f5f2;
      border: 1px solid #e7edf1;

      &.active {
        position: relative;
        background-color: var(--tag-active-background-color);

        &::before {
          position: absolute;
          bottom: 0;
          left: 0;
          width: 100%;
          height: 3px;
          background: var(--main-color);
          content: '';
        }
      }
    }
  }

  .contextmenu {
    position: fixed;
    z-index: 100;
    padding: 5px 0;
    margin: 0;
    font-size: 12px;
    font-weight: 400;
    color: #333;
    list-style-type: none;
    background: #fff;
    border-radius: 4px;
    box-shadow: 2px 2px 3px 0 rgba(0, 0, 0, 0.3);

    li {
      padding: 7px 16px;
      margin: 0;
      cursor: pointer;

      &:hover {
        background: #eee;
      }
    }
  }
}
//reset element css of el-icon-close
.tags-view-wrapper {
  .tags-view-item {
    .el-icon-close {
      position: absolute;
      top: 50%;
      right: 0;
      width: 18px;
      height: 18px;
      color: #bfc7cd;
      text-align: center;
      vertical-align: 2px;
      border-radius: 50%;
      transform: translate(-50%, -50%);
      transition: all 0.3s cubic-bezier(0.645, 0.045, 0.355, 1);
      transform-origin: 100% 50%;

      &::before {
        display: inline-block;
        vertical-align: -2px;
      }

      &:hover {
        color: #fff;
        background-color: #b4bccc;
      }
    }
  }
}

.hover-container {
  color: #818a91;
  cursor: pointer;
  transition: background 0.2s;

  &:hover {
    background: #f6f6f6;
  }
}
</style>
