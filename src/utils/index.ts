// import type { Plugin } from 'vue'

/**
 *
 * @param component 需要注册的组件
 * @param alias 组件别名
 * @returns any
 */
export const withInstall = <T>(component: T, alias?: string) => {
  const comp = component as any
  comp.install = (app: any) => {
    app.component(comp.name || comp.displayName, component)
    if (alias) {
      app.config.globalProperties[alias] = component
    }
  }
  return component as T & Plugin
}

/**
 * @param str 需要转下划线的驼峰字符串
 * @returns 字符串下划线
 */
export const humpToUnderline = (str: string): string => {
  return str.replace(/([A-Z])/g, '-$1').toLowerCase()
}

/**
 * @param str 需要转驼峰的下划线字符串
 * @returns 字符串驼峰
 */
export const underlineToHump = (str: string): string => {
  if (!str) return ''
  return str.replace(/\-(\w)/g, (_, letter: string) => {
    return letter.toUpperCase()
  })
}

/**
 * 驼峰转横杠
 */
export const humpToDash = (str: string): string => {
  return str.replace(/([A-Z])/g, '-$1').toLowerCase()
}

export const setCssVar = (prop: string, val: any, dom = document.documentElement) => {
  dom.style.setProperty(prop, val)
}

/**
 * 查找数组对象的某个下标
 * @param {Array} ary 查找的数组
 * @param {Functon} fn 判断的方法
 */
// eslint-disable-next-line
export const findIndex = <T = Recordable>(ary: Array<T>, fn: Fn): number => {
  if (ary.findIndex) {
    return ary.findIndex(fn)
  }
  let index = -1
  ary.some((item: T, i: number, ary: Array<T>) => {
    const ret: T = fn(item, i, ary)
    if (ret) {
      index = i
      return ret
    }
  })
  return index
}

export const trim = (str: string) => {
  return str.replace(/(^\s*)|(\s*$)/g, '')
}

/**
 * @param {Date | number | string} time 需要转换的时间
 * @param {String} fmt 需要转换的格式 如 yyyy-MM-dd、yyyy-MM-dd HH:mm:ss
 */
export function formatTime(time: Date | number | string, fmt: string) {
  if (!time) return ''
  else {
    const date = new Date(time)
    const o = {
      'M+': date.getMonth() + 1,
      'd+': date.getDate(),
      'H+': date.getHours(),
      'm+': date.getMinutes(),
      's+': date.getSeconds(),
      'q+': Math.floor((date.getMonth() + 3) / 3),
      S: date.getMilliseconds()
    }
    if (/(y+)/.test(fmt)) {
      fmt = fmt.replace(RegExp.$1, (date.getFullYear() + '').substr(4 - RegExp.$1.length))
    }
    for (const k in o) {
      if (new RegExp('(' + k + ')').test(fmt)) {
        fmt = fmt.replace(
          RegExp.$1,
          RegExp.$1.length === 1 ? o[k] : ('00' + o[k]).substr(('' + o[k]).length)
        )
      }
    }
    return fmt
  }
}

/**
 * 生成随机字符串
 */
export function toAnyString() {
  const str: string = 'xxxxx-xxxxx-4xxxx-yxxxx-xxxxx'.replace(/[xy]/g, (c: string) => {
    const r: number = (Math.random() * 16) | 0
    const v: number = c === 'x' ? r : (r & 0x3) | 0x8
    return v.toString()
  })
  return str
}

/**
 * 首字母大写
 */
export function firstUpperCase(str: string) {
  return str.toLowerCase().replace(/( |^)[a-z]/g, (L) => L.toUpperCase())
}

// 根据当前时间获取祝福语
export const getGreeting = (): string => {
  const now = new Date()
  const hour = now.getHours()

  if (hour >= 6 && hour < 10) {
    return '早上好'
  } else if (hour >= 10 && hour < 13) {
    return '中午好'
  } else if (hour >= 13 && hour < 18) {
    return '下午好'
  } else {
    return '晚上好'
  }
}

// 获取当前星期几
export const getDayOfWeek = (): string => {
  const daysOfWeek: string[] = [
    '星期日',
    '星期一',
    '星期二',
    '星期三',
    '星期四',
    '星期五',
    '星期六'
  ]
  const date: Date = new Date()
  const dayOfWeekIndex: number = date.getDay()
  return daysOfWeek[dayOfWeekIndex]
}

// 数字转金额
// 作者：时光足迹
// 链接：https://juejin.cn/post/7028086399601475591
// 来源：稀土掘金
export const formatMoney = (amount, currency = true): string => {
  const formatter = new Intl.NumberFormat('zh-CN', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
    useGrouping: true
  })

  const formattedAmount = formatter.format(amount)

  if (currency) {
    return `￥${formattedAmount}`
  }

  return formattedAmount
}

/**
 * 小数转折扣
 * 例子：0.85 -> 8.5折
 * 例子：0.5 -> 5折
 */
export const convertToDiscount = (decimal: number | undefined): string => {
  if (decimal === undefined) {
    return ''
  }
  const discount = decimal * 10
  if (discount === 10) {
    return '无折扣'
  }
  return discount % 1 === 0 ? `${discount}折` : `${discount.toFixed(1)}折`
}

/**
 * 获取当前时间
 * 返回：yyyy-MM-dd HH:mm:ss
 */
export const getCurrentDateTime = (): string => {
  const now: Date = new Date()

  const year: number = now.getFullYear()
  const month: number = now.getMonth() + 1
  const day: number = now.getDate()
  const hours: number = now.getHours()
  const minutes: number = now.getMinutes()
  const seconds: number = now.getSeconds()

  // 格式化为字符串
  const formattedDateTime = `${year}-${padZero(month)}-${padZero(day)} ${padZero(hours)}:${padZero(
    minutes
  )}:${padZero(seconds)}`

  return formattedDateTime
}

/**
 * 获取当前日期
 * 返回：yyyy-MM-dd HH:mm:ss
 */
export const getCurrentDate = (): string => {
  const now: Date = new Date()

  const year: number = now.getFullYear()
  const month: number = now.getMonth() + 1
  const day: number = now.getDate()

  // 格式化为字符串
  const formattedDate = `${year}-${padZero(month)}-${padZero(day)}`

  return formattedDate
}

// 辅助函数：在数字小于10时，在前面补零
export const padZero = (num: number): string => {
  return num < 10 ? `0${num}` : `${num}`
}

// 将base64编码的字符串转换为文件
export const base64ToFile = (dataURI, filename): File => {
  const arr = dataURI.split(',')
  const mime = arr[0].match(/:(.*?);/)[1]
  const bstr = atob(arr[1])
  let n = bstr.length
  const u8arr = new Uint8Array(n)
  while (n--) {
    u8arr[n] = bstr.charCodeAt(n)
  }
  return new File([u8arr], filename, { type: mime })
}

// 将指定索引的元素移动到目标索引的函数
export const moveElementToIndex = (array: any[], fromIndex: number, toIndex: number) => {
  const clonedArray = [...array] // 克隆数组以避免修改原始数组

  if (
    fromIndex >= 0 &&
    fromIndex < clonedArray.length &&
    toIndex >= 0 &&
    toIndex < clonedArray.length
  ) {
    const [element] = clonedArray.splice(fromIndex, 1) // 移除指定索引的元素
    clonedArray.splice(toIndex, 0, element) // 将元素插入目标索引位置
  }

  return clonedArray
}
