
<script setup>
const props = defineProps({
    clientLogos: Array,
    mainHeading: String
})

import loadingImage from '/image-loading-small.gif'
import errorImage from '/image-error.png'

</script>


<template>
    <div class="logo-section">
        <div class="front-container">
            <p>{{ mainHeading }}</p>
            <ul>
                <li v-for="(logo, index) in clientLogos" :key="index">
                    <router-link :to="logo.logoLink">
                        <img v-lazy="{ src: logo.logoImage, loading: loadingImage, error: errorImage }" />
                    </router-link>
                </li>
            </ul>
        </div>
    </div>
</template>