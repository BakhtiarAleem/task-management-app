
<script setup>
import { ref } from 'vue'
import FrontHeader from '/src/components/front/FrontHeader.vue'
import FrontFooter from '/src/components/front/FrontFooter.vue'
import BaseLoader from '/src/components/BaseLoader.vue'
import store from "/store";
const requestDemo = ref({
    fullname: null,
    phoneno: null,
    email: null,
    subject: null,
    message: null,
});
const isLoading = ref(false);
async function requestDemoSubmit() {
  isLoading.value = true;
  store.dispatch('requestDemo',requestDemo.value).then((e) => {
  isLoading.value = false;
})
}
</script>


<template>
    <div>
        <!-- banner -->
        <div class="request-demo-banner inner-banner">
            <FrontHeader></FrontHeader>
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
                                    <form @submit.prevent="requestDemoSubmit">
                                        <div class="row">
                                            <div class="col-xs-12 col-sm-6">
                                                <div class="form-group">
                                                    <label>Full Name</label>
                                                    <input class="form-control" placeholder="Enter your full name" id="fullname" type="text" required v-model="requestDemo.fullname" />
                                                </div>
                                            </div>
                                            <div class="col-xs-12 col-sm-6">
                                                <div class="form-group">
                                                    <label>Phone Number</label>
                                                    <input class="form-control" placeholder="Enter your phone number" id="phoneno" type="number" required v-model="requestDemo.phoneno" />
                                                </div>
                                            </div>
                                            <div class="col-xs-12 col-sm-12">
                                                <div class="form-group">
                                                    <label>Email Address</label>
                                                    <input class="form-control" placeholder="Enter your email address" id="email" type="email" required v-model="requestDemo.email" />
                                                </div>
                                            </div>
                                            <div class="col-xs-12 col-sm-12">
                                                <div class="form-group">
                                                    <label>Subject</label>
                                                    <input class="form-control" placeholder="Enter reason to message" id="subject" type="text" required v-model="requestDemo.subject" />
                                                </div>
                                            </div>
                                            <div class="col-xs-12 col-sm-12">
                                                <div class="form-group">
                                                    <label>Message</label>
                                                    <textarea class="form-control" placeholder="Start typing your message" rows="6" required v-model="requestDemo.message"></textarea>
                                                </div>
                                            </div>
                                            <div class="col-xs-12 col-sm-12">
                                                <button class="btn btn-primary" :class="isLoading ? 'disabled' : ''" type="submit">
                                                    Sign in
                                                    <span>
                                                        <BaseLoader/>
                                                    </span>
                                                </button>
                                            </div>
                                        </div>
                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="col-xs-12 col-sm-12 col-md-12 col-lg-6">
                        <div class="requeest-graphics">
                            <img v-lazy="{ src: '/src/assets/images/front/request-demo.png', loading: '/image-loading-small.gif', error: '/image-error.png' }" />
                        </div>
                        <div class="contact-details">
                            <ul>
                                <li>
                                    <a href="tel:+923132406028">
                                        <span>
                                            +92 3132406028
                                        </span>
                                    </a>
                                </li>
                                <li>
                                    <span>
                                        <a href="mailto:bakhtiar.aleem93@gmail.com">bakhtiar.aleem93@gmail.com</a>
                                    </span>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <FrontFooter></FrontFooter>
    </div>
</template>
