<script setup>
import { ref } from 'vue'
import frontHeader from '/src/components/front/FrontHeader.vue'
// import advisor from '/src/components/front/Advisor.vue'
import clientsLogo from '/src/components/front/ClientsLogo.vue'
import frontFooter from '/src/components/front/FrontFooter.vue'
import teamExperience from '/src/components/front/TeamExperience.vue'



import Img1 from '/src/assets/images/front/logos/vuejs.svg'
import Img2 from '/src/assets/images/front/logos/supabase.svg'
import Img3 from '/src/assets/images/front/logos/github-mark.svg'


const logos = ref([
                {
                    logoImage: Img1,
                    logoLink: '/',
                },
                {
                    logoImage: Img2,
                    logoLink: '/',
                },
                {
                    logoImage: Img3,
                    logoLink: '/',
                },
                
            ]);


import people from '/src/assets/images/front/landing-people.png'
import loadingImage from '/image-loading-small.gif'
import errorImage from '/image-error.png'
import marysoftwares from '/src/assets/images/front/marysoftwares.png'
import founder from '/src/assets/images/front/founder.png'



</script>



<template>
    <div class="about-section">
        <!-- banner -->
        <div class="inner-banner">
            <frontHeader></frontHeader>
            <div class="front-container request-demo">
                <div class="row">
                    <div class="col-xs-12 col-md-12">
                        <div class="banner-left-content">
                            <div class="middle-aligner">
                                <div class="inner">
                                    <h2>
                                        Powerful Product For Leading People And
                                        Teams
                                    </h2>
                                    <h3>
                                        Task Issues is a powerful product of Mary Softwares which will help Organization to
                                        Managed their tasks and projects.
                                    </h3>
                                    <router-link
                                        to="/request-demo"
                                        class="btn btn-primary"
                                        >Request a Demo</router-link
                                    >
                                </div>
                            </div>
                        </div>
                        <div class="banner-right-content">
                            <div class="landing-graphics">
                                <img v-lazy="{ src: people, loading: loadingImage, error: errorImage }" />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <!-- About Task Issues -->
            <div class="about-epic-section">
                <div class="front-container">
                    <div class="row">
                        <div class="col-xs-12 col-sm-12 col-md-12 col-lg-8">
                            <h2>
                                About Task Issues
                            </h2>
                            <h3>
                                Task Issues help you to complete your tasks with simple and easy steps. we don't want people's to get stuck in complexity. 
                            </h3>
                        </div>
                        <div class="col-xs-12 col-sm-12 col-md-12 col-lg-4">
                            <div class="middle-aligner">
                                <div class="inner">
                                    <div class="landing-graphics">
                                        <a target="_blank" href="https://marysoftwares.online/">
                                            <img v-lazy="{ src: marysoftwares, loading: loadingImage, error: errorImage }" />
                                        </a>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <!-- About Task Issues End-->
        </div>

        <!-- Founder start -->
        <div class="team-founder">
            <div class="front-container">
                <div class="row">
                    <div class="col-xs-12 col-sm-12 col-md-12 col-lg-6">
                        <div class="landing-graphics">
                            <img v-lazy="{ src: founder, loading: loadingImage, error: errorImage }" />
                        </div>
                    </div>
                    <div class="col-xs-12 col-sm-12 col-md-12 col-lg-6">
                        <div class="middle-aligner">
                            <div class="inner">
                                <h2>
                                    Hi! I'm Bakhtiar Aleem and the founder
                                    of <a target="_blank" href="https://marysoftwares.online/">Mary Softwares</a>.
                                </h2>
                                <p>
                                    My passion is to provide solutions with simple and easy steps.
                                </p>
                                <p>
                                    While researching entrepreneurs and movement
                                    leaders around the world, I uncovered that
                                    today’s managers are motivated by a new kind
                                    of leadership, collaborative leadership,
                                    which is the defining force of our century.
                                </p>
                                <p>
                                    To meet the challenges of the future, we
                                    need game-changing organizations led by
                                    managers who cultivate the collective
                                    intelligence of their people. To that end, I
                                    founded Epic Teams and serve as its CEO and
                                    lead developer.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <!-- Founder End -->

        <!-- advisor -->
       <!--  <div class="front-section section-advisors front-grey-section">
            <span class="simple-curve"></span>
            <div class="front-container">
                <h2>Our Advisors</h2>
                <h3>
                    We've assembled some of the world’s leading thinkers &
                    practitioners on teams and transformations. We’re tapping
                    into their wisdom so we can put it at your fingertips.
                </h3>
                <advisor :customers="customer"></advisor>
            </div>
        </div> -->
        <!-- advisor end -->
        <!-- clients logo -->
        <clientsLogo
            mainHeading="TASK ISSUES TRUSTED WITH SOME OF THE WORLD'S BEST COMPANIES"
            :clientLogos="logos"
        ></clientsLogo>
        <!-- clients logo end -->
        <!-- team section-->
        <div
            class="front-section team-section front-grey-section wave-design text-left"
        >
            <teamExperience></teamExperience>
        </div>
        <!-- team section end -->

        <frontFooter></frontFooter>
    </div>
</template>