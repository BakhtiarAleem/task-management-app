<script setup>
import { ref } from 'vue'
import BaseHeader from '/src/components/BaseHeader.vue'

const navigationData = ref([
                {
                    icon: 'icon-buildings',
                    name: 'Organizations',
                    link: '/projects',
                },
                {
                    icon: 'icon-setting',
                    name: 'Settings',
                    link: '/settings',
                },
            ]);
</script>


<template>
    <div class="orginization-detail-page">
        <div class="container">
            <BaseHeader :navigations="navigationData"/>
        </div>
        <div>
            <router-view />
        </div>
    </div>
</template>