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

export type LocaleType = keyof typeof localeRegistry

export const DEFAULT_LOCALE: LocaleType = 'zh-CN'

export const isLocale = (value: unknown): value is LocaleType =>
  typeof value === 'string' && value in localeRegistry

export const localeOptions = (Object.keys(localeRegistry) as LocaleType[]).map((value) => ({
  value,
  label: localeRegistry[value].label
}))

export const localeMessages = Object.fromEntries(
  (Object.keys(localeRegistry) as LocaleType[]).map((locale) => [
    locale,
    localeRegistry[locale].messages
  ])
)
