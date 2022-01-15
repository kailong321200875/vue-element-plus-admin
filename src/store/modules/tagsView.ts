// import router from '@/router'
import type { RouteLocationNormalizedLoaded } from 'vue-router'
import { getRawRoute } from '@/utils/routerHelper'
import { defineStore } from 'pinia'
import { store } from '../index'

export interface TagsViewState {
  visitedViews: RouteLocationNormalizedLoaded[]
  cachedViews: Set<string>
}

export const useTagsViewStore = defineStore({
  id: 'tagsView',
  state: (): TagsViewState => ({
    visitedViews: [],
    cachedViews: new Set()
  }),
  getters: {
    getVisitedViews(): RouteLocationNormalizedLoaded[] {
      return this.visitedViews
    },
    getCachedViews(): string[] {
      return Array.from(this.cachedViews)
    }
  },
  actions: {
    ADD_VISITED_VIEW(view: RouteLocationNormalizedLoaded): void {
      if (this.visitedViews.some((v: RouteLocationNormalizedLoaded) => v.path === view.path)) return
      if (view.meta?.noTagsView) return
      this.visitedViews.push(
        Object.assign({}, view, {
          title: view.meta.title || 'no-name'
        })
      )
    },
    SET_CACHED_VIEW(): void {
      const cacheMap: Set<string> = new Set()

      for (const v of this.visitedViews) {
        const item = getRawRoute(v)
        const needCache = !item.meta?.noCache
        if (!needCache) {
          continue
        }
        const name = item.name as string
        cacheMap.add(name)
      }
      this.cachedViews = cacheMap
    },
    DEL_VISITED_VIEW(view: RouteLocationNormalizedLoaded): void {
      for (const [i, v] of this.visitedViews.entries()) {
        if (v.path === view.path) {
          this.visitedViews.splice(i, 1)
          break
        }
      }
    },
    DEL_CACHED_VIEW(): void {
      // const route = router.currentRoute.value
      // for (const [key, value] of this.cachedViews) {
      //   const index = value.findIndex((item: string) => item === (route.name as string))
      //   if (index === -1) {
      //     continue
      //   }
      //   if (value.length === 1) {
      //     this.cachedViews.delete(key)
      //     continue
      //   }
      //   value.splice(index, 1)
      //   this.cachedViews.set(key, value)
      // }
    },
    DEL_OTHERS_VISITED_VIEWS(view: RouteLocationNormalizedLoaded): void {
      this.visitedViews = this.visitedViews.filter((v) => {
        return v.meta.affix || v.path === view.path
      })
    },
    DEL_ALL_VISITED_VIEWS(): void {
      // keep affix tags
      const affixTags = this.visitedViews.filter((tag) => tag.meta.affix)
      this.visitedViews = affixTags
    },
    UPDATE_VISITED_VIEW(view: RouteLocationNormalizedLoaded): void {
      for (let v of this.visitedViews) {
        if (v.path === view.path) {
          v = Object.assign(v, view)
          break
        }
      }
    },
    addView(view: RouteLocationNormalizedLoaded): void {
      this.addVisitedView(view)
      this.addCachedView()
    },
    addVisitedView(view: RouteLocationNormalizedLoaded): void {
      this.ADD_VISITED_VIEW(view)
    },
    addCachedView(): void {
      this.SET_CACHED_VIEW()
    },
    delView(view: RouteLocationNormalizedLoaded): Promise<unknown> {
      return new Promise((resolve) => {
        this.delVisitedView(view)
        this.SET_CACHED_VIEW()
        resolve({
          visitedViews: [...this.visitedViews],
          cachedViews: [...this.cachedViews]
        })
      })
    },
    delVisitedView(view: RouteLocationNormalizedLoaded): Promise<unknown> {
      return new Promise((resolve) => {
        this.DEL_VISITED_VIEW(view)
        resolve([...this.visitedViews])
      })
    },
    delCachedView(): Promise<unknown> {
      return new Promise((resolve) => {
        this.DEL_CACHED_VIEW()
        resolve([...this.cachedViews])
      })
    },
    delOthersViews(view: RouteLocationNormalizedLoaded): Promise<unknown> {
      return new Promise((resolve) => {
        this.delOthersVisitedViews(view)
        this.SET_CACHED_VIEW()
        resolve({
          visitedViews: [...this.visitedViews],
          cachedViews: [...this.cachedViews]
        })
      })
    },
    delOthersVisitedViews(view: RouteLocationNormalizedLoaded): Promise<unknown> {
      return new Promise((resolve) => {
        this.DEL_OTHERS_VISITED_VIEWS(view)
        resolve([...this.visitedViews])
      })
    },
    delOthersCachedViews(): Promise<unknown> {
      return new Promise((resolve) => {
        this.SET_CACHED_VIEW()
        resolve([...this.cachedViews])
      })
    },
    delAllViews(): Promise<unknown> {
      return new Promise((resolve) => {
        this.delAllVisitedViews()
        this.SET_CACHED_VIEW()
        resolve({
          visitedViews: [...this.visitedViews],
          cachedViews: [...this.cachedViews]
        })
      })
    },
    delAllVisitedViews(): Promise<unknown> {
      return new Promise((resolve) => {
        this.DEL_ALL_VISITED_VIEWS()
        resolve([...this.visitedViews])
      })
    },
    delAllCachedViews(): Promise<unknown> {
      return new Promise((resolve) => {
        this.SET_CACHED_VIEW()
        resolve([...this.cachedViews])
      })
    },
    updateVisitedView(view: RouteLocationNormalizedLoaded): void {
      this.UPDATE_VISITED_VIEW(view)
    }
  }
})

export const useTagsViewStoreWithOut = () => {
  return useTagsViewStore(store)
}
