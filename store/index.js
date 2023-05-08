import { createStore } from "vuex";
import { supabase } from '/api/supabaseClient'
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
            this.state.user = loggedIn.data.user
            this.state.token = loggedIn.data.session.access_token
            localStorage.setItem("token", loggedIn.data.session.access_token);
          } catch (error) {
            console.log(error)
          }
    }
  }
});