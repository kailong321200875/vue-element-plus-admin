import { useCache } from '@/hooks/web/useCache'

const { wsCache } = useCache()

export type LayoutType = 'classic' | 'leftTop' | 'top' | 'test'

export interface AppState {
  collapse: boolean
  showTags: boolean
  showLogo: boolean
  showNavbar: boolean
  fixedHeader: boolean
  layout: LayoutType
  showBreadcrumb: boolean
  showHamburger: boolean
  showScreenfull: boolean
  showUserInfo: boolean
  title: string
  logoTitle: string
  userInfo: string
  greyMode: boolean
  showBackTop: boolean
  showMenuTab: boolean
  isDark: boolean
  size: ElememtPlusSzie
  sizeMap: ElememtPlusSzie[]
}

export const appModules: AppState = {
  collapse: false, // 菜单栏是否栏缩收
  showLogo: true, // 是否显示logo
  showTags: true, // 是否显示标签栏
  showNavbar: true, // 是否显示navbar
  fixedHeader: true, // 是否固定header
  layout: 'classic', // layout布局
  showBreadcrumb: true, // 是否显示面包屑
  showHamburger: true, // 是否显示侧边栏缩收按钮
  showScreenfull: true, // 是否全屏按钮
  showUserInfo: true, // 是否显示用户头像
  title: 'butterfly-admin', // 标题
  logoTitle: 'butterfly-admin', // logo标题
  userInfo: 'userInfo', // 登录信息存储字段-建议每个项目换一个字段，避免与其他项目冲突
  greyMode: false, // 是否开始灰色模式，用于特殊悼念日
  showBackTop: true, // 是否显示回到顶部
  showMenuTab: false, // 是否固定一级菜单
  isDark: wsCache.get('isDark') || false, // 是否是暗黑模式
  size: wsCache.get('default') || 'default', // 组件尺寸
  sizeMap: ['default', 'large', 'small']
}
