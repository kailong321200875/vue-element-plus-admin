/**
 * 媒体查询JS实现
 */

let enquire: any

if (typeof window !== 'undefined') {
  const matchMediaPolyfill = (mediaQuery: string) => {
    return {
      media: mediaQuery,
      matches: false,
      addListener() {},
      removeListener() {}
    }
  }
  window.matchMedia = window.matchMedia || matchMediaPolyfill
  // eslint-disable-next-line global-require
  enquire = require('enquire.js')
}

/**
 * 支持的响应类型 'xxl', 'xl', 'lg', 'md', 'sm', 'xs'
 * @type {string[]}
 */
export const responsiveArray = ['xxl', 'xl', 'lg', 'md', 'sm', 'xs']

export const responsiveMap = {
  xs: '(max-width: 575px)',
  sm: '(min-width: 576px)',
  md: '(min-width: 768px)',
  lg: '(min-width: 992px)',
  xl: '(min-width: 1200px)',
  xxl: '(min-width: 1600px)'
}

let subscribers: any[] = [] // [{token, func}]
let subUid = -1
let screens = {}

const responsiveObserve = {
  /**
   * 派发事件
   * @param {Object} pointMap 媒体断点，如：{xxl:false, xl:true}
   * @return {boolean}
   */
  fire(pointMap: any) {
    screens = pointMap
    if (subscribers.length < 1) {
      return false
    }
    subscribers.forEach((item) => {
      item.func(screens)
    })
    return true
  },
  /**
   * 订阅事件
   * @param {Function} func
   * @return {string}
   */
  on(func: Fn) {
    if (subscribers.length === 0) {
      this.register()
    }
    const token = (++subUid).toString()
    subscribers.push({
      token,
      func
    })
    func(screens)
    return token
  },
  /**
   * 取消事件订阅
   * @param {string} token
   */
  off(token: string) {
    subscribers = subscribers.filter((item) => item.token !== token)
    if (subscribers.length === 0) {
      this.unregister()
    }
  },
  register() {
    Object.keys(responsiveMap).forEach((screen) => {
      enquire.register(responsiveMap[screen], {
        match: () => {
          const ponitMap = {
            ...screens,
            [screen]: true
          }
          this.fire(ponitMap)
        },
        unmatch: () => {
          const ponitMap = {
            ...screens,
            [screen]: false
          }
          this.fire(ponitMap)
        },
        // Keep a empty destroy to avoid triggering unmatch when unregister
        destroy() {}
      })
    })
  },
  unregister() {
    Object.keys(responsiveMap).map((screen) => enquire.unregister(responsiveMap[screen]))
  }
}

export default responsiveObserve
