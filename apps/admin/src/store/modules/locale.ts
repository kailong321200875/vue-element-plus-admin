import { defineStore } from 'pinia'
import { store } from '../index'
import { DEFAULT_LOCALE, isLocale, localeRegistry, type LocaleCode } from '@/config/locale'

interface LocaleState {
  lang: LocaleCode
}

export const useLocaleStore = defineStore('locales', {
  state: (): LocaleState => ({ lang: DEFAULT_LOCALE }),
  getters: {
    currentLocale: (state: LocaleState) => {
      const lang = isLocale(state.lang) ? state.lang : DEFAULT_LOCALE
      return { lang, elementLocale: localeRegistry[lang].elementLocale }
    }
  },
  actions: {
    setLocale(lang: LocaleCode) {
      this.lang = lang
    }
  },
  persist: {
    key: 'vea-locale-v1',
    pick: ['lang']
  }
})

export const useLocaleStoreWithOut = () => {
  return useLocaleStore(store)
}
