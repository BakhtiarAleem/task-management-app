<script setup>
import { ref, computed, nextTick } from 'vue'
import BaseLogo from '/src/components/BaseLogo.vue'
import { useRouter } from 'vue-router';
import store from "/store";

const props = defineProps({
    navigations: Array,
    addClass: String
})

const settingBox = ref(false);
const addClassClick = ref(false);
const user = computed(() => store?.state?.user || false);
const router = useRouter();

function clickAway() {
    settingBox.value = false
}

async function logOut() {
    await store.dispatch('logOut').then((value) => {
        router.push('/')
        nextTick(() => {
            router.push('/')
        })
      
    })
}

</script>



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
                        <div class="navigation">
                            <ul>
                                <li
                                    v-for="(navigation, index) in navigations"
                                    :key="index"
                                    @click="addClassClick ^= true"
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
                                                src="/src/assets/images/dummy/team-members/image3.png"
                                            />
                                        </span>
                                        <span class="user-detail">                                         
                                            {{ user?.user_metadata?.first_name }} {{ user?.user_metadata?.last_name }}
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
                                            <a class="cursor-pointer" @click="logOut">
                                                <i class="icon-logout"></i>
                                                Sign out
                                            </a>
                                        </li>
                                    </ul>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </header>
</template>