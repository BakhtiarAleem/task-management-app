<template>
    <div class="session-main">
        <base-modal
            id="form"
            ref="modal"
            class="modal-area model-medium"
            title="Add Session"
            size="md"
        >
            <div class="modal-content-area">
                <div class="form-group">
                    <label>Type</label>
                    <br />
                    <b-form-radio-group
                        id="btnradios1"
                        buttons
                        v-model="selected"
                        :options="options"
                        name="radiosBtnDefault"
                    />
                </div>

                <div v-if="selected == 'tune-up'">
                    <dignosticTab></dignosticTab>
                </div>
                <div v-if="selected == 'weekly-check-in'">
                    <dignosticTab></dignosticTab>
                </div>
                <div v-if="selected == 'monthly-check-in'">
                    <dignosticTab></dignosticTab>
                </div>
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
import dignosticTab from '@/components/popups/session/Dignostic.vue'
export default {
    components: {
        dignosticTab,
    },
    data() {
        return {
            selected: 'tune-up',

            options: [
                { text: 'Team Tune Up ', value: 'tune-up' },
                { text: 'Weekly Check-in', value: 'weekly-check-in' },
                { text: 'Monthly Check-in', value: 'monthly-check-in' },
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
