import type { LocaleCode } from '@/config/locale'

export const setHtmlPageLang = (locale: LocaleCode) => {
  document.querySelector('html')?.setAttribute('lang', locale)
}
