<script>
import BModal from 'bootstrap-vue/es/components/modal/modal'

export default {
    /*
    |--------------------------------------------------------------------------
    | Component > inject
    |--------------------------------------------------------------------------
    */
    inject: {
        // $validator: '$validator',
    }, // End of Component > inject

    /*
    |--------------------------------------------------------------------------
    | Component > extends
    |--------------------------------------------------------------------------
    */
    extends: BModal, // End of Component > extends

    /*
    |--------------------------------------------------------------------------
    | Component > props
    |--------------------------------------------------------------------------
    */
    props: {
        hideFooter: {
            type: Boolean,
            default: true,
        },
        noCloseOnBackdrop: {
            type: Boolean,
            default: true,
        },
        noCloseOnEsc: {
            type: Boolean,
            default: true,
        },
    }, // End of Component > props
}
</script>
