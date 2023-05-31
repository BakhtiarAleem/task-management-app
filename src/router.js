import { createRouter, createWebHistory } from 'vue-router'
import store from "/store";
const routes = [
  {
    name:'landing-page',
    path: '/',
    component: () => import('././views/front/Landing.vue'),
    meta: {
      advertisementPage: true,
    },  
  },
  {
    name:'about',
    path: '/about',
    component: () => import('././views/front/About.vue'),
    meta: {
      advertisementPage: true,
    },  
  },
  {
    name:'request-demo',
    path: '/request-demo',
    component: () => import('././views/front/RequestDemo.vue'),
    meta: {
      advertisementPage: true,
    },  
  },
  {
    name:'login',
    path: '/login/',
    component: () => import('././views/Login.vue'),
  },
  {
    name:'Register',
    path: '/register/',
    component: () => import('././views/Register.vue'),
  },
  {
    name: 'organizations',
    path: '/organizations/',
    component: () => import('././views/organizations/index.vue'),     
    meta: {
      requiresAuth: true,
    },  
  },
  {
    name: 'organizations-detail',
    path: '/organizations/:id/',
    component: () => import('././views/organizations/detailpage/index.vue'),
    redirect: {
      name: "organizations-detail-sprint"
  },     
    meta:{    
      requiresAuth: true,    
      detailPage: true,
    }, 
    children: [
      {
        name: 'organizations-detail-sprint',
        path: '/organizations/:id/sprint/',
        component: () => import('././views/organizations/detailpage/sprint.vue'),
        meta:{    
          requiresAuth: true,    
          detailPage: true,
        }, 
      },
      {
        name: 'organizations-detail-issues',
        path: '/organizations/:id/issues/',
        component: () => import('././views/organizations/detailpage/issues.vue'),
        meta:{    
          requiresAuth: true,    
          detailPage: true,
        }, 
      },
      {
        name: 'organizations-detail-settings',
        path: '/organizations/:id/settings/',
        component: () => import('././views/organizations/detailpage/settings.vue'),
        meta:{    
          requiresAuth: true,    
          detailPage: true,
        }, 
      },
    ],     
  },

];
// export default createRouter({
//   history: createWebHistory(),
//   routes,
// })
const router = createRouter({
  history: createWebHistory(),
  routes
})


// router.afterEach((to, from, next) => {
//   // get current user info
//   const currentUser = localStorage.getItem('token');  
//   const requiresAuth = to.meta.requiresAuth
//   console.log(currentUser)
//   console.log(to.meta.requiresAuth)
//   if(requiresAuth && currentUser === 'null') {
//     router.push('/login/')
//   }
//   else {
//     next()
//   }
// })

export default router