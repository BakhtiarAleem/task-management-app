<template>
    <base-modal
        id="more"
        ref="modal"
        class="modal-area"
        title="View More"
        size="md"
    >
        <div class="modal-content-area">
            <div class="row">
                <div class="col-md-12">
                    <p>{{ body }}</p>
                </div>
            </div>
        </div>
    </base-modal>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
    /*
    |--------------------------------------------------------------------------
    | Component > inject
    |--------------------------------------------------------------------------
    */
    inject: {}, // End of Component > inject

    /*
    |--------------------------------------------------------------------------
    | Component > props
    |--------------------------------------------------------------------------
    */
    props: {}, // End of Component > props

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
    | Component > components
    |--------------------------------------------------------------------------
    */
    components: {}, // End of Component > components

    /*
    |--------------------------------------------------------------------------
    | Component > computed
    |--------------------------------------------------------------------------
    */
    computed: {
        ...mapGetters(['loading', 'selectedItem']),

        /**
         * Evaluate the body of modal
         *
         * @return {void}
         */
        body() {
            return 'Fun, interactive get-to-known activity. Ask a group to organise themselves into smaller groups, based on categories such as favourite colourFun, interactive get-to-known activity. Ask a group to organise themselves into smaller groups, based on categories such as favourite colour.'
        }, // End of body() method
    }, // End of Component > computed

    /*
    |--------------------------------------------------------------------------
    | Component > watch
    |--------------------------------------------------------------------------
    */
    watch: {}, // End of Component > watch

    /*
    |--------------------------------------------------------------------------
    | Component > methods
    |--------------------------------------------------------------------------
    */
    methods: {
        /**
         * Handle when the modal is closed
         *
         * @return {void}
         */
        onHidden() {
            // this.$store.commit('clearItem')
        }, // End of onHidden() method
    }, // End of Component > methods

    /*
    |--------------------------------------------------------------------------
    | Component > created
    |--------------------------------------------------------------------------
    */
    created() {}, // End of Component > created

    /*
    |--------------------------------------------------------------------------
    | Component > mounted
    |--------------------------------------------------------------------------
    */
    mounted() {}, // End of Component > mounted
}
</script>
