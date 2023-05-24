import { createRouter, createWebHistory } from 'vue-router'
import store from "/store";
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
      name: 'organizations',
      path: '/organizations',
      component: () => import('././views/organizations/index.vue'),     
      meta:{        
        auth: true,  
      },       
    },
    {
      name: 'organizations-detail',
      path: '/organizations/:id',
      component: () => import('././views/organizations/detail-page.vue'),
      auth: true,
      meta:{        
        detailPage: true,
      },      
    },

  ],
})
function checkAuth(to, from, next) 
{
    if(store.getters.token){
      next();
      alert(1)
    }
    else{
      alert(1)
      next("/");
    }
}