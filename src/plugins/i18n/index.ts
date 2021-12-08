import { createI18n } from 'vue-i18n'
import type { App } from 'vue'

const messages = Object.fromEntries(
  Object.entries(import.meta.globEager('../../locales/*.ts')).map(([key, value]) => {
    return [key.slice(14, -3), value.default]
  })
)

export function setupI18n(app: App<Element>): void {
  const i18n = createI18n({
    legacy: false,
    locale: 'zh-CN',
    messages
  })
  app.use(i18n)
}
