import zhCNMessages from '@/locales/zh-CN'
import enMessages from '@/locales/en'
import zhCNElement from 'element-plus/es/locale/lang/zh-cn'
import enElement from 'element-plus/es/locale/lang/en'

export const localeRegistry = {
  'zh-CN': {
    label: '简体中文',
    messages: zhCNMessages,
    elementLocale: zhCNElement
  },
  en: {
    label: 'English',
    messages: enMessages,
    elementLocale: enElement
  }
} as const

export type LocaleCode = keyof typeof localeRegistry

export const DEFAULT_LOCALE: LocaleCode = 'zh-CN'

export const isLocale = (value: unknown): value is LocaleCode =>
  typeof value === 'string' && value in localeRegistry

export const localeOptions = (Object.keys(localeRegistry) as LocaleCode[]).map((value) => ({
  value,
  label: localeRegistry[value].label
}))

export const localeMessages = Object.fromEntries(
  (Object.keys(localeRegistry) as LocaleCode[]).map((locale) => [
    locale,
    localeRegistry[locale].messages
  ])
)
