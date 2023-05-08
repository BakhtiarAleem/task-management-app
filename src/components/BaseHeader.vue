<template>
    <header class="header" :class="addClass">
        <div class="fixed-header" :class="$route.meta.organizationPage">
            <div class="container">
                <div class="row">
                    <div class="col-lg-2 col-md-3">
                        <base-logo></base-logo>
                    </div>
                    <div @click="addClassClick ^= true" class="menu-button">
                        <span></span>
                        <span></span>
                        <span></span>
                    </div>
                    <div
                        :class="[addClassClick ? 'header-block' : '']"
                        class="col-lg-10 col-md-9 menu-header"
                    >
                        <div v-if="!$route.meta.hideNav" class="navigation">
                            <ul>
                                <li
                                    v-for="(navigation, index) in navigations"
                                    :key="index"
                                    @click="addClassClick ^= true"
                                    :class="[
                                        $route.meta.sessionStep ==
                                        navigation.sessionStep
                                            ? 'router-link-exact-active'
                                            : '',
                                        $route.meta.sessionStep >=
                                        navigation.sessionStep
                                            ? 'router-link-active'
                                            : '',
                                    ]"
                                >
                                    <router-link :to="navigation.link">
                                        <i :class="navigation.icon"></i>
                                        <span>{{ navigation.name }}</span>
                                    </router-link>
                                </li>
                            </ul>
                        </div>
                        <div class="float-right account-setting-block">
                            <ul @click="settingBox ^= true" class="user-info">
                                <li
                                    v-if="!$route.meta.noHeader"
                                    v-on-clickaway="clickAway"
                                >
                                    <router-link class="" to="">
                                        <span
                                            class="user-avatar  rounded-circle mr-2"
                                        >
                                            <img
                                                src="@/assets/images/dummy/team-members/image3.png"
                                            />
                                        </span>
                                        <span class="user-detail">
                                            Shannon Arvizu
                                            <p>Super Admin</p>
                                        </span>
                                        <i class="icon-caret"></i>
                                    </router-link>
                                    <ul
                                        v-show="settingBox != false"
                                        class="top-dropdown"
                                    >
                                        <li>
                                            <a
                                                href="javascript:void(0)"
                                                v-b-modal.account-settings
                                            >
                                                <i class="icon-team-member"></i>
                                                Account Setting
                                            </a>
                                        </li>
                                        <li>
                                            <a href="/">
                                                <i class="icon-logout"></i>
                                                Sign out
                                            </a>
                                        </li>
                                    </ul>
                                </li>
                                <li v-if="$route.meta.noHeader">
                                    <router-link class="" to="">
                                        <span
                                            class="user-avatar login-avator rounded-circle mr-2"
                                        >
                                            <img
                                                src="@/assets/images/dummy/team-members/cygnis.png"
                                            />
                                        </span>
                                        <span class="user-detail align-middle">
                                            Cygnis Media
                                        </span>
                                    </router-link>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </header>
</template>

<script>
import { directive as onClickaway } from 'vue-clickaway'
export default {
    /*
        |--------------------------------------------------------------------------
        | Directives
        |--------------------------------------------------------------------------
        */
    directives: {
        onClickaway: onClickaway,
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
        navigations: {
            type: Array,
            default: null,
        },
        addClass: {
            type: String,
            default: null,
        },
    }, // End of Component > props

    /*
        |--------------------------------------------------------------------------
        | Component > data
        |--------------------------------------------------------------------------
        */
    data() {
        return {
            settingBox: false,
            addClassClick: false,
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
    methods: {
        clickAway() {
            this.settingBox = false
        },
    }, // End of Component > methods

    /*
        |--------------------------------------------------------------------------
        | Component > mounted
        |--------------------------------------------------------------------------
        */
    mounted() {}, // End of Component > mounted
} // End of export default
</script>
