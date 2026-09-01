import { defineStore } from 'pinia'
import type { LocationQuery, RouteLocationNormalizedLoaded } from 'vue-router'

export interface TagView {
  path: string
  fullPath: string
  name?: string
  title?: string
  icon?: string
  query: LocationQuery
  hash: string
  affix: boolean
  noCache: boolean
}

export interface TagsViewState {
  visitedViews: TagView[]
  cachedViews: string[]
}

export const createTagView = (route: RouteLocationNormalizedLoaded): TagView | undefined => {
  if (route.meta.noTagsView) return

  const icon = [...route.matched].reverse().find((record) => record.meta.icon)?.meta.icon

  return {
    path: route.path,
    fullPath: route.fullPath,
    name: typeof route.name === 'string' ? route.name : undefined,
    title: route.meta.title,
    icon: icon ?? route.meta.icon,
    query: { ...route.query },
    hash: route.hash,
    affix: Boolean(route.meta.affix),
    noCache: Boolean(route.meta.noCache)
  }
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
          this.visitedViews.flatMap((view) => (!view.noCache && view.name ? [view.name] : []))
        )
      ]
    },
    addView(view: TagView) {
      const index = this.visitedViews.findIndex((item) => item.path === view.path)
      if (index === -1) {
        this.visitedViews.push(view)
      } else {
        this.visitedViews[index] = view
      }
      this.syncCachedViews()
    },
    removeView(view: TagView) {
      this.visitedViews = this.visitedViews.filter((item) => item.path !== view.path)
      this.syncCachedViews()
    },
    removeCachedView(name?: string) {
      if (name) {
        this.cachedViews = this.cachedViews.filter((item) => item !== name)
      }
    },
    removeAllViews(keepAffix = true) {
      this.visitedViews = keepAffix ? this.visitedViews.filter((view) => view.affix) : []
      this.syncCachedViews()
    },
    removeOtherViews(view: TagView) {
      this.visitedViews = this.visitedViews.filter((item) => item.affix || item.path === view.path)
      this.syncCachedViews()
    },
    removeLeftViews(view: TagView) {
      const index = this.visitedViews.findIndex((item) => item.path === view.path)
      if (index < 0) return

      this.visitedViews = this.visitedViews.filter(
        (item, itemIndex) => item.affix || itemIndex >= index
      )
      this.syncCachedViews()
    },
    removeRightViews(view: TagView) {
      const index = this.visitedViews.findIndex((item) => item.path === view.path)
      if (index < 0) return

      this.visitedViews = this.visitedViews.filter(
        (item, itemIndex) => item.affix || itemIndex <= index
      )
      this.syncCachedViews()
    }
  },
  persist: false
})
