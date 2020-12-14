export function is(val: unknown, type: string) {
  return toString.call(val) === `[object ${type}]`
}

export const isWindow = (val: any): val is Window => {
  return typeof window !== 'undefined' && is(val, 'Window')
}

export function isString(val: unknown): val is string {
  return is(val, 'String')
}

export const isDef = <T = unknown>(val?: T): val is T => {
  return typeof val !== 'undefined'
}

export const isUnDef = <T = unknown>(val?: T): val is T => {
  return !isDef(val)
}

export const isFunction = (val: unknown): val is Function => typeof val === 'function'

export const isServer = typeof window === 'undefined'

export function isNumber(val: unknown): val is number {
  return is(val, 'Number')
}

export const isFirefox = function() {
  return !!window.navigator.userAgent.match(/firefox/i)
}

export const isClient = () => {
  return typeof window !== 'undefined'
}

export const isObject = (val: any): val is Record<any, any> => {
  return val !== null && is(val, 'Object')
}

export const isElement = (val: unknown): val is Element => {
  return isObject(val) && !!val.tagName
}
