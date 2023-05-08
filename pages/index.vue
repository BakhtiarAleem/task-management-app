<script setup>
definePageMeta({
  layout: "auth",
});
import { ref, onMounted } from 'vue'

import store from "/store";
const email = ref('');
const password = ref("");

async function handleSignin() {
  store.dispatch('loginUser',{
          email: email.value,
          password: password.value,
        })
    }
</script>

<template>
  <div>
    <h2>Sign in to your account</h2>
    <form @submit.prevent="handleSignin">
      <div>
        <label for="email">Email</label>
        <input id="email" type="email" v-model="email" />
      </div>
      <div>
        <label for="password">Password</label>
        <input id="password" type="password" v-model="password" />
      </div>
      <div>
        <button type="submit">Sign in</button>
      </div>
    </form>
  </div>
</template>

<style scoped>
.hello {
  font-family: Arial, Helvetica, sans-serif;
  font-size: 3rem;
  padding: 10rem;
}
</style >

