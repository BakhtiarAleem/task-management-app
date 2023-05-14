<template>
    <div>
        <div class="form-group">
            <label>Title</label>
            <b-form-textarea placeholder="Enter warm-up question title" />
        </div>
        <div class="form-group">
            <label>Details</label>
            <wysiwyg placeholder="Start typing warm-up question details" />
        </div>
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
