<template>
    <base-modal
        id="block-admin"
        class="modal-area"
        title="Block Admin"
        ref="modal"
        size="md"
    >
        <div class="modal-content-area">
            <p>
                Are you sure you want to block this admin?
            </p>
        </div>
        <footer class="modal-footer">
            <base-button
                text="Cancel"
                @click="cancel"
                styles="link"
            ></base-button>
            <base-button text="Block now" styles="primary"></base-button>
        </footer>
    </base-modal>
</template>

<script>
export default {
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
    methods: {
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
        | Component > mounted
        |--------------------------------------------------------------------------
        */
    mounted() {}, // End of Component > mounted
} // End of export default
</script>
