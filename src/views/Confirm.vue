<script setup>
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router';
const router = useRouter();

</script>

<template>
    <div>
        <h4 class="welcome-heading">Your Email Address has been Confirmed</h4>
        <button @click="() => router.push('/login')" class="btn btn-primary" type="submit">Login to your account</button>
    </div>
</template>

