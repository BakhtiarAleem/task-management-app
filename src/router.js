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
  {
    name:'site-admin',
    path: '/site-admin',
    component: () => import(/* webpackChunkName: "Home" */ '././views/front/SiteAdmin.vue'),
    meta: {
      advertisementPage: true,
      title:'Site Admin | Task Issues',
    },  
  },
  {
    name:'set-password',
    path: '/setpassword',
    component: () => import(/* webpackChunkName: "Home" */ '././views/SetPassword.vue'),
    meta: {
      layout: 'auth',
      title:'Set Password | Task Issues',
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
    name: 'projects',
    path: '/projects/',
    component: () => import(/* webpackChunkName: "projects" */ '././views/projects/index.vue'),     
    meta: {
      requiresAuth: true,
      title:'Projects | Task Issues',
    },  
  },
  {
    name: 'projects-detail',
    path: '/projects/:id/',
    component: () => import(/* webpackChunkName: "ProjectsDetail" */'././views/projects/detailpage/index.vue'),
    redirect: {
      name: "projects-detail-issues"
  },     
    meta:{    
      requiresAuth: true,    
      detailPage: true,
      title:'Project Detail | Task Issues',
    }, 
    children: [
      // {
      //   name: 'projects-detail-sprint',
      //   path: '/projects/:id/sprint/',
      //   component: () => import(/* webpackChunkName: "ProjectsDetail" */'././views/projects/detailpage/sprint.vue'),
      //   meta:{    
      //     requiresAuth: true,    
      //     detailPage: true,
      //     title:'Sprint | Project Detail | Task Issues',
      //   }, 
      // },
      {
        name: 'projects-detail-issues',
        path: '/projects/:id/issues/',
        component: () => import(/* webpackChunkName: "ProjectsDetail" */'././views/projects/detailpage/issues/index.vue'),
        meta:{    
          requiresAuth: true,    
          detailPage: true,
          title:'Issues | Project Detail | Task Issues',
        }, 
      },
      {
        name: 'projects-detail-members',
        path: '/projects/:id/members/',
        component: () => import(/* webpackChunkName: "ProjectsDetail" */'././views/projects/detailpage/members.vue'),
        meta:{    
          requiresAuth: true,    
          detailPage: true,
          title:'Members | Project Detail | Task Issues',
        }, 
      },
      {
        name: 'projects-detail-issues-content',
        path: '/projects/:id/issues/:taskid',
        component: () => import(/* webpackChunkName: "ProjectsDetail" */'././views/projects/detailpage/issues/taskdetail.vue'),
        meta:{    
          requiresAuth: true,    
          detailPage: true,
          title:'TaskID | Issues | Project Detail | Task Issues',
        }, 
      },
      {
        name: 'projects-detail-settings',
        path: '/projects/:id/settings/',
        component: () => import(/* webpackChunkName: "ProjectsDetail" */'././views/projects/detailpage/settings.vue'),
        meta:{    
          requiresAuth: true,    
          detailPage: true,
          title:'Settings | Project Detail | Task Issues',
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
  store.commit('setLoading', true);
  document.title = to.meta.title;
  if(localStorage.getItem("token") && to.fullPath === '/login'){
    next({ name: 'projects' })
  }
  if(localStorage.getItem("token") && to.fullPath === '/login/'){
    next({ name: 'projects' })
  }
  if(to.meta.requiresAuth){
    if(!localStorage.getItem("token")){
      next({ name: 'login' })
    }   
  }
  next();
});


router.afterEach((to, from) => {
  store.commit('setLoading', false);
});

export default router