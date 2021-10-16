import Clipboard from 'clipboard'
import { Message } from '_c/Message'

export function useClipboard() {
  function clipboard(text: string, event: MouseEvent) {
    const clipboard = new Clipboard(event.target as Element, {
      text: () => text
    })
    clipboard.on('success', () => {
      clipboardSuccess()
      clipboard.destroy()
    })
    clipboard.on('error', () => {
      clipboardError()
      clipboard.destroy()
    })
    ;(clipboard as any).onClick(event)
  }

  function clipboardSuccess() {
    Message.success('复制成功')
  }

  function clipboardError() {
    Message.error('复制失败')
  }

  return {
    clipboard
  }
}
