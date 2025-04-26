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
axios.defaults.baseURL = 'https://8ecf-2402-7500-578-27f0-7dba-8259-e828-c3ee.ngrok-free.app/api/'
axios.defaults.headers.common['ngrok-skip-browser-warning'] = 'true'
app.config.globalProperties.$axios = axios

app.use(router)
app.use(HighchartsVue)
app.use(pinia) // Now this will work
app.component('nav-bar', NavBar)
app.mount('#app')
