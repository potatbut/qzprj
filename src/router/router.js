import Quiz from '@/pages/Quiz'
import Quizwa from '@/pages/Quizwa'
import Quizwend from '@/pages/Quizwend'
import { createRouter, createWebHashHistory } from 'vue-router'

const routes = [
  {
    path: '/',
    component: Quiz
  },
  
  {
    path: '/quizwa',
    component: Quizwa
  },
  
  {
    path: '/quizwend',
    component: Quizwend
  }
]

const router = createRouter({
  routes,
  history: createWebHashHistory(process.env.BASE_URL)
})

export default router