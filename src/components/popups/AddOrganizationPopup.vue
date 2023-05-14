<template>
    <div>
        <base-modal
            id="form"
            class="modal-area"
            ref="modal"
            title="Add Organization"
            size="md"
        >
            <div class="modal-content-area">
                <div class="form-group">
                    <label>Name</label>
                    <b-form-input
                        type="text"
                        placeholder="Enter company / organization name"
                    />
                </div>

                <div class="form-group">
                    <base-select-box
                        labelText="Diagnostics category"
                        :options="optionsSelect"
                    ></base-select-box>
                </div>

                <div class="form-group">
                    <label>Short bio</label>
                    <b-form-textarea
                        placeholder="Write short description about organization"
                    />
                </div>

                <base-upload-picture
                    uploadLabel="Organization logo"
                    uploadContent="Click here to upload team logo or icon"
                >
                </base-upload-picture>
            </div>
            <footer class="modal-footer">
                <base-button
                    text="Cancel"
                    @click="cancel"
                    styles="link"
                ></base-button>
                <base-button text="Submit" styles="primary"></base-button>
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
                {
                    value: 1,
                    text: 'Internet Services',
                },
                {
                    value: 2,
                    text: 'Marketing & Sales',
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

    watch: {},
}
</script>
