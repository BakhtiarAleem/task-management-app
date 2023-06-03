
<script setup>
import { ref, onMounted } from 'vue'


const props = defineProps({
    mode: {
    type: String,
    default: 'add',
  },
})

function onClick() {
    isActive.value = false;
    window.scrollTo(0, 0)
}

function toggleClass() {
    isActive.value = !isActive.value
}

const isActive = ref(false)
const listing = ref([
                {
                    menuLabel: 'Product',
                    menuLink: '/',
                },
                {
                    menuLabel: 'About',
                    menuLink: '/about',
                },
                {
                    menuLabel: 'Member Login',
                    menuLink: '/login',
                },
                {
                    menuLabel: 'Request a Demo',
                    menuLink: '/request-demo',
                    cssClass: 'btn btn-primary',
                },
            ])

</script>

<template>
    <div class="front-nav">
        <ul :class="[isActive ? 'LandingMenuShow' : 'LandingMenuHide']">
            <li v-for="(list, index) in listing" :key="index">
                <router-link
                    @click.native="onClick"
                    :class="list.cssClass"
                    :to="list.menuLink"
                >
                    {{ list.menuLabel }}
                </router-link>
            </li>
        </ul>
        <div class="menu-button" @click="isActive = !isActive">
            <span></span>
            <span></span>
            <span></span>
        </div>
        <span class="icon-close landing-menu-cancel"></span>
    </div>
</template>