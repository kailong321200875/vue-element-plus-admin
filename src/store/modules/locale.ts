import { defineStore } from 'pinia'
import zhCn from 'element-plus/lib/locale/lang/zh-cn'
import en from 'element-plus/lib/locale/lang/en'
import { store } from '../index'

const elLocaleMap = {
  'zh-CN': zhCn,
  en: en
}

export interface LocaleState {
  locale: LocaleDropdownType
  localeMap: LocaleDropdownType[]
}

export const useLocaleStore = defineStore({
  id: 'locales',
  state: (): LocaleState => ({
    // 当前语言
    locale: {
      lang: 'zh-CN',
      elLocale: elLocaleMap['zh-CN']
    },
    // 多语言
    localeMap: [
      {
        lang: 'zh-CN',
        name: '简体中文'
      },
      {
        lang: 'en',
        name: 'English'
      }
    ]
  }),
  getters: {
    getLocale(): LocaleDropdownType {
      return this.locale
    },
    getLocaleMap(): LocaleDropdownType[] {
      return this.localeMap
    }
  },
  actions: {
    setLocale(localeMap: LocaleDropdownType) {
      // this.locale = Object.assign(this.locale, localeMap)
      this.locale.lang = localeMap?.lang
      this.locale.elLocale = elLocaleMap[localeMap?.lang]
    }
  }
})

export function useLocaleStoreWithOut() {
  return useLocaleStore(store)
}
