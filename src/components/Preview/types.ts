export interface Options {
  show?: boolean
  imageList: string[]
  index?: number
  zIndex?: number
  onSelect?: Function | null
  onClose?: Function | null
}

export interface Props {
  show: boolean
  instance: Props
  imageList: string[]
  index: number
  zIndex: number
  onSelect: Function | null
  onClose: Function | null
}
