import { createRouter, createWebHistory } from 'vue-router'
import store from "/store";
const routes = [
  {
    name:'landing-page',
    path: '/',
    component: () => import('././views/front/Landing.vue'),
    meta: {
      advertisementPage: true,
      title:'Homepage | Task Issues',
    },  
  },
  {
    name:'about',
    path: '/about',
    component: () => import('././views/front/About.vue'),
    meta: {
      advertisementPage: true,
      title:'About | Task Issues',
    },  
  },
  {
    name:'request-demo',
    path: '/request-demo',
    component: () => import('././views/front/RequestDemo.vue'),
    meta: {
      advertisementPage: true,
      title:'Request a Demo | Task Issues',
    },  
  },
  {
    name:'login',
    path: '/login/',
    component: () => import('././views/Login.vue'),
    meta: {
      requiresAuth: true,
      title:'Login | Task Issues',
    },  
  },
  {
    name:'Register',
    path: '/register/',
    component: () => import('././views/Register.vue'),
    meta: {
      requiresAuth: true,
      title:'Register | Task Issues',
    },  
  },
  {
    name: 'organizations',
    path: '/organizations/',
    component: () => import('././views/organizations/index.vue'),     
    meta: {
      requiresAuth: true,
      title:'Organizations | Task Issues',
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
      title:'Organizations Detail | Task Issues',
    }, 
    children: [
      {
        name: 'organizations-detail-sprint',
        path: '/organizations/:id/sprint/',
        component: () => import('././views/organizations/detailpage/sprint.vue'),
        meta:{    
          requiresAuth: true,    
          detailPage: true,
          title:'Sprint | Organizations Detail | Task Issues',
        }, 
      },
      {
        name: 'organizations-detail-issues',
        path: '/organizations/:id/issues/',
        component: () => import('././views/organizations/detailpage/issues.vue'),
        meta:{    
          requiresAuth: true,    
          detailPage: true,
          title:'Issues | Organizations Detail | Task Issues',
        }, 
      },
      {
        name: 'organizations-detail-settings',
        path: '/organizations/:id/settings/',
        component: () => import('././views/organizations/detailpage/settings.vue'),
        meta:{    
          requiresAuth: true,    
          detailPage: true,
          title:'Settings | Organizations Detail | Task Issues',
        }, 
      },
    ],     
  },

];

const router = createRouter({
  history: createWebHistory(),
  routes
})

router.beforeEach((to, from, next) => {
  document.title = to.meta.title;
  next();
});

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