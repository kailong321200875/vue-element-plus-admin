import { createI18n } from 'vue-i18n'

export const i18n = setupI18n()

function setupI18n() {
  const messages = Object.fromEntries(
    Object.entries(import.meta.globEager('../../locales/*.ts')).map(([key, value]) => {
      return [key.slice(14, -3), value.default]
    })
  )
  return createI18n({
    legacy: false,
    locale: 'zh-CN',
    messages
  })
}
