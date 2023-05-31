<template>
    <div class="row">
        <div
            class="col-xs-12 col-sm-6 col-md-4"
            v-for="(customer, index) in customers"
            :key="index"
        >
            <div class="card advisor-card">
                <div class="card-body">
                    <div class="customer-image">
                        <img
                            :src="'/src/assets/images/front/landing/' + customer.customerImage"
                        />
                    </div>
                    <h3 v-if="customer.advisorName">
                        {{ customer.advisorName }}
                    </h3>
                    <h5 v-if="customer.advisorDesignation">
                        {{ customer.advisorDesignation }}
                    </h5>
                    <div class="customer-logo" v-if="customer.customerLogo">
                        <img
                        :src="'/src/assets/images/front/logos/' + customer.customerLogo"
                        />
                    </div>
                    <div class="card-description">
                        <p
                            v-for="(descp, index) in customer.desc.split('\n')"
                            :key="index"
                        >
                            {{ descp }}
                        </p>
                    </div>
                    <h6 v-if="customer.name">{{ customer.name }}</h6>
                    <p v-if="customer.designation">
                        {{ customer.designation }}
                    </p>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
export default {
    components: {},
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

        customers: {
            type: Array,
            default: null,
        },
    }, // End of Component > props

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
    computed: {}, // End of Component > computed

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
    mounted() {},
    // End of Component > mounted
} // End of export default
</script>
