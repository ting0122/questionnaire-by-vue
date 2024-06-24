import { createRouter, createWebHistory } from 'vue-router'
import ActivityContainer from '@/views/ActivityContainer.vue'


const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'ActivityContainer',
      component: ActivityContainer
    }
  ]
})

export default router