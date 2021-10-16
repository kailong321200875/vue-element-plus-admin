const toString = Object.prototype.toString

export function is(val: unknown, type: string) {
  return toString.call(val) === `[object ${type}]`
}

// 验证网址
export function isExternal(path: any): boolean {
  return /^(https?|ftp):\/\/([a-zA-Z0-9.-]+(:[a-zA-Z0-9.&%$-]+)*@)*((25[0-5]|2[0-4][0-9]|1[0-9]{2}|[1-9][0-9]?)(\.(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[1-9]?[0-9])){3}|([a-zA-Z0-9-]+\.)*[a-zA-Z0-9-]+\.(com|edu|gov|int|mil|net|org|biz|arpa|info|name|pro|aero|coop|museum|[a-zA-Z]{2}))(:[0-9]+)*(\/($|[a-zA-Z0-9.,?'\\+&%$#=~_-]+))*$/.test(
    path
  )
}

// 验证邮箱
export function isEmail(path: any): boolean {
  return /^[A-Za-z\d]+([-_.][A-Za-z\d]+)*@([A-Za-z\d]+[-.])+[A-Za-z\d]{2,4}$/.test(path)
}

// 验证手机
export function isPhone(tel: any): boolean {
  return /^[1][3,4,5,6,7,8,9][0-9]{9}$/.test(tel)
}

// 验证身份证号
export function isIdCard(id: any): boolean {
  return /^[1-9]\d{5}(18|19|20|(3\d))\d{2}((0[1-9])|(1[0-2]))(([0-2][1-9])|10|20|30|31)\d{3}[0-9Xx]$/.test(
    id
  )
}

// 验证固定电话
export function isTel(tel: any): boolean {
  return /^((0\d{2,3})-)(\d{7,8})(-(\d{3,}))?$/.test(tel)
}

// 验证数字
export function isNum(num: any): boolean {
  return /^[0-9]*$/.test(num)
}

// 验证邮编
export function isCode(num: any): boolean {
  return /[1-9]\d{5}(?!\d)/.test(num)
}

// 验证IP
export function isIP(val: any): boolean {
  return /^(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])\.(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])\.(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])\.(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])$/.test(
    val
  )
}

// 正整数
export function isInteger(num: any): boolean {
  return /^[1-9]\d*$/.test(num)
}

// 英文
export function isEnglish(str: any): boolean {
  return /^[A-Za-z_]+$/.test(str)
}

// 中文
export function isChinese(str: any): boolean {
  return /[\u4E00-\u9FA5]/g.test(str)
}

// 不是浏览器环境
export const isServer = typeof window === 'undefined'

// 是否是对象
export function isObject(val: any): val is Record<any, any> {
  return val !== null && is(val, 'Object')
}

// 是否是火狐
export const isFirefox = function () {
  return !isServer && !!window.navigator.userAgent.match(/firefox/i)
}

// 是否是字符串
export function isString(val: unknown): val is string {
  return is(val, 'String')
}
