import { createRouter, createWebHistory } from 'vue-router'
import store from "/store";

const routes = [
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
    name: 'organizations',
    path: '/organizations/',
    component: () => import('././views/organizations/index.vue'),     
    meta:{        
      auth: true,  
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
      auth: true,    
      detailPage: true,
    }, 
    children: [
      {
        name: 'organizations-detail-sprint',
        path: '/organizations/:id/sprint/',
        component: () => import('././views/organizations/detailpage/sprint.vue'),
        meta:{    
          auth: true,    
          detailPage: true,
        }, 
      },
      {
        name: 'organizations-detail-issues',
        path: '/organizations/:id/issues/',
        component: () => import('././views/organizations/detailpage/issues.vue'),
        meta:{    
          auth: true,    
          detailPage: true,
        }, 
      },
      {
        name: 'organizations-detail-settings',
        path: '/organizations/:id/settings/',
        component: () => import('././views/organizations/detailpage/settings.vue'),
        meta:{    
          auth: true,    
          detailPage: true,
        }, 
      },
    ],     
  },

];
export default createRouter({
  history: createWebHistory(),
  routes,
})