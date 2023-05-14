<template>
    <base-modal
        id="form"
        ref="modal"
        class="modal-area members-modal-list"
        title="Select Nudger"
        size="md"
        v-model="dialog"
    >
        <div class="modal-content-area scrollable" id="style-2">
            <session-member-list
                :teamMembers="manageTeamMembersCheckBox"
            ></session-member-list>
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
import SessionMemberList from '@/components/sessions/SessionMemberList.vue'
export default {
    components: {
        SessionMemberList,
    },
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
            addClass: false,
            isActive: false,
            manageTeamMembersCheckBox: [
                {
                    image: 'image1.png',
                    teamName: 'Fakhri Shokoohi',
                    checkBox: true,
                    active: true,
                },
                {
                    image: 'image2.png',
                    teamName: 'Diana Campos',
                    checkBox: true,
                },
                {
                    image: 'image3.png',
                    teamName: 'Elise Beverley',
                    checkBox: true,
                    active: true,
                },
                {
                    image: 'image1.png',
                    teamName: 'Ivan Magalhaes',
                    checkBox: true,
                    active: true,
                },
                {
                    image: 'image2.png',
                    teamName: 'Jacqueline Asong',
                    checkBox: true,
                },
                {
                    image: 'image1.png',
                    teamName: 'Joana Leite',
                    checkBox: true,
                },
                {
                    image: 'image2.png',
                    teamName: 'Daya Chitanis',
                    checkBox: true,
                    active: true,
                },
                {
                    image: 'image1.png',
                    teamName: 'Fakhri Shokoohi',
                    checkBox: true,
                },
                {
                    image: 'image2.png',
                    teamName: 'Diana Campos',
                    checkBox: true,
                    active: true,
                },
                {
                    image: 'image3.png',
                    teamName: 'Elise Beverley',
                    checkBox: true,
                },
                {
                    image: 'image1.png',
                    teamName: 'Ivan Magalhaes',
                    checkBox: true,
                },
                {
                    image: 'image2.png',
                    teamName: 'Jacqueline Asong',
                    checkBox: true,
                    active: true,
                },
                {
                    image: 'image1.png',
                    teamName: 'Joana Leite',
                    checkBox: true,
                },
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
