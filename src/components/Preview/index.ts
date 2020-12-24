import ImgPreview from './index.vue'
import { isClient } from '@/utils/is'

import type { Options, Props } from './types'

import { createVNode, render } from 'vue'

let instance: any = null

export function createImgPreview(options: Options) {
  if (!isClient) return
  const { imageList, show = true, index = 0, onSelect = null, onClose = null, zIndex = 500 } = options

  const propsData: Partial<Props> = {}
  const container = document.createElement('div')
  propsData.imageList = imageList
  propsData.show = show
  propsData.index = index
  propsData.zIndex = zIndex
  propsData.onSelect = onSelect
  propsData.onClose = onClose

  instance = createVNode(ImgPreview, propsData)
  render(instance, container)
  document.body.appendChild(container)
}
