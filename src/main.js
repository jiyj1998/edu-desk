import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

// import css
import '@/assets/css/bootstrap.min.css'
import '@/assets/css/font-awesome.min.css'
import '@/assets/css/nprogress.css'
import '@/assets/themes/flat/green.css'
import '@/assets/css/custom.min.css'

createApp(App).use(store).use(router).mount('#app')
