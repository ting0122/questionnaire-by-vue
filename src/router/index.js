import { createRouter, createWebHistory } from 'vue-router'
import ListActivity from '@/views/ActivityContainer.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'ListActivity',
      component: ListActivity
    },
    {
      path: '/activity',
      name: 'ActivityContainer',
      component: ()=>import("../views/ActivityContainer.vue")
    },
    {
      path: '/question',
      name: 'Question',
      component: ()=>import("../views/Question.vue")
    },
    {
      path: '/feedback',
      name: 'FeedBack',
      component: ()=>import("../views/FeedBack.vue")
    },
    {
      path: '/statics',
      name: 'Statics',
      component: ()=>import("../views/Statics.vue")
    }
  ]
})

export default router