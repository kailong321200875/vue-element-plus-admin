import store from '../index'
import router from '_p/index/router'
import { VuexModule, getModule, Module, Mutation, Action } from 'vuex-module-decorators'
import type { RouteLocationNormalizedLoaded } from 'vue-router'
import { getRoute } from '_p/index/router/utils'

export const PAGE_LAYOUT_KEY = '__PAGE_LAYOUT__'

export interface TagsViewState {
  visitedViews: RouteLocationNormalizedLoaded[]
  cachedViews: Map<string, string[]>
}

@Module({ dynamic: true, namespaced: true, name: 'tagsView', store })
class TagsView extends VuexModule implements TagsViewState {
  public visitedViews = [] as any[]
  public cachedViews = new Map<string, string[]>()

  @Mutation
  private ADD_VISITED_VIEW(view: RouteLocationNormalizedLoaded): void {
    if (this.visitedViews.some((v: RouteLocationNormalizedLoaded) => v.path === view.path)) return
    this.visitedViews.push(
      Object.assign({}, view, {
        title: view.meta.title || 'no-name'
      })
    )
  }

  @Mutation
  private SET_CACHED_VIEW(): void {
    const cacheMap = new Map<string, string[]>()

    const pageCacheSet = new Set<string>()
    this.visitedViews.forEach((tab) => {
      const item = getRoute(tab)
      const needCache = !item.meta?.noCache
      if (!needCache) return

      if (item.meta?.affix) {
        const name = item.name as string
        pageCacheSet.add(name)
      } else if (item.matched && needCache) {
        const matched = item.matched
        const len = matched.length

        if (len < 2) return

        for (let i = 0; i < matched.length; i++) {
          const key = matched[i].name as string

          if (i < 2) {
            pageCacheSet.add(key)
          }
          if (i < len - 1) {
            const { meta, name } = matched[i + 1]
            if (meta && (meta.affix || needCache)) {
              const mapList = cacheMap.get(key) || []
              if (!mapList.includes(name as string)) {
                mapList.push(name as string)
              }
              cacheMap.set(key, mapList)
            }
          }
        }
      }
    })

    cacheMap.set(PAGE_LAYOUT_KEY, Array.from(pageCacheSet))
    this.cachedViews = cacheMap
  }

  @Mutation
  private DEL_VISITED_VIEW(view: RouteLocationNormalizedLoaded): void {
    for (const [i, v] of this.visitedViews.entries()) {
      if (v.path === view.path) {
        this.visitedViews.splice(i, 1)
        break
      }
    }
  }

  @Mutation
  private DEL_CACHED_VIEW(): void {
    const route = router.currentRoute.value
    for (const [key, value] of this.cachedViews) {
      const index = value.findIndex((item: string) => item === (route.name as string))
      if (index === -1) {
        continue
      }
      if (value.length === 1) {
        this.cachedViews.delete(key)
        continue
      }
      value.splice(index, 1)
      this.cachedViews.set(key, value)
    }
  }

  @Mutation
  private DEL_OTHERS_VISITED_VIEWS(view: RouteLocationNormalizedLoaded): void {
    this.visitedViews = this.visitedViews.filter(v => {
      return v.meta.affix || v.path === view.path
    })
  }

  @Mutation
  private DEL_ALL_VISITED_VIEWS(): void {
    // keep affix tags
    const affixTags = this.visitedViews.filter(tag => tag.meta.affix)
    this.visitedViews = affixTags
  }

  @Mutation
  private UPDATE_VISITED_VIEW(view: RouteLocationNormalizedLoaded): void {
    for (let v of this.visitedViews) {
      if (v.path === view.path) {
        v = Object.assign(v, view)
        break
      }
    }
  }

  @Action
  public addView(view: RouteLocationNormalizedLoaded): void {
    this.addVisitedView(view)
    this.addCachedView()
  }

  @Action
  public addVisitedView(view: RouteLocationNormalizedLoaded): void {
    this.ADD_VISITED_VIEW(view)
  }

  @Action
  public addCachedView(): void {
    this.SET_CACHED_VIEW()
  }

  @Action
  public delView(view: RouteLocationNormalizedLoaded): Promise<unknown> {
    return new Promise(resolve => {
      this.delVisitedView(view)
      this.SET_CACHED_VIEW()
      resolve({
        visitedViews: [...this.visitedViews],
        cachedViews: [...this.cachedViews]
      })
    })
  }

  @Action
  public delVisitedView(view: RouteLocationNormalizedLoaded): Promise<unknown> {
    return new Promise(resolve => {
      this.DEL_VISITED_VIEW(view)
      resolve([...this.visitedViews])
    })
  }

  @Action
  public delCachedView(): Promise<unknown> {
    return new Promise(resolve => {
      this.DEL_CACHED_VIEW()
      resolve([...this.cachedViews])
    })
  }

  @Action
  public delOthersViews(view: RouteLocationNormalizedLoaded): Promise<unknown> {
    return new Promise(resolve => {
      this.delOthersVisitedViews(view)
      this.SET_CACHED_VIEW()
      resolve({
        visitedViews: [...this.visitedViews],
        cachedViews: [...this.cachedViews]
      })
    })
  }

  @Action
  public delOthersVisitedViews(view: RouteLocationNormalizedLoaded): Promise<unknown> {
    return new Promise(resolve => {
      this.DEL_OTHERS_VISITED_VIEWS(view)
      resolve([...this.visitedViews])
    })
  }

  @Action
  public delOthersCachedViews(): Promise<unknown> {
    return new Promise(resolve => {
      this.SET_CACHED_VIEW()
      resolve([...this.cachedViews])
    })
  }

  @Action
  public delAllViews(): Promise<unknown> {
    return new Promise(resolve => {
      this.delAllVisitedViews()
      this.SET_CACHED_VIEW()
      resolve({
        visitedViews: [...this.visitedViews],
        cachedViews: [...this.cachedViews]
      })
    })
  }

  @Action
  public delAllVisitedViews(): Promise<unknown> {
    return new Promise(resolve => {
      this.DEL_ALL_VISITED_VIEWS()
      resolve([...this.visitedViews])
    })
  }

  @Action
  public delAllCachedViews(): Promise<unknown> {
    return new Promise(resolve => {
      this.SET_CACHED_VIEW()
      resolve([...this.cachedViews])
    })
  }

  @Action
  public updateVisitedView(view: RouteLocationNormalizedLoaded): void {
    this.UPDATE_VISITED_VIEW(view)
  }
}

export const tagsViewStore = getModule<TagsView>(TagsView)
