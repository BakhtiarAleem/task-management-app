<script setup>
import { ref, computed, nextTick, onMounted } from 'vue'
import BaseLogo from '/src/components/BaseLogo.vue'
import { useRouter } from 'vue-router';
import store from "/store";


function initialAvatar(value){
    return 'https://ui-avatars.com/api/background=a3216d&color=fff?name='+ value
}

const props = defineProps({
    navigations: Array,
    addClass: String
})

const settingBox = ref(false);
const addClassClick = ref(false);
const user = computed(() => store?.state?.user || false);
const username = computed(() => store?.state?.profile?.username || 'no username Set');
const role = computed(() => store?.state?.profile?.role || 'no role set');
const profileImage = computed(() => store?.state?.profile?.avatar_url ? store?.state?.profile?.avatar_url : initialAvatar(username.value));
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


async function getUserSetting() {
    await store.dispatch('getUserSetting').then((e) => {
        store.commit('loginUser', e[0])
        store.commit('setProfile', e[0])
    })
}

onMounted(() => {
    getUserSetting()
})

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
                                                :src="profileImage"
                                            />
                                        </span>
                                        <span class="user-detail">                                         
                                            {{ username }}
                                            <p>{{ role }}</p>
                                        </span>
                                        <i class="icon-caret"></i>
                                    </router-link>
                                    <ul
                                        v-show="settingBox != false"
                                        class="top-dropdown"
                                    >
                                        <li>
                                            <router-link :to="{name: 'settings'}">
                                                <i class="icon-team-member"></i>
                                                Account Setting
                                            </router-link>
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