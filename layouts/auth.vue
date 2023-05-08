
<script setup>
const layout = "auth";
import AuthHeader from '/assets/components/auth/AuthHeader.vue'
</script>

<template>

<NuxtLayout>



    <div class="container">
        <AuthHeader></AuthHeader>
        <div
            class="middle-aligner login-middle-aligner"         
        >
            <div class="login-wrapper middle-aligner">
                <slot />
            </div>
        </div>
        <!-- <contact-us-popup></contact-us-popup> -->
    </div>
</NuxtLayout>
</template>