
<script setup>
import { ref, onMounted } from 'vue'
import FrontHeader from '/src/components/front/FrontHeader.vue'
import ClientsLogo from '/src/components/front/ClientsLogo.vue'
import Advisor from '/src/components/front/Advisor.vue'
import FrontFooter from '/src/components/front/FrontFooter.vue'
import FrontPageLoader from '/src/components/front/FrontPageLoader.vue'
import TeamExperience from '/src/components/front/TeamExperience.vue'

const logos = ref([
                {
                    logoImage: '72andsunny.png',
                    logoLink: '/',
                },
                {
                    logoImage: 'lever.png',
                    logoLink: '/',
                },
                {
                    logoImage: 'ea.png',
                    logoLink: '/',
                },
                {
                    logoImage: 'zendrive.png',
                    logoLink: '/',
                },
                {
                    logoImage: 'studio-dental.png',
                    logoLink: '/',
                },
                {
                    logoImage: 'cygnis.png',
                    logoLink: '/',
                },
            ]);
const customer = ref([
                {
                    customerImage: 'zendrive-client.png',
                    customerLogo: 'zendrive-logo.png',
                    name: 'Mor Sidi,',
                    desc:
                        "In the first few weeks since we've delivered the Epic Teams trainings, we are already seeing a positive shift in people development.",
                    designation: 'Head of People Ops at Zendrive',
                },
                {
                    customerImage: 'alltrails-client.png',
                    customerLogo: 'alltrails.png',
                    name: 'Jade Van Doren,',
                    desc:
                        'Our Epic Teams experience produced immediately actionable changes that made our team happier and more productive the next day.',
                    designation: 'CEO at AllTrails',
                },
                {
                    customerImage: 'covo-client.png',
                    customerLogo: 'covo.png',
                    name: 'Rebecca Brian Pan,',
                    desc:
                        'Epic Teams has helped our organization immensely. We are a qualitatively different team now than we were six months ago.',
                    designation: 'CEO at Covo',
                },
            ]);
const categories = ref([
                {
                    cateImage: 'goals.png',
                    title: 'Identify & Define Goals',
                    desc:
                        'Step by step collaborative process allow teams to identify and define high-level goals.',
                },
                {
                    cateImage: 'diagnose.png',
                    title: 'Diagnose Problems',
                    desc:
                        'Take a quick diagnostic on the key behaviors that help teams to continuously deliver high value.',
                },
                {
                    cateImage: 'design.png',
                    title: 'Design & Implement Solution',
                    desc:
                        'Define action plan by identifying areas to improve and implement realistic solution for teams.',
                },
                {
                    cateImage: 'track.png',
                    title: 'Track Progress',
                    desc:
                        'Tune-up and assessment sessions help teams to check progress and revised action plan accordingly. ',
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
                    <img src="/src/assets/images/front/landing-header-bg.png" />
                </div>
            </div>
        </div>
        <!-- banner end-->
        <!-- clients logo -->
        <ClientsLogo
            mainHeading="Task Issues TRUSTED WITH SOME OF THE WORLD'S BEST COMPANIES"
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
                            <img
                                :src="`/src/assets/images/front/landing/${category.cateImage}`"
                            />
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
                <img src="/src/assets/images/front/landing/web-screens.png" />
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
