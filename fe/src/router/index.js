import { createRouter, createWebHistory } from 'vue-router'

const routes = [
  {
    path: '/',
    name: 'Home',
    component: () => import('../views/Home.vue')
  },
  {
    path: '/apiView',
    name: 'testView',
    component: () => import('../views/TestView.vue')
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router
