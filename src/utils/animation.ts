import { isServer } from './validate'
let lastTime = 0
const prefixes = 'webkit moz ms o'.split(' ')

let requestAnimationFrame: any
let cancelAnimationFrame: any
;(() => {
  const NO_LOOP = () => {}
  const getWindowFrame = (name: any) => {
    return name
  }
  if (isServer) {
    requestAnimationFrame = cancelAnimationFrame = NO_LOOP
  } else {
    requestAnimationFrame = window.requestAnimationFrame
    cancelAnimationFrame = window.cancelAnimationFrame
    let prefix
    for (let i = 0; i < prefixes.length; i++) {
      if (requestAnimationFrame && cancelAnimationFrame) {
        break
      }
      prefix = prefixes[i]
      requestAnimationFrame =
        requestAnimationFrame || window[getWindowFrame(prefix + 'RequestAnimationFrame')]
      cancelAnimationFrame =
        cancelAnimationFrame ||
        window[getWindowFrame(prefix + 'CancelAnimationFrame')] ||
        window[getWindowFrame(prefix + 'CancelRequestAnimationFrame')]
    }

    // If the current browser does not support requestAnimationFrame and cancelAnimationFrame, it will fall back to setTimeout
    if (!requestAnimationFrame || !cancelAnimationFrame) {
      requestAnimationFrame = function (callback: Fn) {
        const currTime = new Date().getTime()
        const timeToCall = Math.max(0, 16 - (currTime - lastTime))
        const id = window.setTimeout(() => {
          /* eslint-disable-next-line */
          callback(currTime + timeToCall)
        }, timeToCall)
        lastTime = currTime + timeToCall
        return id
      }

      cancelAnimationFrame = function (id: any) {
        window.clearTimeout(id)
      }
    }
  }
})()

export { requestAnimationFrame, cancelAnimationFrame }
