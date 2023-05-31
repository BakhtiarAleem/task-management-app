<template>
    <div>
        <!-- banner -->
        <div class="request-demo-banner inner-banner">
            <front-header></front-header>
            <div class="front-container">
                <div class="row">
                    <div
                        class="col-xs-12 col-sm-12 col-md-12 col-lg-6 form-demo-section"
                    >
                        <h2>
                            Request a Demo
                        </h2>
                        <h3>
                            We offer a complimentary strategy session to
                            identify the key behaviors that will make the
                            biggest impact to your company's bottom line in the
                            year ahead.
                        </h3>

                        <div class="card">
                            <div class="card-body">
                                <h3>
                                    We'd love to hear from you. Send us a
                                    message and we'll get back to you shortly.
                                </h3>
                                <div class="form-section">
                                    <form action="" method="">
                                        <div class="row">
                                            <div class="col-xs-12 col-sm-6">
                                                <div class="form-group">
                                                    <label>Full Name</label>
                                                    <b-form-input
                                                        type="text"
                                                        placeholder="Enter your full name"
                                                    />
                                                </div>
                                            </div>
                                            <div class="col-xs-12 col-sm-6">
                                                <div class="form-group">
                                                    <label>Phone Number</label>
                                                    <b-form-input
                                                        type="number"
                                                        placeholder="Enter your phone number"
                                                    />
                                                </div>
                                            </div>
                                            <div class="col-xs-12 col-sm-12">
                                                <div class="form-group">
                                                    <label>Email Address</label>
                                                    <b-form-input
                                                        type="email"
                                                        placeholder="Enter your email address"
                                                    />
                                                </div>
                                            </div>
                                            <div class="col-xs-12 col-sm-12">
                                                <div class="form-group">
                                                    <label>Subject</label>
                                                    <b-form-input
                                                        type="text"
                                                        placeholder="Enter reason to message"
                                                    />
                                                </div>
                                            </div>
                                            <div class="col-xs-12 col-sm-12">
                                                <div class="form-group">
                                                    <label>Message</label>
                                                    <b-form-textarea
                                                        placeholder="Start typing your message"
                                                        rows="6"
                                                    />
                                                </div>
                                            </div>
                                            <div class="col-xs-12 col-sm-12">
                                                <base-button
                                                    text="Submit"
                                                    styles="primary"
                                                ></base-button>
                                            </div>
                                        </div>
                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="col-xs-12 col-sm-12 col-md-12 col-lg-6">
                        <div class="requeest-graphics">
                            <img src="/src/assets/images/front/request-demo.png" />
                        </div>
                        <div class="contact-details">
                            <ul>
                                <li>
                                    <span>
                                        +1 415-493-8471
                                    </span>
                                </li>
                                <li>
                                    <span>
                                        <a href="#">hello@epicteams.co</a>
                                    </span>
                                </li>
                                <li>
                                    <span>
                                        South Park, Serving Sillcon Valley's
                                        High Growth Companies, San Francisco, CA
                                        94301, US
                                    </span>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <front-footer></front-footer>
    </div>
</template>

<script>
import frontHeader from '/src/components/front/FrontHeader.vue'
import frontFooter from '/src/components/front/FrontFooter.vue'
export default {
    components: {
        frontHeader,
        frontFooter,
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
        mode: {
            type: String,
            default: 'add',
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
