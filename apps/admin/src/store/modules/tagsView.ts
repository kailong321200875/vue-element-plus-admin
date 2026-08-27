import { defineStore } from 'pinia'
import type { RouteLocationNormalizedLoaded, RouteRecordName } from 'vue-router'
import { getRawRoute } from '@/utils/routerHelper'

export interface TagsViewState {
  visitedViews: RouteLocationNormalizedLoaded[]
  cachedViews: string[]
}

const cloneView = (view: RouteLocationNormalizedLoaded): RouteLocationNormalizedLoaded => {
  const rawView = getRawRoute(view)
  return {
    ...rawView,
    meta: { ...rawView.meta },
    query: { ...rawView.query },
    params: { ...rawView.params }
  } as RouteLocationNormalizedLoaded
}

export const useTagsViewStore = defineStore('tagsView', {
  state: (): TagsViewState => ({
    visitedViews: [],
    cachedViews: []
  }),
  actions: {
    syncCachedViews() {
      this.cachedViews = [
        ...new Set(
          this.visitedViews.flatMap((view) =>
            !view.meta?.noCache && typeof view.name === 'string' ? [view.name] : []
          )
        )
      ]
    },
    addView(view: RouteLocationNormalizedLoaded) {
      if (view.meta?.noTagsView) return

      const nextView = cloneView(view)
      const index = this.visitedViews.findIndex((item) => item.path === view.path)
      if (index === -1) {
        this.visitedViews.push(nextView)
      } else {
        this.visitedViews[index] = nextView
      }
      this.syncCachedViews()
    },
    removeView(view: RouteLocationNormalizedLoaded) {
      this.visitedViews = this.visitedViews.filter((item) => item.path !== view.path)
      this.syncCachedViews()
    },
    removeCachedView(name?: RouteRecordName) {
      if (typeof name === 'string') {
        this.cachedViews = this.cachedViews.filter((item) => item !== name)
      }
    },
    removeAllViews(keepAffix = true) {
      this.visitedViews = keepAffix ? this.visitedViews.filter((view) => view.meta?.affix) : []
      this.syncCachedViews()
    },
    removeOtherViews(view: RouteLocationNormalizedLoaded) {
      this.visitedViews = this.visitedViews.filter(
        (item) => item.meta?.affix || item.path === view.path
      )
      this.syncCachedViews()
    },
    removeLeftViews(view: RouteLocationNormalizedLoaded) {
      const index = this.visitedViews.findIndex((item) => item.path === view.path)
      if (index < 0) return

      this.visitedViews = this.visitedViews.filter(
        (item, itemIndex) => item.meta?.affix || itemIndex >= index
      )
      this.syncCachedViews()
    },
    removeRightViews(view: RouteLocationNormalizedLoaded) {
      const index = this.visitedViews.findIndex((item) => item.path === view.path)
      if (index < 0) return

      this.visitedViews = this.visitedViews.filter(
        (item, itemIndex) => item.meta?.affix || itemIndex <= index
      )
      this.syncCachedViews()
    }
  },
  persist: false
})
