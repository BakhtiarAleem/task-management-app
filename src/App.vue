<script setup>
import AuthLayout from './layouts/auth.vue'
import DefaultLayout from './layouts/default.vue'
import DetailLayout from './layouts/detail.vue'
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
const detailPage = computed(() => router.currentRoute.value.meta.detailPage)


async function verifyLogin() {
  if(authToken){
    await store.dispatch('verifyLogin')
  }
}

async function taskStatus() {
  if(authToken){
    await store.dispatch('taskStatus')
  }
}


watch(authToken, (currentValue) => {
  return currentValue
    });




async function onPageLoad() {
  isLoading.value = true
  // setTimeout(() => {
  //   if(authToken.value && authdata.value ){
  //   }
  //   else if(currentRoute.value === '/' || currentRoute.value === '/register'){
  //   }
  //   else{
  //     router.push('/')
  //   }
  // }, 1000)
  isLoading.value = false
}



onMounted(async () => {

  verifyLogin();
  onPageLoad();
  taskStatus();
})


</script>

<template>
  <div>
    <BlockLoader v-if="isLoading" />
    <div v-if="!isLoading">
      <AuthLayout v-if="!authToken && !detailPage">
      <router-view />
    </AuthLayout>
    <DefaultLayout v-if="authToken && !detailPage">
      <router-view />
    </DefaultLayout>
    <DetailLayout v-if="authToken && detailPage">
      <router-view />
    </DetailLayout>
  </div>
</div>

</template>
