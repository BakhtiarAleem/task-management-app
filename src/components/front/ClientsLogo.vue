<template>
    <div class="logo-section">
        <div class="front-container">
            <p>{{ mainHeading }}</p>
            <ul>
                <li v-for="(logo, index) in clientLogos" :key="index">
                    <router-link :to="logo.logoLink">
                        <img
                            :src="`/src/assets/images/front/logos/${logo.logoImage}`"
                        />
                    </router-link>
                </li>
            </ul>
        </div>
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

        mainHeading: {
            type: String,
            default: null,
        },
        clientLogos: {
            type: Array,
            default: null,
        },
    }, // End of Component > props

    /*
        |--------------------------------------------------------------------------
        | Component > data
        |--------------------------------------------------------------------------
        */
    data() {
        return {}
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
    methods: {}, // End of Component > methods

    /*
        |--------------------------------------------------------------------------
        | Component > mounted
        |--------------------------------------------------------------------------
        */
    mounted() {},
    // End of Component > mounted
} // End of export default
</script>
