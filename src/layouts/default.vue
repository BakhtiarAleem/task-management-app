
<script setup>
import { ref } from 'vue'
import BaseHeader from '/src/components/BaseHeader.vue'

const props = defineProps({
hideNavigationHeader: {
    type: Boolean,
  },
})


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
        <BaseHeader v-if="!hideNavigationHeader" :navigations="navigationData"/>
        <router-view />
    </div>
</template>