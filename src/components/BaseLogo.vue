<script setup>
import { useRoute } from 'vue-router';
const route = useRoute();
const props = defineProps({
anchorClass: {
    type: String, // User[]?
  },
  anchorLink: {
    type: String, // User[]?
  },
})
</script>


<template>
    <div :class="route.meta.advertisementPage ? 'task-issue-logo' : ''" class="logo">
        <router-link :class="anchorClass" :to="route.meta.advertisementPage ? {name: 'landing-page'} : {name: 'login'}">
            <img src="/src/assets/images/logo.svg" />
        </router-link>
    </div>
</template>
