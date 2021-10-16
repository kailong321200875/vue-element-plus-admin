import { isIdCard, isPhone, isCode, isIP, isExternal, isInteger, isEnglish } from '@/utils/validate'

// 必填项
export const requiredRule = {
  required: true,
  message: '该项不能为空'
}

// 身份证验证
export const idCardRule = {
  validator: (_, value, callback: Fn) => {
    if (isIdCard(value)) {
      callback()
    } else {
      return callback(new Error('请输入正确的身份证号码'))
    }
  }
}

// 手机号验证
export const isPhoneRule = {
  validator: (_, value, callback: Fn) => {
    if (isPhone(value)) {
      callback()
    } else {
      return callback(new Error('请输入正确的联系电话'))
    }
  }
}

// 邮箱验证
export const isEmailRule = {
  type: 'email',
  message: '请输入正确的电子邮箱'
}

// url验证
export const isUrl = {
  validator: (_, value, callback: Fn) => {
    if (isExternal(value)) {
      callback()
    } else {
      return callback(new Error('请输入正确的地址'))
    }
  }
}

// 邮编验证
export const isCodeRule = {
  validator: (_, value, callback: Fn) => {
    if (isCode(value)) {
      callback()
    } else {
      return callback(new Error('请输入正确的邮编'))
    }
  }
}

// IP验证
export const isIPRule = {
  validator: (_, value, callback: Fn) => {
    if (isIP(value)) {
      callback()
    } else {
      return callback(new Error('请输入正确的IP地址'))
    }
  }
}

// 正整数
export const isIntegerRule = {
  validator: (_, value, callback: Fn) => {
    if (isInteger(value)) {
      callback()
    } else {
      return callback(new Error('请输入正整数'))
    }
  }
}

// 只能是英文
export const isEnglishRule = {
  validator: (_, value, callback: Fn) => {
    if (isEnglish(value)) {
      callback()
    } else {
      return callback(new Error('请输入英文字母'))
    }
  }
}
