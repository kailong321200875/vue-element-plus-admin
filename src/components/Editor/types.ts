export interface Config {
  height: number
  zIndex: number
  placeholder: string
  focus: boolean
  customAlert: () => any
  menus: string[]
  colors: string[]
  fontNames: string[]
  lineHeights: string[]
  showFullScreen: boolean
  onchangeTimeout: number
}
