import { createApp } from 'vue'

import App from './App.vue'

const app = createApp(App)

// 引入windi css
import '@/plugins/windicss'

// 引入多语言
import { setupI18n } from '@/plugins/i18n'
setupI18n(app)

app.mount('#app')
