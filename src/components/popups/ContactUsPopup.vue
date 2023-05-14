<template>
    <div>
        <base-modal
            id="contact"
            class="modal-area"
            title="Contact Us"
            size="md"
            ref="modal"
        >
            <div class="modal-content-area">
                <div class="form-group">
                    <label>Name</label>
                    <b-form-input type="text" placeholder="Enter your name" />
                </div>
                <div class="form-group">
                    <label>Email Address</label>
                    <b-form-input
                        type="email"
                        placeholder="Enter your email address"
                    />
                </div>
                <div class="form-group">
                    <label>Message</label>
                    <b-form-textarea placeholder="Start typing your message" />
                </div>
            </div>
            <footer class="modal-footer">
                <base-button
                    text="Cancel"
                    @click="cancel"
                    styles="link"
                ></base-button>
                <base-button text="Send" styles="primary"></base-button>
            </footer>
        </base-modal>
    </div>
</template>

<script>
export default {
    data() {
        return {}
    },
    methods: {
        /**
         * Handle when the modal is canceled
         *
         * @return {void}
         */
        cancel() {
            this.$refs.modal.hide()
        }, // End of cancel() method
    },
}
</script>
