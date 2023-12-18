import { createRouter, createWebHistory } from 'vue-router'
import IMTView from '../views/IMTView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: IMTView
    },
  ]
})

export default router
