<template>
    <div>
        <base-modal
            id="form"
            class="modal-area"
            title="Add Team Member"
            ref="modal"
            size="md"
        >
            <div class="modal-content-area">
                <div class="form-group">
                    <label>Full Name</label>
                    <b-form-input
                        type="text"
                        placeholder="Enter team member name"
                    />
                </div>

                <div class="form-group">
                    <label>Email Address</label>
                    <b-form-input
                        type="email"
                        placeholder="Enter email address"
                    />
                </div>

                <div class="form-group">
                    <label>Designation</label>
                    <b-form-input
                        type="email"
                        placeholder="Enter designation / title"
                    />
                </div>

                <div class="form-group">
                    <label>Department</label>
                    <b-form-input
                        type="text"
                        placeholder="Enter department name"
                    />
                </div>

                <base-date-picker
                    labelText="How long this member have been with the team?"
                    inputPlaceholder="Enter service duration on this team (in months)"
                ></base-date-picker>

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
        return {
            optionsSelect: [
                {
                    value: null,
                    text: 'Select organization diagnostics category',
                },
            ],
        }
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
