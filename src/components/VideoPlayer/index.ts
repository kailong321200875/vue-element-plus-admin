import { VNode, createVNode, render } from 'vue'
import VideoPlayer from './src/VideoPlayer.vue'
import { isClient } from '@/utils/is'
import { VideoPlayerViewer } from '@/components/VideoPlayerViewer'
import { toAnyString } from '@/utils'

export { VideoPlayer }

let instance: Nullable<VNode> = null

export function createVideoViewer(options: { url: string; poster?: string; show?: boolean }) {
  if (!isClient) return
  const { url, poster } = options

  const propsData: Partial<{ url: string; poster?: string; show?: boolean; id?: string }> = {}
  const container = document.createElement('div')
  const id = toAnyString()
  container.id = id
  propsData.url = url
  propsData.poster = poster
  propsData.show = true
  propsData.id = id

  document.body.appendChild(container)
  instance = createVNode(VideoPlayerViewer, propsData)
  render(instance, container)
}
