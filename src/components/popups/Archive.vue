<template>
    <base-modal
        id="archive"
        ref="modal"
        class="modal-area"
        title="Archive"
        size="md"
    >
        <div class="modal-content-area">
            <div class="row">
                <div class="col-md-12">
                    <p>{{ body }}</p>
                </div>
            </div>
        </div>
        <footer class="modal-footer">
            <base-button text="No" @click="cancel" styles="link"></base-button>
            <base-button text="Yes" styles="primary"></base-button>
        </footer>
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
            return this.selectedItem && this.selectedItem.name
                ? `Do you want to archive ${this.selectedItem.name}?`
                : 'Do you want to archive this?'
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
         * Handle when the ok is clicked
         *
         * @return {void}
         */
        ok() {
            this.$emit('confirmed')
        }, // End of ok() method

        /**
         * Handle when the modal is closed
         *
         * @return {void}
         */
        onHidden() {
            // this.$store.commit('clearItem')
        }, // End of onHidden() method

        /**
         * Handle when the modal is canceled
         *
         * @return {void}
         */
        cancel() {
            this.$refs.modal.hide()
        }, // End of cancel() method
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
