<template>
  <div ref="wrapper" class="tags-view-container">
    <el-button class="move-btn prev-btn" icon="el-icon-arrow-left" @click="move(-200)" />
    <scroll-pane ref="scrollPane" class="tags-view-wrapper">
      <div class="link-wrapper">
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
          {{ tag.title }}
          <i v-if="!tag.meta.affix" class="el-icon-close icon-close" @click.prevent.stop="closeSelectedTag(tag)" />
        </router-link>
      </div>
    </scroll-pane>
    <el-button class="move-btn next-btn" icon="el-icon-arrow-right" @click="move(200)" />
    <ul v-show="visible" :style="{left: left + 'px', top: top + 'px'}" class="contextmenu">
      <li @click="refreshSelectedTag(selectedTag)">
        刷新
      </li>
      <li v-if="!(selectedTag.meta&&selectedTag.meta.affix)" @click="closeSelectedTag(selectedTag)">
        关闭
      </li>
      <li @click="closeOthersTags">
        关闭其他
      </li>
      <li @click="closeAllTags(selectedTag)">
        关闭全部
      </li>
    </ul>
  </div>
</template>

<script lang="ts">
import ScrollPane from './ScrollPane.vue'
import path from 'path'
import { defineComponent, ref, unref, computed, watch, onMounted, nextTick } from 'vue'
import { tagsViewStore } from '_p/index/store/modules/tagsView'
import { permissionStore } from '_p/index/store/modules/permission'
import { useRouter } from 'vue-router'
import type { RouteLocationNormalizedLoaded, RouteRecordRaw } from 'vue-router'

export default defineComponent({
  name: 'TagsView',
  components: {
    ScrollPane
  },
  setup() {
    const { currentRoute, push, replace } = useRouter()
    const wrapper = ref<HTMLElement | null>(null)
    const scrollPane = ref<HTMLElement | null>(null)
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
      affixTags.value = filterAffixTags(routers.value)
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
            (unref(scrollPane) as any).moveToTarget(tag)
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
        // You can set another route
        push('/')
      }
    }

    function openMenu(tag: RouteLocationNormalizedLoaded, e: any) {
      const menuMinWidth = 105
      const offsetLeft: number = (unref(wrapper) as any).getBoundingClientRect().left // container margin left
      const offsetWidth: number = (unref(wrapper) as any).offsetWidth // container width
      const maxLeft: number = offsetWidth - menuMinWidth// left boundary
      const itemLeft: number = e.clientX - offsetLeft + 4

      if (itemLeft > maxLeft) {
        left.value = maxLeft
      } else {
        left.value = itemLeft
      }
      top.value = e.offsetY

      visible.value = true
      selectedTag.value = tag
    }

    function closeMenu() {
      visible.value = false
    }

    function move(to: number) {
      (unref(scrollPane) as any).moveTo(to)
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

    return {
      wrapper, scrollPane,
      visible, top, left,
      selectedTag, affixTags,
      visitedViews, routers,
      tagRefs, setTagRef,
      isActive,
      filterAffixTags,
      initTags,
      addTags,
      moveToCurrentTag,
      refreshSelectedTag,
      closeSelectedTag,
      closeOthersTags,
      closeAllTags,
      toLastView,
      openMenu,
      closeMenu,
      move
    }
  }
})
</script>

<style lang="less" scoped>
.tags-view-container {
  height: @tagsViewHeight;
  width: 100%;
  background: #fff;
  box-shadow: 0 1px 3px 0 rgba(0, 0, 0, .12), 0 0 3px 0 rgba(0, 0, 0, .04);
  position: relative;
  display: flex;
  z-index: 1;
  &::after {
    content: "";
    width: 100%;
    height: 1px;
    border-top: #d8dce5;
    position: absolute;
    left: 0;
    bottom: 0;
  }
  .move-btn {
    display: inline-block;
    width: @tagsViewHeight;
    height: @tagsViewHeight;
    line-height: @tagsViewHeight;
    text-align: center;
    padding: 0;
    border-radius: 0;
  }
  .tags-view-wrapper {
    width: calc(~"100% - 78px");
    .link-wrapper {
      height: @tagsViewHeight;
      line-height: @tagsViewHeight;
    }
    .tags-view-item {
      display: inline-block;
      position: relative;
      cursor: pointer;
      height: 30px;
      line-height: 30px;
      border: 1px solid #d8dce5;
      color: #495060;
      background: #fff;
      padding: 0 8px;
      font-size: 12px;
      margin-left: 5px;
      &:last-of-type {
        margin-right: 10px;
      }
      &.active {
        background-color: @tagActiveBg;
        color: #fff;
        border-color: @tagActiveBg;
        &::before {
          content: '';
          background: #fff;
          display: inline-block;
          width: 8px;
          height: 8px;
          border-radius: 50%;
          position: relative;
          margin-right: 5px;
        }
      }
      .icon-close {
        width: 16px;
        height: 16px;
        border-radius: 50%;
        text-align: center;
        line-height: 16px;
        transition: all .3s cubic-bezier(.645, .045, .355, 1);
        transform-origin: 100% 50%;
        &:before {
          display: inline-block;
        }
        &:hover {
          background-color: #b4bccc;
          color: #fff;
        }
      }
    }
  }
  .contextmenu {
    margin: 0;
    background: #fff;
    z-index: 200;
    position: absolute;
    list-style-type: none;
    padding: 5px 0;
    border-radius: 4px;
    font-size: 12px;
    font-weight: 400;
    color: #333;
    box-shadow: 2px 2px 3px 0 rgba(0, 0, 0, .3);
    li {
      margin: 0;
      padding: 7px 16px;
      cursor: pointer;
      &:hover {
        background: #eee;
      }
    }
  }
}
@{deep}(.scrollbar__view) {
  height: @tagsViewHeight;
  line-height: @tagsViewHeight;
}
</style>
