
<script setup>
import { ref } from 'vue'
import BaseHeader from '/src/components/BaseHeader.vue'

const navigationData = ref([
                {
                    icon: 'icon-buildings',
                    name: 'Organizations',
                    link: '/organizations',
                },
                {
                    icon: 'icon-setting',
                    name: 'Settings',
                    link: '/settings',
                },
            ]);
</script>

<template>
    <div class="container">
        <BaseHeader :navigations="navigationData"/>
        <router-view />
    </div>
</template>