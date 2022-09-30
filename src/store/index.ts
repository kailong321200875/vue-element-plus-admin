// TODO: 感觉这样是有问题的，但目前还没想到更好的办法
import { createPinia } from 'pinia'

import { createApp } from 'vue'

import App from '../App.vue'

import { createPersistedState } from 'pinia-plugin-persistedstate'

const app = createApp(App)

const store = createPinia()

store.use(
  createPersistedState({
    storage: sessionStorage
  })
)

app.use(store)

export { store }
