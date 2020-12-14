import { isFunction, isUnDef } from '@/utils/is'
import { ref, unref } from 'vue'
import { requestAnimationFrame } from '@/utils/animation'

export interface ScrollToParams {
  el: HTMLElement
  position: string
  to: number
  duration?: number
  callback?: () => any
}

const easeInOutQuad = (t: number, b: number, c: number, d: number) => {
  t /= d / 2
  if (t < 1) {
    return (c / 2) * t * t + b
  }
  t--
  return (-c / 2) * (t * (t - 2) - 1) + b
}
const move = (el: HTMLElement, position: string, amount: number) => {
  el[position] = amount
}

export function useScrollTo({ el, position = 'scrollLeft', to, duration = 500, callback }: ScrollToParams) {
  const isActiveRef = ref(false)
  const start = el[position]
  const change = to - start
  const increment = 20
  let currentTime = 0
  duration = isUnDef(duration) ? 500 : duration

  const animateScroll = function() {
    if (!unref(isActiveRef)) {
      return
    }
    currentTime += increment
    const val = easeInOutQuad(currentTime, start, change, duration)
    move(el, position, val)
    if (currentTime < duration && unref(isActiveRef)) {
      requestAnimationFrame(animateScroll)
    } else {
      if (callback && isFunction(callback)) {
        callback()
      }
    }
  }
  const run = () => {
    isActiveRef.value = true
    animateScroll()
  }

  const stop = () => {
    isActiveRef.value = false
  }

  return { start: run, stop }
}
