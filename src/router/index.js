import { createRouter, createWebHashHistory } from 'vue-router'
import login from '../views/Login.vue'

const routes = [
  {
    path: '/login',
    name: 'login',
    component: login
  },
  {
    path: '/',
    name: 'main',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/Main.vue')
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router
