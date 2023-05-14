<template>
    <div class="question-main">
        <base-modal
            id="form"
            ref="modal"
            class="modal-area"
            title="Add Question"
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

                <div v-if="selected == 'warmup'">
                    <warmupTab></warmupTab>
                </div>
                <div v-if="selected == 'dignostic'">
                    <dignosticTab></dignosticTab>
                </div>
                <div v-if="selected == 'openended'">
                    <openendedTab></openendedTab>
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
import warmupTab from '@/components/popups/question/WarmUp.vue'
import dignosticTab from '@/components/popups/question/Dignostic.vue'
import openendedTab from '@/components/popups/question/OpenEnded.vue'
export default {
    components: {
        warmupTab,
        dignosticTab,
        openendedTab,
    },
    data() {
        return {
            selected: 'warmup',
            options: [
                { text: 'Warm-up', value: 'warmup' },
                { text: 'Diagnostic', value: 'dignostic' },
                { text: 'Open-ended', value: 'openended' },
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
