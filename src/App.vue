<script setup>
import AuthLayout from './layouts/auth.vue'
import DefaultLayout from './layouts/default.vue'
import DetailLayout from './layouts/detail.vue'
import BlockLoader from './components/BlockLoader.vue'
import { ref, watch, onMounted, computed, nextTick } from 'vue'
import store from "/store";
import { useRouter, useRoute } from 'vue-router';

const siteName = 'Task Issues'

const router = useRouter();
const isLoading = ref(false)


const authToken = computed(() => store.getters.token)


// const currentRoute = computed(() => router.currentRoute.value.path)
// const authdata = computed(() => router.currentRoute.value.meta.auth)
const detailPage = computed(() => router.currentRoute.value.meta.detailPage)
const advertisementPage = computed(() => router.currentRoute.value.meta.advertisementPage)



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




onMounted(async () => {

  verifyLogin();
  taskStatus();
})


</script>

<template>
  <div>
    <BlockLoader v-if="isLoading" />
    <div v-if="!isLoading">
      <div v-if="advertisementPage" class="front-site">
        <DefaultLayout hideNavigationHeader>
          <router-view />
      </DefaultLayout>
      </div>
      <div v-if="!advertisementPage">
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
</div>

</template>
