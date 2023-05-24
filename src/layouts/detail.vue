<script setup>
import AuthHeader from '/src/components/auth/AuthHeader.vue'
</script>


<template>
    <div class="orginization-detail-page">
        <div class="container">
            <AuthHeader></AuthHeader>
        </div>
        <div>
            <div
                class="middle-aligner login-middle-aligner"         
            >
                <div class="login-wrapper middle-aligner">
                    <div class="orginization-detail-page--content">
                        <router-view />
                    </div>
                </div>
            </div>
            <!-- <contact-us-popup></contact-us-popup> -->
        </div>
</div>
</template>