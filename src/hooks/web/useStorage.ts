import { isArray, isObject } from '@/utils/is'

export const useStorage = (type: 'sessionStorage' | 'localStorage' = 'sessionStorage') => {
  const setStorage = (key: string, value: any) => {
    window[type].setItem(key, isArray(value) || isObject(value) ? JSON.stringify(value) : value)
  }

  const getStorage = (key: string) => {
    const value = window[type].getItem(key)
    try {
      return JSON.parse(value || '')
    } catch (error) {
      return value
    }
  }

  const removeStorage = (key: string) => {
    window[type].removeItem(key)
  }

  const clear = () => {
    window[type].clear()
  }

  return {
    setStorage,
    getStorage,
    removeStorage,
    clear
  }
}
