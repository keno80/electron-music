import Vue from 'vue'
import VueRouter from 'vue-router'
import Overlay from '@/Overlay/index'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    redirect: '/discover',
    component: Overlay,
    children: [
      {
        path: 'discover',
        name: 'discover',
        component: () => import('@/views/Discover/index'),
        meta: {title: '发现音乐'}
      },
      {
        path: 'personalFM',
        name: 'personalFM',
        component: () => import('@/views/PersonalFM/index'),
        meta: {title: '私人FM'}
      }
    ]
  },
]

const router = new VueRouter({
  mode: 'hash',
  base: process.env.BASE_URL,
  routes
})

export default router
