<template>
    <div>
        <base-modal
            id="account-settings"
            ref="modal"
            class="modal-area"
            title="Account Settings"
            size="md"
        >
            <div class="modal-content-area">
                <div class="form-group">
                    <label>Full Name</label>
                    <b-form-input type="text" placeholder="Enter full name" />
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
                    uploadContent="Click here to change profile picture"
                >
                </base-upload-picture>
                <hr />

                <div class="form-group">
                    <label>Change Password</label>
                    <b-form-input
                        type="password"
                        placeholder="Create new password"
                    />
                </div>

                <div class="form-group">
                    <label>Confirm Password</label>
                    <b-form-input
                        type="password"
                        placeholder="Re-enter new password"
                    />
                </div>
            </div>
            <footer class="modal-footer">
                <base-button
                    text="Cancel"
                    @click="cancel"
                    styles="link"
                ></base-button>
                <base-button text="Update" styles="primary"></base-button>
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
