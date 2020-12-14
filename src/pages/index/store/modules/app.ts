import store from '../index'
import { VuexModule, getModule, Module, Mutation, Action } from 'vuex-module-decorators'

export interface AppState {
  collapsed: boolean
  showTags: boolean
  showLogo: boolean
  showNavbar: boolean
  fixedTags: boolean
  fixedNavbar: boolean
  layout: string
}

@Module({ dynamic: true, namespaced: true, store, name: 'app' })
class App extends VuexModule implements AppState {
  public collapsed = false // 菜单栏是否栏缩收
  public showLogo = true // 是否显示logo
  public showTags = true // 是否显示标签栏
  public showNavbar = true // 是否显示navbar
  public fixedTags = true // 是否固定标签栏
  public fixedNavbar = true // 是否固定navbar
  public layout = 'Classic' // layout布局

  @Mutation
  private SET_COLLAPSED(collapsed: boolean): void {
    this.collapsed = collapsed
  }
  private SET_SHOWLOGO(showLogo: boolean): void {
    this.showLogo = showLogo
  }
  private SET_SHOWTAGS(showTags: boolean): void {
    this.showTags = showTags
  }
  private SET_NAVBAR(showNavbar: boolean): void {
    this.showNavbar = showNavbar
  }
  private SET_FIXEDTAGS(fixedTags: boolean): void {
    this.fixedTags = fixedTags
  }
  private SET_FIXEDNAVBAR(fixedNavbar: boolean): void {
    this.fixedNavbar = fixedNavbar
  }
  private SET_LAYOUT(layout: 'Classic' | 'LeftTop' | 'Top' | 'Test'): void {
    this.layout = layout
  }

  @Action
  public SetCollapsed(collapsed: boolean): void {
    this.SET_COLLAPSED(collapsed)
  }
  public SetShowLogo(showLogo: boolean): void {
    this.SET_SHOWLOGO(showLogo)
  }
  public SetShowTags(showTags: boolean): void {
    this.SET_SHOWTAGS(showTags)
  }
  public SetShowNavbar(showNavbar: boolean): void {
    this.SET_NAVBAR(showNavbar)
  }
  public SetFixedTags(fixedTags: boolean): void {
    this.SET_FIXEDTAGS(fixedTags)
  }
  public SetFixedNavbar(fixedNavbar: boolean): void {
    this.SET_FIXEDNAVBAR(fixedNavbar)
  }
  public SetLayout(layout: 'Classic' | 'LeftTop' | 'Top' | 'Test'): void {
    this.SET_LAYOUT(layout)
  }
}

export const appStore = getModule<App>(App)
