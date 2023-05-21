<script setup>
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router';
import store from "/store";
const email = ref('');
const password = ref("");

const router = useRouter();

async function handleSignin() {
  store.dispatch('loginUser',{
    email: email.value,
    password: password.value,
  }).then((e) => {
  if(e === 'success'){
    router.push('/orginizations')
  }
})
}
</script>

<template>
  <div>
    <h3 class="welcome-heading">Sign in to your account</h3>
    <div class="card">
      <div class="card-body auth-card-body">
        <form @submit.prevent="handleSignin">
          <div class="form-group">
            <label for="email">Email</label>
            <input class="form-control" id="email" type="email" v-model="email" />
          </div>
          <div class="form-group">
            <label for="password">Password</label>
            <input class="form-control" id="password" type="password" v-model="password" />
          </div>
          <div>
            <button class="btn btn-primary" type="submit">Sign in</button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<style scoped>
.hello {
  font-family: Arial, Helvetica, sans-serif;
  font-size: 3rem;
  padding: 10rem;
}
</style >
