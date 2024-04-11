import './assets/styles/style.scss'

import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import { router } from './router'
import { useAuthStore } from './stores/AuthStore.js'

startApp()
async function startApp() {
  const app = createApp(App)

  app.use(createPinia())
  app.use(router)

  try {
    const authStore = useAuthStore()
    if (authStore.user) {
      await authStore.refreshToken()
    }
  } catch {}

  app.mount('#app')
}

