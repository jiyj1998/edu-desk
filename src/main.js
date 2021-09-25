import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'

import 'bootstrap/dist/css/bootstrap.min.css'
import 'font-awesome/css/font-awesome.min.css'
import 'nprogress/nprogress.css'
import '@/assets/themes/flat/green.css'
import '@/assets/css/custom.min.css'

import 'bootstrap/dist/js/bootstrap.min'
import '@/assets/js/fastclick.js'
import NProgress from 'nprogress/nprogress'
import '@/assets/js/custom.js'
import '@/assets/js/bootstrap-progressbar.min'

createApp(App).use(store).use(router).use(ElementPlus).mount('#app')

router.beforeEach((to, from, next) => {
  console.log(to.path)
  if (to.path === '/login') {
    sessionStorage.removeItem('username')
  }
  const user = sessionStorage.getItem('username')
  if (!user && to.path !== '/login') {
    next({ path: '/login' })
  } else {
    NProgress.start()
    next()
  }
})

router.afterEach(transition => {
  NProgress.done()
})
