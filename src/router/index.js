import { createRouter, createWebHistory } from 'vue-router'
import ListActivity from '@/views/ListActivity.vue'

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