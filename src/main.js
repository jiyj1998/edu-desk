import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'

// import css
import '@/assets/css/bootstrap.min.css'
import '@/assets/css/font-awesome.min.css'
import '@/assets/css/nprogress.css'
import '@/assets/themes/flat/green.css'
import '@/assets/css/custom.min.css'

import 'bootstrap/dist/js/bootstrap.min'
import '@/assets/js/fastclick.js'
import '@/assets/js/nprogress.js'
import '@/assets/js/custom.js'
import '@/assets/js/bootstrap-progressbar.min'

createApp(App).use(store).use(router).use(ElementPlus).mount('#app')
