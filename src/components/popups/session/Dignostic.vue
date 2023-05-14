<template>
    <div>
        <div class="form-group">
            <label>Title</label>
            <b-form-input type="text" placeholder="Enter session title" />
        </div>
        <div class="form-group">
            <label>Details</label>
            <b-form-input
                type="text"
                placeholder="Start typing short description"
            />
        </div>
        <div class="form-group">
            <label>Agenda</label>
            <wysiwyg placeholder="(-) Start typing agenda items" />
        </div>
        <div class="row">
            <div class="col-md-6">
                <base-date-picker></base-date-picker>
            </div>
            <div class="col-md-6">
                <base-time-picker></base-time-picker>
            </div>
        </div>
        <base-checkbox
            labelText="On submit, invite team members"
        ></base-checkbox>
    </div>
</template>
<script>
import { mapGetters } from 'vuex'
export default {
    components: {},
    /*
    |--------------------------------------------------------------------------
    | Component > props
    |--------------------------------------------------------------------------
    */
    props: {}, // End of Component > props

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
    computed: {
        ...mapGetters(['type']),
    }, // End of Component > computed

    /*
    |--------------------------------------------------------------------------
    | Component > methods
    |--------------------------------------------------------------------------
    */
    methods: {}, // End of Component > methods

    /*
    |--------------------------------------------------------------------------
    | Component > mounted
    |--------------------------------------------------------------------------
    */
    mounted() {}, // End of Component > mounted
} // End of export default
</script>
