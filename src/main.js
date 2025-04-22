import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import axios from 'axios'
import HighchartsVue from 'highcharts-vue'
import NavBar from '@/components/NavBar.vue'
import '@/assets/style/global.css'

const app = createApp(App)

axios.defaults.baseURL = 'http://127.0.0.1:8000/api/'
app.config.globalProperties.$axios = axios

app.use(router)
app.use(HighchartsVue)
app.component('nav-bar', NavBar)
app.mount('#app')
