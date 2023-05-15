import { createRouter, createWebHistory } from 'vue-router'

export default createRouter({
  history: createWebHistory(),
  routes: [
    {
      name:'login',
      path: '/',
      component: () => import('././views/Login.vue'),
      meta:{
        auth: false,
      },
    },
    {
      name:'Register',
      path: '/register',
      component: () => import('././views/Register.vue'),
      meta:{
        auth: false,
      },
    },
    {
      name:'orginization',
      path: '/orginization',
      component: () => import('././views/orginization/index.vue'),
      meta:{
        auth: true,
      },
    },
  ],
})
