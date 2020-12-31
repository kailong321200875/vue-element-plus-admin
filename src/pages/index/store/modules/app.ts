import store from '../index'
import { VuexModule, getModule, Module, Mutation, Action } from 'vuex-module-decorators'

export interface AppState {
  collapsed: Boolean
  showTags: Boolean
  showLogo: Boolean
  showNavbar: Boolean
  fixedHeader: Boolean
  layout: String
  showBreadcrumb: Boolean
  showHamburger: Boolean
  showScreenfull: Boolean
  showUserInfo: Boolean
  title: String
  logoTitle: String
  userInfo: String
  greyMode: Boolean
  showBackTop: Boolean
}

@Module({ dynamic: true, namespaced: true, store, name: 'app' })
class App extends VuexModule implements AppState {
  public collapsed = false // 菜单栏是否栏缩收
  public showLogo = true // 是否显示logo
  public showTags = true // 是否显示标签栏
  public showNavbar = true // 是否显示navbar
  public fixedHeader = true // 是否固定header
  public layout = 'Classic' // layout布局
  public showBreadcrumb = true // 是否显示面包屑
  public showHamburger = true // 是否显示侧边栏缩收按钮
  public showScreenfull = true // 是否全屏按钮
  public showUserInfo = true // 是否显示用户头像
  public title = 'vue-element-plus-admin' // 标题
  public logoTitle = 'vue-ElPlus-admin' // logo标题
  public userInfo = 'userInfo' // 登录信息存储字段-建议每个项目换一个字段，避免与其他项目冲突
  public greyMode = false // 是否开始灰色模式，用于特殊悼念日
  public showBackTop = true // 是否显示回到顶部

  @Mutation
  private SET_COLLAPSED(collapsed: boolean): void {
    this.collapsed = collapsed
  }
  @Mutation
  private SET_SHOWLOGO(showLogo: boolean): void {
    this.showLogo = showLogo
  }
  @Mutation
  private SET_SHOWTAGS(showTags: boolean): void {
    this.showTags = showTags
  }
  @Mutation
  private SET_NAVBAR(showNavbar: boolean): void {
    this.showNavbar = showNavbar
  }
  @Mutation
  private SET_FIXEDHEADER(fixedHeader: boolean): void {
    this.fixedHeader = fixedHeader
  }
  @Mutation
  private SET_LAYOUT(layout: 'Classic' | 'LeftTop' | 'Top' | 'Test'): void {
    this.layout = layout
  }
  @Mutation
  private SET_BREADCRUMB(showBreadcrumb: boolean): void {
    this.showBreadcrumb = showBreadcrumb
  }
  @Mutation
  private SET_HAMBURGER(showHamburger: boolean): void {
    this.showHamburger = showHamburger
  }
  @Mutation
  private SET_SCREENFULL(showScreenfull: boolean): void {
    this.showScreenfull = showScreenfull
  }
  @Mutation
  private SET_USERINFO(showUserInfo: boolean): void {
    this.showUserInfo = showUserInfo
  }
  @Mutation
  private SET_TITLE(title: string): void {
    this.title = title
  }
  @Mutation
  private SET_LOGOTITLE(logoTitle: string): void {
    this.logoTitle = logoTitle
  }
  @Mutation
  private SET_GREYMODE(greyMode: boolean): void {
    this.greyMode = greyMode
  }
  @Mutation
  private SET_SHOWBACKTOP(showBackTop: boolean): void {
    this.showBackTop = showBackTop
  }

  @Action
  public SetCollapsed(collapsed: boolean): void {
    this.SET_COLLAPSED(collapsed)
  }
  @Action
  public SetShowLogo(showLogo: boolean): void {
    this.SET_SHOWLOGO(showLogo)
  }
  @Action
  public SetShowTags(showTags: boolean): void {
    this.SET_SHOWTAGS(showTags)
  }
  @Action
  public SetShowNavbar(showNavbar: boolean): void {
    this.SET_NAVBAR(showNavbar)
  }
  @Action
  public SetFixedHeader(fixedHeader: boolean): void {
    this.SET_FIXEDHEADER(fixedHeader)
  }
  @Action
  public SetLayout(layout: 'Classic' | 'LeftTop' | 'Top' | 'Test'): void {
    this.SET_LAYOUT(layout)
  }
  @Action
  public SetBreadcrumb(showBreadcrumb: boolean): void {
    this.SET_BREADCRUMB(showBreadcrumb)
  }
  @Action
  public SetHamburger(showHamburger: boolean): void {
    this.SET_HAMBURGER(showHamburger)
  }
  @Action
  public SetScreenfull(showScreenfull: boolean): void {
    this.SET_SCREENFULL(showScreenfull)
  }
  @Action
  public SetUserInfo(showUserInfo: boolean): void {
    this.SET_USERINFO(showUserInfo)
  }
  @Action
  public SetTitle(title: string): void {
    this.SET_TITLE(title)
  }
  @Action
  public SetLogoTitle(logoTitle: string): void {
    this.SET_LOGOTITLE(logoTitle)
  }
  @Action
  public SetGreyMode(greyMode: boolean): void {
    this.SET_GREYMODE(greyMode)
  }
  @Action
  public SetShowBackTop(showBackTop: boolean): void {
    this.SET_SHOWBACKTOP(showBackTop)
  }
}

export const appStore = getModule<App>(App)
