<template>
    <base-modal
        id="form"
        ref="modal"
        class="modal-area"
        title="Add Team"
        size="md"
        v-model="dialog"
    >
        <div class="modal-content-area">
            <b-form-group
                id="enterteam"
                :label="label"
                label-for="addTeamInput"
            >
                <b-form-input
                    id="addTeamInput"
                    type="name"
                    placeholder="Enter team / department name"
                    autofocus
                    ref="focus"
                />
            </b-form-group>

            <b-form-group
                id="addexprience"
                label="Years of experience of team manager"
                label-for="addexprienceInput"
            >
                <b-form-input
                    id="addexprienceInput"
                    type="name"
                    placeholder="Enter years of experience"
                    ref="focus"
                />
            </b-form-group>

            <b-form-group
                id="addteamfunction"
                label="Team function"
                label-for="addteamfunctionInput"
            >
                <b-form-input
                    id="addteamfunctionInput"
                    type="name"
                    placeholder="Enter team function"
                    ref="focus"
                />
            </b-form-group>

            <b-form-group
                id="addteamfunction"
                label="Geography of team"
                label-for="addteamfunctionInput"
            >
                <b-form-select
                    v-model="geographyselected"
                    :options="geographyoptions"
                ></b-form-select>
            </b-form-group>

            <b-form-group
                v-if="geographyselected !== 1"
                id="addvirtual"
                label="What % of virtual"
                label-for="virtualfunctionInput"
            >
                <div class="custom-prominent-field">
                    <b-form-input
                        id="virtualfunctionInput"
                        type="number"
                        placeholder="Enter Percentage"
                        ref="focus"
                    />
                    <div class="prominent-field">
                        <b>%</b>
                    </div>
                </div>
            </b-form-group>
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
        label: {
            type: String,
            default: null,
        },
    }, // End of Component > props

    /*
        |--------------------------------------------------------------------------
        | Component > data
        |--------------------------------------------------------------------------
        */
    data() {
        return {
            dialog: false,
            geographyselected: 1,
            geographyoptions: [
                { value: 1, text: 'Colocated' },
                { value: 2, text: 'Virtual' },
            ],
        }
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

    watch: {
        dialog(val) {
            if (!val) return
            requestAnimationFrame(() => {
                this.$refs.focus.focus()
            })
        },
    },
} // End of export default
</script>
