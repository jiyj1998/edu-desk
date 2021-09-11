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

// import js
// import '@/assets/js/jquery.min.js'
// import '@/assets/js/bootstrap.min.js'
import 'bootstrap/dist/js/bootstrap.min'
import '@/assets/js/fastclick.js'
import '@/assets/js/nprogress.js'
import '@/assets/js/custom.js'

createApp(App).use(store).use(router).mount('#app')
