<template>
    <div>
        <base-modal
            id="form"
            ref="modal"
            class="modal-area"
            title="Add Admin"
            size="md"
        >
            <div class="modal-content-area">
                <div class="form-group">
                    <label>Full Name</label>
                    <b-form-input
                        type="text"
                        placeholder="Enter admin full name"
                    />
                </div>

                <div class="form-group">
                    <label>Email Address</label>
                    <b-form-input
                        type="email"
                        placeholder="Enter email address"
                    />
                </div>

                <base-upload-picture
                    uploadLabel="Profile Picture"
                    uploadContent="Click here to upload profile picture"
                >
                </base-upload-picture>
            </div>
            <footer class="modal-footer">
                <base-button
                    text="Cancel"
                    @click="cancel"
                    styles="link"
                ></base-button>
                <base-button text="Invite" styles="primary"></base-button>
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
