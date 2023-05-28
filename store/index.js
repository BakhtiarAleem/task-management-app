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
    projectSelected: null,
  },
  mutations: {
    loginUser(state, value) {
      state.user = value
    },    
    setToken(state, value) {
        state.token = value
      }, 
    setProjectSelected(state, value) {
      state.projectSelected = value
    },       
  },
  getters: {
    loginUser: (state) => {
      return state.user
    },
    token: (state) => {
      return state.token
    },
    projectSelected: (state) => {
      return state.projectSelected
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
        } catch (error) {
          toast.error(error)
        }
  },
    async verifyLogin({ commit }) {
      const token = await localStorage.getItem("token")      
      if(token != "null"){
        const tokenData = localStorage.getItem("token")
        const timeStamp = Math.round(new Date()/1000)
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
        let referencedRow = await supabase
         .from('team')
         .select('*')
         .eq('user_id', userId)

         const idPresets = referencedRow.data
         const referencedProjectId = idPresets.map((row) => row.project_id);

         let project = await supabase
         .from('project')
         .select('*, team ( user_id, designation, project_id )')
         .in('id', referencedProjectId);

        //  SELECT project.*, team.*, auth.users.*
        //  FROM project
        //  JOIN team ON team.project_id = project.id
        //  JOIN auth.users ON auth.users.id::uuid = team.user_id
        //  WHERE auth.users.id = '367d2f64-2b83-43fb-95d7-20ef15007baf';
        // let project = await supabase.rpc('get_project_details')    
        // console.log(project)

        return project.data
      }
    },
    async projectTypes ({ commit }, value) {   
      let projectTypes = await supabase
         .from('project_type')
         .select('*')
         return projectTypes.data      
    },


    async projectDetail ({ commit }, value) {   
      let projectDetail = await supabase
         .from('project')
         .select('*')
         .eq('id', value)
         return projectDetail.data      
    },

    
    async projectIssues ({ commit }, value) {   
      let projectTypes = await supabase
         .from('tasks')
         .select('*, status_task ( id, name, color_indicator )')
         .eq('project_id', value)
         return projectTypes.data   
    },


    async addOrginization ({ commit }, value) {   
      const userId = this.state?.user?.id || this.state?.user?.sub
      let projectimage  = await supabase.storage.from('project').upload(value.name, value.uploadImage);
      let dataImage = projectimage.data.path
      let orginiation = await supabase.from('project')
      .insert([
        { name: value.name, description: value.description, project_image: '' + dataImage + '', type: value.type, project_created: userId },
      ])
      let checkOrginization = await supabase.from('project').select("*").eq('name', value.name);
      let team = await supabase.from('team')
      .insert([
        { designation: 'Owner', project_id: checkOrginization.data[0].id , user_id: userId  },
      ])
      toast.success('Orgnization Added') 
      return orginiation.data
      
    },
    async logOut({ commit }) {
      await localStorage.setItem("token", null);
      toast.error('Sign Out')  
    }
  }
});