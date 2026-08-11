import type { App } from 'vue'
import { createI18n } from 'vue-i18n'
import { useLocaleStoreWithOut } from '@/store/modules/locale'
import { setHtmlPageLang } from './helper'
import { DEFAULT_LOCALE, localeMessages, type LocaleType } from '@/config/locale'

const createAppI18n = (locale: LocaleType) =>
  createI18n({
    legacy: false,
    locale,
    fallbackLocale: DEFAULT_LOCALE,
    messages: localeMessages,
    missingWarn: false,
    fallbackWarn: false
  })

export let i18n: ReturnType<typeof createAppI18n>

export const setupI18n = (app: App<Element>) => {
  const localeStore = useLocaleStoreWithOut()
  const locale = localeStore.currentLocale.lang

  if (localeStore.lang !== locale) {
    localeStore.setLocale(locale)
  }

  setHtmlPageLang(locale)

  i18n = createAppI18n(locale)
  app.use(i18n)
}
