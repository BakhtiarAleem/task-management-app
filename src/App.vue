<script setup>
import AuthLayout from './layouts/auth.vue'
import DefaultLayout from './layouts/default.vue'
import BlockLoader from './components/BlockLoader.vue'
import { ref, watch, onMounted, computed, nextTick } from 'vue'
import store from "/store";
import { useRouter, useRoute } from 'vue-router';


const router = useRouter();

const route = useRoute();

const authToken = computed(() => store.getters.token)


const isLoading = ref(true)

const currentRoute = computed(() => router.currentRoute.value.path)
const authdata = computed(() => router.currentRoute.value.meta.auth)

async function verifyLogin() {
  if(authToken){
    await store.dispatch('verifyLogin')
  }
}


watch(authToken, (currentValue) => {
  return currentValue
    });




async function onPageLoad() {
  isLoading.value = true
  setTimeout(() => {
    if(authToken.value && authdata.value ){
    }
    else if(currentRoute.value === '/' || currentRoute.value === '/register'){
    }
    else{
      router.push('/')
    }
  }, 1000)
  isLoading.value = false
}



onMounted(async () => {

  verifyLogin();
  onPageLoad();
})


</script>

<template>
  <div>
    <BlockLoader v-if="isLoading" />
    <div v-if="!isLoading">
      <AuthLayout v-if="!authToken">
      <router-view />
    </AuthLayout>
    <DefaultLayout v-if="authToken">
      <router-view />
    </DefaultLayout>
  </div>
</div>

</template>
