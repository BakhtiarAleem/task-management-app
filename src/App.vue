<script setup>
import AuthLayout from './layouts/auth.vue'
import DefaultLayout from './layouts/default.vue'
import { ref, onMounted, computed } from 'vue'
import store from "/store";

const authentication = computed(() => store.state.token)

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
