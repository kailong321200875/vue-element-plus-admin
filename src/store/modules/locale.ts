import { defineStore } from 'pinia'
import { store } from '../index'
import { useCache } from '@/hooks/web/useCache'
import { localeModules, elLocaleMap } from '@/config/locale'
import type { LocaleState } from '@/config/locale'

const { wsCache } = useCache()

export const useLocaleStore = defineStore({
  id: 'locales',
  state: (): LocaleState => localeModules,
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
      wsCache.set('lang', localeMap?.lang)
    }
  }
})

export function useLocaleStoreWithOut() {
  return useLocaleStore(store)
}
