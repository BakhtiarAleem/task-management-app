
<script setup>
import { ref, onMounted, defineAsyncComponent } from 'vue'

const FrontHeader = defineAsyncComponent(() =>
  import('/src/components/front/FrontHeader.vue')
)
const ClientsLogo = defineAsyncComponent(() =>
  import('/src/components/front/ClientsLogo.vue')
)

const FrontFooter = defineAsyncComponent(() =>
  import('/src/components/front/FrontFooter.vue')
)

const TeamExperience = defineAsyncComponent(() =>
  import('/src/components/front/TeamExperience.vue')
)

// import Advisor from '/src/components/front/Advisor.vue'
// import FrontPageLoader from '/src/components/front/FrontPageLoader.vue'

import Img1 from '/src/assets/images/front/logos/vuejs.svg'
import Img2 from '/src/assets/images/front/logos/supabase.svg'
import Img3 from '/src/assets/images/front/logos/github-mark.svg'
import Img4 from '/src/assets/images/front/landing/goals.png'
import Img5 from '/src/assets/images/front/landing/diagnose.png'
import Img6 from '/src/assets/images/front/landing/design.png'
import Img7 from '/src/assets/images/front/landing/track.png'


import frontImage from '/src/assets/images/front/landing-header-bg.png'
import loadingImage from '/image-loading-small.gif'
import errorImage from '/image-error.png'
import webscreen from '/src/assets/images/front/landing/web-screens.jpg'



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
const categories = ref([
                {
                    cateImage: Img4,
                    title: 'Identify & Define Goals',
                    desc:
                        'Step by step collaborative process allow teams to identify and define high-level goals.',
                },
                {
                    cateImage: Img5,
                    title: 'Diagnose Problems',
                    desc:
                        'Take a quick diagnostic on the key behaviors that help teams to continuously deliver high value.',
                },
                {
                    cateImage: Img6,
                    title: 'Implement Solution',
                    desc:
                        'Define action plan by identifying areas to improve and implement realistic solution for teams.',
                },
                {
                    cateImage: Img7,
                    title: 'Track Progress',
                    desc:
                        'Tune-up Track sessions help team and members to check progress and revised action plan accordingly. ',
                },
            ]);
</script>



<template>
    <div>
        <!-- banner -->
        <div class="landing-banner">
            <FrontHeader></FrontHeader>
            <div class="front-container">
                <div class="content">
                    <div class="middle-aligner">
                        <div class="inner">
                            <h2>
                                Task Performance <br />
                                Management Platform
                            </h2>
                            <h3>
                                Task Issues help teams to produce consistently high
                                value for stakeholders so that their
                                organizations gain a sustainable competitive
                                edge.
                            </h3>
                            <router-link to="/about" class="btn btn-primary"
                                >Learn more</router-link
                            >
                        </div>
                    </div>
                </div>
                <div class="landing-graphics">
                    <img
                    v-lazy="{ src: frontImage, loading: loadingImage, error: errorImage }" />
                </div>
            </div>
        </div>
        <!-- banner end-->
        <!-- clients logo -->
        <ClientsLogo
            mainHeading="TASK ISSUES TRUSTED WITH SOME OF THE WORLD'S BEST COMPANIES"
            :clientLogos="logos"
        ></ClientsLogo>
        <!-- clients logo end -->
        <!-- categories option -->
        <div class="front-section category-section">
            <div class="front-container">
                <h2>Your Hub for Team Development &amp; Growth</h2>
                <h3>
                    We help leaders and fast growing companies to complete tasks, commitment and projects with short amount of time.
                </h3>
                <div class="row">
                    <div
                        class="col-xs-12 col-sm-6 col-md-6 col-lg-3  landing-our-services"
                        v-for="(category, index) in categories"
                        :key="index"
                    >
                        <div class="category-image">
                            <img v-lazy="{ src: category.cateImage, loading: loadingImage, error: errorImage }" />
                        </div>
                        <h4>{{ category.title }}</h4>
                        <p>{{ category.desc }}</p>
                    </div>
                </div>
            </div>
        </div>
        <!-- categories option end-->
        <div
            class="front-section category-section front-grey-section wave-design pb-0"
        >
            <div class="front-container">
                <h2>Streamline Task Issues with Integrated Tools</h2>
                <h3>
                    Task Issues measurably improve the team experience, as defined
                    by the level of commitment, connection, and camaraderie as
                    team.
                </h3>
            </div>
            <div class="web-screenshots">
                <img v-lazy="{ src: webscreen, loading: loadingImage, error: errorImage }" />
            </div>
            <span class="simple-curve"></span>
        </div>
        <!--customer stories -->
        <div class="front-section category-section lg-padding">
            <div class="front-container">
                <h2>Our Advisor</h2>
                <h3>
                    Our Advisors are you people who we trust and want your feedback to make our product better an better.
                </h3>
                <!-- <Advisor :customers="customer"></Advisor> -->
            </div>
        </div>
        <!--customer stories end -->
        <!-- team section-->
        <div
            class="front-section team-section front-grey-section wave-design text-left"
        >
            <TeamExperience></TeamExperience>
        </div>
        <!-- team section end -->
        <FrontFooter></FrontFooter>
    </div>
</template>


<style scoped>
@media only screen and (max-width: 1160px) {
    html {
        font-size: 14px;
    }
}
@media only screen and (max-width: 768px) {
    html {
        font-size: 13px;
    }
}
@media only screen and (max-width: 736px) {
    html {
        font-size: 11px;
    }
}
</style>
