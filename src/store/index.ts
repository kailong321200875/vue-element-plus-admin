import type { AppContext, Plugin } from 'vue'
import { createPinia } from 'pinia'
import piniaPluginPersist from 'pinia-plugin-persist'

const store = createPinia()

store.use(piniaPluginPersist)

export const setupStore = (app: AppContext['app']) => {
  app.use(store as Plugin)
}

export { store }
