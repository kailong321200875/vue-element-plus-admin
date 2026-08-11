import type { App } from 'vue'
import { createPinia } from 'pinia'
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate'

const store = createPinia()

store.use(piniaPluginPersistedstate)

const migratePersistedState = () => {
  const legacyLocale = localStorage.getItem('lang')
  if (legacyLocale && !localStorage.getItem('vea-locale-v1')) {
    try {
      const { value } = JSON.parse(legacyLocale)
      if (value === 'zh-CN' || value === 'en') {
        localStorage.setItem('vea-locale-v1', JSON.stringify({ lang: value }))
      }
    } catch {
      // Ignore malformed legacy state and fall back to the default locale.
    }
  }

  ;['user', 'permission', 'lock', 'app', 'locales', 'lang'].forEach((key) => {
    localStorage.removeItem(key)
  })
}

export const setupStore = (app: App<Element>) => {
  migratePersistedState()
  app.use(store)
}

export { store }
