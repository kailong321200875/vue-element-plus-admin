// 引入windi css
import '@/plugins/windicss'
import { createApp } from 'vue'
import App from './App.vue'
const app = createApp(App)
// 引入多语言
import { setupI18n } from '@/plugins/i18n'
// 引入状态管理
import { setupStore } from '@/store'

setupI18n(app)

setupStore(app)

app.mount('#app')
