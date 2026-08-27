import { useI18n } from 'vue-i18n'
import { useLocaleStore } from '@/store/modules/locale'
import type { LocaleCode } from '@/config/locale'

export const useLocale = () => {
  const localeStore = useLocaleStore()
  const { locale } = useI18n()

  const changeLocale = (lang: LocaleCode) => {
    locale.value = lang
    localeStore.setLocale(lang)
    document.documentElement.lang = lang
  }

  return { changeLocale }
}
