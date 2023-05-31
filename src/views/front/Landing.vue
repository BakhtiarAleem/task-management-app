<template>
    <div>
        <!-- banner -->
        <div class="landing-banner">
            <front-header></front-header>
            <div class="front-container">
                <div class="content">
                    <div class="middle-aligner">
                        <div class="inner">
                            <h2>
                                Team Performance <br />
                                Management Platform
                            </h2>
                            <h3>
                                Team IQ help teams to produce consistently high
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
        <clients-logo
            mainHeading="TEAM IQ TRUSTED WITH SOME OF THE WORLD'S BEST COMPANIES"
            :clientLogos="logos"
        ></clients-logo>
        <!-- clients logo end -->
        <!-- categories option -->
        <div class="front-section category-section">
            <div class="front-container">
                <h2>Your Hub for Team Development &amp; Growth</h2>
                <h3>
                    We help leaders and fast growing companies to apply what
                    they learn from Epic Teams trainings to measurably document
                    team improvements.
                </h3>
                <div class="row">
                    <div
                        class="col-xs-12 col-sm-6 col-md-6 col-lg-3  landing-our-services"
                        v-for="(category, index) in categories"
                        :key="index"
                    >
                        <div class="category-image">
                            <img
                                :src="'/src/assets/images/front/landing/' +
                                        category.cateImage"
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
                <h2>Streamline Epic Team Sessions with Integrated Tools</h2>
                <h3>
                    Team IQ measurably improve the team experience, as defined
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
                <h2>Our Customer Stories</h2>
                <h3>
                    Read how CEOs, HR Leaders and Managers use our services and
                    Epic Teams program to increase team engagement and achieve
                    their goals.
                </h3>
                <advisor :customers="customer"></advisor>
            </div>
        </div>
        <!--customer stories end -->
        <!-- team section-->
        <div
            class="front-section team-section front-grey-section wave-design text-left"
        >
            <team-experience></team-experience>
        </div>
        <!-- team section end -->
        <front-footer></front-footer>
    </div>
</template>

<script>
import frontHeader from '/src/components/front/FrontHeader.vue'
import clientsLogo from '/src/components/front/ClientsLogo.vue'
import advisor from '/src/components/front/Advisor.vue'
import frontFooter from '/src/components/front/FrontFooter.vue'
import fullPageLoader from '/src/components/front/FrontPageLoader.vue'
import teamExperience from '/src/components/front/TeamExperience.vue'
export default {
    components: {
        frontHeader,
        clientsLogo,
        advisor,
        frontFooter,
        fullPageLoader,
        teamExperience,
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
        return {
            logos: [
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
            ],

            customer: [
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
            ],

            categories: [
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
