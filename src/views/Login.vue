<script setup>
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router';
import store from "/store";
import BaseLoader from '/src/components/BaseLoader.vue'
const email = ref('');
const password = ref("");
const isLoading = ref(false);

const router = useRouter();

async function handleSignin() {
  isLoading.value = true;
  store.dispatch('loginUser',{
    email: email.value,
    password: password.value,
  }).then((e) => {
  if(e === 'success'){
    router.push('/projects')
  }
  isLoading.value = false;
})
}

async function googleLogin() {
  isLoading.value = true;
  store.dispatch('signInWithGoogle').then((e) => {
  // if(e === 'success'){
  //   router.push('/projects')
  // }
  isLoading.value = false;
})
}


</script>

<template>
  <div>
    <h3 class="welcome-heading">Sign in to your account</h3>
    <div class="card">
      <div class="card-body auth-card-body">
        <!-- <div class="sign-in-google">
          <button type="button" @click="googleLogin" class="btn btn-google right-side-btn"><div class="google-logo"><img src="/google-logo.png" /></div><span>Connect with Google</span></button>
        </div> -->
        <form @submit.prevent="handleSignin">
          <div class="form-group">
            <label for="email">Email</label>
            <input class="form-control" id="email" type="email" required v-model="email" />
          </div>
          <div class="form-group">
            <label for="password">Password</label>
            <input class="form-control" id="password" type="password" required v-model="password" />
          </div>
          <div>
            <button class="btn btn-primary" :class="isLoading ? 'disabled' : ''" type="submit">
              Sign in           
                <BaseLoader/>
            </button>
            <button type="button" @click="()=> router.push('/register')" class="btn btn-link right-side-btn">Create an account</button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>
