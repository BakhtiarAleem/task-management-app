<script setup>
import AuthHeader from '/src/components/auth/AuthHeader.vue'
import BaseNeedHelp from '/src/components/BaseNeedHelp.vue'
</script>


<template>
    <div class="container">
        <AuthHeader></AuthHeader>
        <div
            class="middle-aligner login-middle-aligner"         
        >
            <div class="login-wrapper middle-aligner">
                <div class="login-card">
                    <router-view />
                    <BaseNeedHelp />
                </div>
            </div>
        </div>
        <!-- <contact-us-popup></contact-us-popup> -->
    </div>
</template>