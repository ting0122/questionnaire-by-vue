import { createRouter, createWebHistory } from 'vue-router'
import ListActivity from '@/views/ActivityContainer.vue'


const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'ListActivity',
      component: ListActivity
    }
  ]
})

export default router