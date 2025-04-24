import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import axios from 'axios'
import HighchartsVue from 'highcharts-vue'
import NavBar from '@/components/NavBar.vue'
import '@/assets/style/global.css'

const app = createApp(App)

//axios.defaults.baseURL = 'http://localhost:10001/api/'
axios.defaults.baseURL = 'https://9164-192-169-121-20.ngrok-free.app/api/'
app.config.globalProperties.$axios = axios

app.use(router)
app.use(HighchartsVue)
app.component('nav-bar', NavBar)
app.mount('#app')
