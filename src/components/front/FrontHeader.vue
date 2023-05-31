<template>
    <div class="front-header" :class="{ sticky: scrollPosition > 10 }">
        <div class="front-container">
            <BaseLogo></BaseLogo>
            <frontNav></frontNav>
        </div>
    </div>
</template>
<script>
import BaseLogo from '/src/components/BaseLogo.vue'
import frontNav from '/src/components/front/FrontNav.vue'
export default {
    components: {
        frontNav,
        BaseLogo,
    },
    data() {
        return {
            scrollPosition: null,
        }
    }, // End of Component > data
    methods: {
        updateScroll() {
            this.scrollPosition = window.scrollY
        },
    },
    mounted() {
        window.addEventListener('scroll', this.updateScroll)
    },
}
</script>
