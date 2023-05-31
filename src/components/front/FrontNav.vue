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
<script>
export default {
    components: {},
    /*
        |--------------------------------------------------------------------------
        | Component > props
        |--------------------------------------------------------------------------
        */
    props: {
        /**
         * Value to determine the current compose mode which
         * varies between 'add' and 'edit'
         */
        mode: {
            type: String,
            default: 'add',
        },
    }, // End of Component > props

    /*
        |--------------------------------------------------------------------------
        | Component > data
        |--------------------------------------------------------------------------
        */
    data() {
        return {
            isActive: false,
            listing: [
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
            ],
        }
    }, // End of Component > data

    /*
        |--------------------------------------------------------------------------
        | Component > computed
        |--------------------------------------------------------------------------
        */
    computed: {}, // End of Component > computed

    /*
        |--------------------------------------------------------------------------
        | Component > methods
        |--------------------------------------------------------------------------
        */
    methods: {
        onClick() {
            window.scrollTo(0, 0)
        },
        toggleClass: function(event) {
            this.isActive != true
        },
    }, // End of Component > methods

    /*
        |--------------------------------------------------------------------------
        | Component > mounted
        |--------------------------------------------------------------------------
        */
    mounted() {},
    // End of Component > mounted
} // End of export default
</script>
