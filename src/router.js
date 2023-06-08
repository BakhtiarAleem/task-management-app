import { createRouter, createWebHistory } from 'vue-router'
import store from "/store";
import NotFound from '/src/NotFound.vue'
const routes = [
  {
    name:'landing-page',
    path: '/',
    component: () => import(/* webpackChunkName: "Home" */ '././views/front/Landing.vue'),
    meta: {
      advertisementPage: true,
      title:'Homepage | Task Issues',
    },  
  },
  {
    name:'about',
    path: '/about',
    component: () => import(/* webpackChunkName: "Home" */ '././views/front/About.vue'),
    meta: {
      advertisementPage: true,
      title:'About | Task Issues',
    },  
  },
  {
    name:'request-demo',
    path: '/request-demo',
    component: () => import(/* webpackChunkName: "Home" */ '././views/front/RequestDemo.vue'),
    meta: {
      advertisementPage: true,
      title:'Request a Demo | Task Issues',
    },  
  },
  { path: '/:pathMatch(.*)*', component: NotFound },
  {
    name:'login',
    path: '/login/',
    component: () => import(/* webpackChunkName: "LoginRegister" */ '././views/Login.vue'),
    meta: {
      title:'Login | Task Issues',
      layout: 'auth',
    },  
  },
  {
    name:'Register',
    path: '/register/',
    component: () => import(/* webpackChunkName: "LoginRegister" */ '././views/Register.vue'),
    meta: {
      title:'Register | Task Issues',
      layout: 'auth',
    },  
  },
  {
    name:'Confirm',
    path: '/confirm/',
    component: () => import(/* webpackChunkName: "LoginRegister" */ '././views/Confirm.vue'),
    meta: {
      requiresAuth: true,
      title:'Confirm User | Task Issues',
    },  
  },
  {
    name: 'organizations',
    path: '/organizations/',
    component: () => import(/* webpackChunkName: "Organizations" */ '././views/organizations/index.vue'),     
    meta: {
      requiresAuth: true,
      title:'Organizations | Task Issues',
    },  
  },
  {
    name: 'organizations-detail',
    path: '/organizations/:id/',
    component: () => import(/* webpackChunkName: "OrganizationsDetail" */'././views/organizations/detailpage/index.vue'),
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
        component: () => import(/* webpackChunkName: "OrganizationsDetail" */'././views/organizations/detailpage/sprint.vue'),
        meta:{    
          requiresAuth: true,    
          detailPage: true,
          title:'Sprint | Organizations Detail | Task Issues',
        }, 
      },
      {
        name: 'organizations-detail-issues',
        path: '/organizations/:id/issues/',
        component: () => import(/* webpackChunkName: "OrganizationsDetail" */'././views/organizations/detailpage/issues.vue'),
        meta:{    
          requiresAuth: true,    
          detailPage: true,
          title:'Issues | Organizations Detail | Task Issues',
        }, 
      },
      {
        name: 'organizations-detail-settings',
        path: '/organizations/:id/settings/',
        component: () => import(/* webpackChunkName: "OrganizationsDetail" */'././views/organizations/detailpage/settings.vue'),
        meta:{    
          requiresAuth: true,    
          detailPage: true,
          title:'Settings | Organizations Detail | Task Issues',
        }, 
      },
    ],     
  },
  {
    name: 'settings',
    path: '/settings/',
    component: () => import(/* webpackChunkName: "Settings" */ '././views/settings/index.vue'),     
    meta: {
      requiresAuth: true,
      title:'Settings | Task Issues',
    },  
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes
})

router.beforeEach((to, from, next) => {
  document.title = to.meta.title;
  if(localStorage.getItem("token") && to.fullPath === '/login'){
    next({ name: 'organizations' })
  }
  if(localStorage.getItem("token") && to.fullPath === '/login/'){
    next({ name: 'organizations' })
  }
  if(to.meta.requiresAuth){
    if(!localStorage.getItem("token")){
      next({ name: 'login' })
    }   
  }
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