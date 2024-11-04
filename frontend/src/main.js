import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap/dist/js/bootstrap.bundle.min.js'
import Vue3Toastify from 'vue3-toastify'
import 'vue3-toastify/dist/index.css'

createApp(App)
  .use(router)
  .use(Vue3Toastify, {
    autoClose: 700,
    position: 'top-right',
    clearOnUrlChange: false,
  })
  .mount('#app')
