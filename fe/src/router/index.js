import { createRouter, createWebHistory } from 'vue-router'

const routes = [
  {
    path: '/',
    name: 'Home',
    component: () => import('../views/Home.vue')
  },
  {
    path: '/apiView',
    name: 'ApiView',
    component: () => import('../views/ApiView.vue')
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router
