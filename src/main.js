import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import axios from 'axios'
import HighchartsVue from 'highcharts-vue'
import NavBar from '@/components/NavBar.vue'
import '@/assets/style/global.css'
import { createPinia } from 'pinia'

const pinia = createPinia() // Create pinia instance first
const app = createApp(App)

// axios.defaults.baseURL = 'https://4efd-140-116-49-123.ngrok-free.app/api/'
axios.defaults.baseURL = 'https://4c8f-2001-b011-3012-12f2-9dd0-ed6f-7721-ae28.ngrok-free.app/api/'
axios.defaults.headers.common['ngrok-skip-browser-warning'] = 'true'
app.config.globalProperties.$axios = axios

app.use(router)
app.use(HighchartsVue)
app.use(pinia) // Now this will work
app.component('nav-bar', NavBar)
app.mount('#app')
