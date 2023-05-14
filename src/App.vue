<script setup>
import AuthLayout from './layouts/auth.vue'
import DefaultLayout from './layouts/default.vue'
import { ref, onMounted, computed } from 'vue'
import store from "/store";
import { useRouter, useRoute } from 'vue-router';

const router = useRouter();

const route = useRoute();

const authentication = computed(() => store?.state?.token)

function verifyLogin() {
  store.dispatch('verifyLogin')
    if(route.meta.auth == true && authentication == false){
          router.push('/')
          alert(1)
        }
    }

onMounted(() => {
  verifyLogin()
})

</script>

<template>
  <div>

    <AuthLayout v-if="!authentication">
    <router-view />
  </AuthLayout>
  <DefaultLayout v-if="authentication">
    <router-view />
  </DefaultLayout>
  </div>

</template>
