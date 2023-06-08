import { createStore } from "vuex";
import { supabase } from '/api/supabaseClient'
import {useToast} from 'vue-toast-notification';
import 'vue-toast-notification/dist/theme-sugar.css';
import jwt_decode from "jwt-decode";

const toast = useToast();


export default createStore({
  state: {
    user: null,
    profile: null,
    token: localStorage.getItem("token") ? localStorage.getItem("token") : null,
    projectSelected: null,
    taskStatus: null,
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
    setTaskStatus(state, value) {
      state.taskStatus = value
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
    taskStatus: (state) => {
      return state.taskStatus
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
              const { data, error } = await supabase
              .from('profiles')
              .select('*')              
              .eq('id', this.state.user.id)
              localStorage.setItem("profile", JSON.stringify(data[0]));
              this.state.profile = JSON.parse(localStorage.getItem("profile"))
              console.log(this.state.profile)
              return 'success'
            }
          } catch (error) {
            toast.error(error)
          }
    },
    async register ({ commit }, value) {      
      try {
          const loggedIn = await supabase.auth.signUp(value);
          const { data, error } = await supabase
            .from('profiles')
            .update({ full_name: value.options.data.first_name + ' ' + value.options.data.last_name, username: value.options.data.first_name + '' + value.options.data.last_name })
            .eq('id', loggedIn.data.user.id)
          toast.success('Register User')      
        } catch (error) {
          toast.error(error)
        }
  },
  async requestDemo ({ commit }, value) {      
    try {
        const requestDemo = await supabase.from('request_demo')
        .insert([
          { fullname: value.fullname, phonenumber: value.phoneno, email: value.email, subject: value.subject, message: value.message  },
        ])
        if(requestDemo.status === 201){
          toast.success('We have noted your query and we will contact you soon')      
        }
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
          localStorage.removeItem("token");
          const { error } = await supabase.auth.signOut()
          localStorage.removeItem("profile")
          this.state.user = null
          this.state.token = null
          this.state.profile = null
          toast.error('Login Expired')          
        }        
        else{
          this.state.token = localStorage.getItem("token")
          this.state.user = decoded  
          this.state.profile = JSON.parse(localStorage.getItem("profile"))        
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

    async taskStatus ({ commit }) {   
      let taskStatus = await supabase
      .from('status_task').select('*')
      this.state.taskStatus = taskStatus.data 
    },

    async logOut({ commit }) {
      await localStorage.removeItem("token");
      await localStorage.removeItem("profile")
      await supabase.auth.signOut()
      this.state.user = null
      this.state.token = null
      this.state.profile = null
      toast.error('Sign Out')  
    }
  }
});