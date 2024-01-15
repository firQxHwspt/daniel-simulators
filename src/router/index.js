import { createRouter, createWebHistory } from 'vue-router'
import IMTView from '../views/IMTView.vue'
import MaisValiasView from '@/views/MaisValiasView.vue';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: IMTView
    },
    {
      path: '/mais-valias',
      name: 'mais-valias',
      component: MaisValiasView
    },
  ]
})

export default router
