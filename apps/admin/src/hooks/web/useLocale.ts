import { i18n } from '@/plugins/vueI18n'
import { useLocaleStoreWithOut } from '@/store/modules/locale'
import { setHtmlPageLang } from '@/plugins/vueI18n/helper'
import type { LocaleType } from '@/config/locale'

export const useLocale = () => {
  const localeStore = useLocaleStoreWithOut()

  const changeLocale = (locale: LocaleType) => {
    i18n.global.locale.value = locale
    localeStore.setLocale(locale)
    setHtmlPageLang(locale)
  }

  return {
    changeLocale
  }
}
