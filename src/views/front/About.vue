<template>
    <div class="about-section">
        <!-- banner -->
        <div class="inner-banner">
            <front-header></front-header>
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
                                        Team IQ is a powerful product of Epic
                                        Teams which will help companies to
                                        develop the kind of leaders that most
                                        CEOs can only dream about.
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
                                <img
                                    src="/src/assets/images/front/landing-people.png"
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <!-- About Epic Team -->
            <div class="about-epic-section">
                <div class="front-container">
                    <div class="row">
                        <div class="col-xs-12 col-sm-12 col-md-12 col-lg-8">
                            <h2>
                                About Epic Teams
                            </h2>
                            <h3>
                                Epic Teams takes a customized and
                                results-oriented approach to develop your
                                managers and produce extraordinary outcomes.
                            </h3>
                        </div>
                        <div class="col-xs-12 col-sm-12 col-md-12 col-lg-4">
                            <div class="middle-aligner">
                                <div class="inner">
                                    <div class="landing-graphics">
                                        <img
                                            src="/src/assets/images/front/epic-team.png"
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <!-- About Epic Team End-->
        </div>

        <!-- Founder start -->
        <div class="team-founder">
            <div class="front-container">
                <div class="row">
                    <div class="col-xs-12 col-sm-12 col-md-12 col-lg-6">
                        <div class="landing-graphics">
                            <img src="/src/assets/images/front/founder.png" />
                        </div>
                    </div>
                    <div class="col-xs-12 col-sm-12 col-md-12 col-lg-6">
                        <div class="middle-aligner">
                            <div class="inner">
                                <h2>
                                    Hi! I'm Dr. Shannon Arvizu and the founder
                                    of Epic Teams.
                                </h2>
                                <p>
                                    My passion for transforming managers into
                                    team leaders can be traced back to when I
                                    first gained my chops as a sociologist.
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
        <div class="front-section section-advisors front-grey-section">
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
        </div>
        <!-- advisor end -->
        <!-- clients logo -->
        <clients-logo
            mainHeading="TEAM IQ TRUSTED WITH SOME OF THE WORLD'S BEST COMPANIES"
            :clientLogos="logos"
        ></clients-logo>
        <!-- clients logo end -->
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
import advisor from '/src/components/front/Advisor.vue'
import clientsLogo from '/src/components/front/ClientsLogo.vue'
import frontFooter from '/src/components/front/FrontFooter.vue'
import teamExperience from '/src/components/front/TeamExperience.vue'
export default {
    components: {
        frontHeader,
        advisor,
        clientsLogo,
        frontFooter,
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
            customer: [
                {
                    customerImage: 'mike-bailen.png',
                    advisorName: 'Mike Bailen',
                    desc:
                        "Mike is the VP of People at Lever and a seasoned People Team Leader who understands the importance of a dual focus on recruiting and retention. While at Lever, Mike has spearheaded initiatives to empower leaders and teams for high performance, while placing the company's efforts towards diversity and inclusion at the heart of everything they do. \n Prior to Lever, Mike was the Director of Recruiting at Eventbrite and the former Head of Talent at Zappos.",
                    advisorDesignation: 'Lever',
                },
                {
                    customerImage: 'inessa.png',
                    advisorName: "Inessa O'Childs",
                    desc:
                        'Inessa is a serial entrepreneur currently working at the intersection of food and technology as the Co-Founder of the Future Food Center in San Francisco. She believes strongly in the power of high performance teams for creating wide-scale social impact. \n Inessa is also the CEO and founder of Global Privat, as well as a partner with Seraph Groupand Astia Angels. In this capacity, she provides capital and support to early-stage companies.',
                    advisorDesignation: 'Future Food Center',
                },
                {
                    customerImage: 'rob.png',
                    advisorName: 'Rob Hall',
                    desc:
                        "Rob is the VP of Product and Design at Zendrive. He relies on the performance of his teams every day to build things people want, with data and machine learning as core building blocks. \n At Zendrive, Rob's team works at the intersection of exponential networks ofconnected sensors, behavior change, and the future of transportation. \n Rob also teaches data science and coaches General Assembly's data science instructors.",
                    advisorDesignation: 'Zendrive',
                },
            ],
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
