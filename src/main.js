import { createPinia } from 'pinia'
import { createApp } from 'vue'

import axios from 'axios'
import { darkModeKey } from '@/config.js'
import { useMainStore } from '@/stores/main.js'
import { useStyleStore } from '@/stores/style.js'
import App from './App.vue'
import router from './router'

import './css/main.css'

/* API and Webserver */
const apiDomain = import.meta.env.VITE_API_DOMAIN
// TODO: const wsConnection = import.meta.env.VITE_WS_CONNECTION

/* Init Pinia */
const pinia = createPinia()

/* Create Vue app */
const app = createApp(App).use(router).use(pinia)

/* Set API domain */
pinia.state.value.apiDomain = `${apiDomain}/api`

/* Provide global variables */
app.provide('apiDomain', apiDomain)
app.provide(
  'axios',
  axios.create({
    baseURL: `${apiDomain}/api`,
    headers: {
      'Content-type': 'application/json',
    },
  })
)

/* Init Pinia stores */
// TODO: remove sample store
const mainStore = useMainStore(pinia)
const styleStore = useStyleStore(pinia)

/* Fetch sample data */
mainStore.fetch('clients')
mainStore.fetch('history')

// mainStore.$state.axios.defaults.baseURL = `${apiDomain}/api`

/* TODO: Websocket */
// if (wsConnection) {
//   const ws = new WebSocket(wsConnection)
//   ws.onopen = () => {
//     console.log('Websocket connected')
//   }
//   ws.onmessage = (event) => {
//     const data = JSON.parse(event.data)
//     if (data.type === 'notification') {
//       mainStore.notification = data.message
//     }
//   }
// }

/* App style */
styleStore.setStyle()

/* Dark mode */
if (
  (!localStorage[darkModeKey] &&
    window.matchMedia('(prefers-color-scheme: dark)').matches) ||
  localStorage[darkModeKey] === '1'
) {
  styleStore.setDarkMode(true)
}

/* Default title tag */
const defaultDocumentTitle = 'Fastuga'

/* Set document title from route meta */
router.afterEach((to) => {
  document.title = to.meta?.title
    ? `${to.meta.title} — ${defaultDocumentTitle}`
    : defaultDocumentTitle
})

app.mount('#app')
