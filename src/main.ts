import { createApp } from 'vue'
import App from './App.vue'
import router from './router/' 

import './assets/css/buyu.mode.css'
import './assets/css/buyu.style.css'

const app = createApp(App)

app.use(router)

app.mount('#app')