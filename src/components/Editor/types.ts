export interface EditorConfig {
  height?: number // 富文本高度
  zIndex?: number // 层级
  placeholder?: string // 提示文字
  focus?: boolean // 是否聚焦
  onchangeTimeout?: number // 几秒监听一次变化
  customAlert?: (s: string, t: string) => {} // 自定义提示
  menus?: string[] // 按钮菜单
  colors?: string[] // 颜色
  fontNames?: string[] // 字体
  lineHeights?: string[] // 行间距
  showFullScreen?: boolean // 是否全屏
}
