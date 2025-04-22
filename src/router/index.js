import { createRouter, createWebHistory } from 'vue-router'
import ChallengePage from '@/views/ChallengePage.vue'
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      name: 'challenge',
      path: '/challenge',
      meta: { title: 'Challenge' },
      component: ChallengePage,
    },
    {
      name: 'personal-page',
      path: '/personal-page',
      meta: { title: 'Personal Page' },
      component: () => import('@/views/PersonalPage.vue'),
    },
    {
      name: 'home',
      path: '/',
      meta: { title: 'Home' },
      component: ChallengePage,
    },
  ],
})

export default router
