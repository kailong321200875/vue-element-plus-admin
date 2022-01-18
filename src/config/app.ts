import { useCache } from '@/hooks/web/useCache'

const { wsCache } = useCache()

export type LayoutType = 'classic' | 'leftTop' | 'top' | 'test'

export interface AppState {
  breadcrumb: boolean
  breadcrumbIcon: boolean
  collapse: boolean
  hamburger: boolean
  screenfull: boolean
  size: boolean
  locale: boolean
  tagsView: boolean
  logo: boolean
  greyMode: boolean

  layout: LayoutType
  title: string
  logoTitle: string
  userInfo: string
  isDark: boolean
  currentSize: ElememtPlusSzie
  sizeMap: ElememtPlusSzie[]
  mobile: boolean
  theme: Recordable
}

export const appModules: AppState = {
  breadcrumb: true, // 面包屑
  breadcrumbIcon: true, // 面包屑图标
  collapse: false, // 折叠菜单
  hamburger: true, // 折叠图标
  screenfull: true, // 全屏图标
  size: true, // 尺寸图标
  locale: true, // 多语言图标
  tagsView: true, // 标签页
  logo: true, // logo
  greyMode: false, // 是否开始灰色模式，用于特殊悼念日

  layout: 'classic', // layout布局
  title: 'butterfly-admin', // 标题
  logoTitle: 'ButterflyAdmin', // logo标题
  userInfo: 'userInfo', // 登录信息存储字段-建议每个项目换一个字段，避免与其他项目冲突
  isDark: wsCache.get('isDark') || false, // 是否是暗黑模式
  currentSize: wsCache.get('default') || 'default', // 组件尺寸
  sizeMap: ['default', 'large', 'small'],
  mobile: false, // 是否是移动端
  theme: wsCache.get('theme') || {
    // 主题色
    elColorPrimary: '#409eff',
    // 左侧菜单边框颜色
    leftMenuBorderColor: 'inherit',
    // 左侧菜单背景颜色
    leftMenuBgColor: '#001529',
    // 左侧菜单浅色背景颜色
    leftMenuBgLightColor: '#0f2438',
    // 左侧菜单选中背景颜色
    leftMenuBgActiveColor: 'var(--el-color-primary)',
    // 左侧菜单收起选中背景颜色
    leftMenuCollapseBgActiveColor: 'var(--el-color-primary)',
    // 左侧菜单字体颜色
    leftMenuTextColor: '#bfcbd9',
    // 左侧菜单选中字体颜色
    leftMenuTextActiveColor: '#fff',
    // logo字体颜色
    logoTitleTextColor: '#fff',
    // logo边框颜色
    logoBorderColor: 'inherit'
  }
}
