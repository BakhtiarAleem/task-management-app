import { createStore } from "vuex";
import { supabase } from '/api/supabaseClient'
import {useToast} from 'vue-toast-notification';
import 'vue-toast-notification/dist/theme-sugar.css';
import jwt_decode from "jwt-decode";

const toast = useToast();


export default createStore({
  state: {
    user: null,
    token: null,
  },
  mutations: {
    loginUser(state, value) {
      state.user = value
    },    
    setToken(state, value) {
        state.token = value
      }, 
  },
  actions: {
    async loginUser ({ commit }, value) {      
        try {
            const loggedIn = await supabase.auth.signInWithPassword(value);
            if(loggedIn.error){              
              toast.error(loggedIn.error.message)
              return 'error'
            }       
            else{
              this.state.user = loggedIn.data.user
              this.state.token = loggedIn.data.session.access_token
              localStorage.setItem("token", loggedIn.data.session.access_token); 
              toast.success('Login Successfully')
              return 'success'
            }
          } catch (error) {
            toast.error(error)
          }
    },
    async register ({ commit }, value) {      
      try {
          const loggedIn = await supabase.auth.signUp(value);
          toast.success('Register User')
          console.log(loggedIn)         
        } catch (error) {
          toast.error(error)
        }
  },
    async verifyLogin({ commit }) {
      const token = await localStorage.getItem("token")
      if(token != null){
        const tokenData = localStorage.getItem("token")
        const timeStamp = Math.round(+new Date()/1000)
        var decoded = jwt_decode(tokenData);
        if(timeStamp >= decoded.exp){
          localStorage.setItem("token", null);
          toast.error('Login Expired')          
        }        
        else{
          this.state.token = localStorage.getItem("token")
          this.state.user = decoded          
        }        
      }   
      else{        
        return 'notVerify'
      }   
    },
    async project ({ commit }, value) {   
      if(localStorage.getItem("token") != null || localStorage.getItem("token") != []){
        const userId = this.state?.user?.id || this.state?.user?.sub
        let project = await supabase.from('project').select().contains('users', [''+ userId +'']);
        return project.data
      }
    },
    async logOut({ commit }) {
      await localStorage.setItem("token", null);
    }
  }
});