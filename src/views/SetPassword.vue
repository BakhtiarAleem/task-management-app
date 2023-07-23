<script setup>
import { ref, onMounted } from 'vue'
import { useRoute, useRouter } from "vue-router";
import store from "/store";
import BaseLoader from '/src/components/BaseLoader.vue'
import { useToast } from "vue-toast-notification";
import { supabase } from '/api/supabaseClient.js';

const password = ref("");
const confirmpassword = ref("");
const isLoading = ref(false);
const session = ref()

const toast = useToast();
const router = useRouter();
const route = useRoute();
const email = ref(route.params.email);


async function setPassword() {
  isLoading.value = true;
  if(password.value === confirmpassword.value){
    store.dispatch('createUserPassword',{
    userid: session.value.user.id,
    password: confirmpassword.value,
  }).then((e) => {
  router.push('/login')
  isLoading.value = false;
})
  }
  else{
    toast.error('Password & Confirm Password Not Match');
  }

}

onMounted(() => {
  supabase.auth.getSession().then(({ data }) => {
    session.value = data.session
  })

  supabase.auth.onAuthStateChange((_, _session) => {
    session.value = _session
  })
});

</script>

<template>
  <div>
    <h3 class="welcome-heading">Set Your Password</h3>
    <div class="card">
      <div class="card-body auth-card-body">
        <!-- {{ session.access_token }} -->
        <form v-if="session?.access_token" @submit.prevent="setPassword">
          <div class="form-group">
            <label for="password">Password</label>
            <input class="form-control" id="password" type="password" required v-model="password" />
          </div>
          <div class="form-group">
            <label for="confirmpassword">Confirm Password</label>
            <input class="form-control" id="password" type="password" required v-model="confirmpassword" />
          </div>
          <div>
            <button class="btn btn-primary" :class="isLoading ? 'disabled' : ''" type="submit">
              Create Password          
                <BaseLoader/>
            </button>        
          </div>
        </form>
        <div v-if="!session?.access_token " class="link-expired">
          <h4>Link Has Been Expired</h4>
        </div>
      </div>
    </div>
  </div>
</template>
