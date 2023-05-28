<script setup>
import { ref } from 'vue'
const props = defineProps({
    cssClass: String,
    statusClass: String,
    mainImage: String,
    addItemText: String,
    mainHeading: String,
    subHeading: String,
    descprition: String,
    sessionTime: String,
    sessionType: String,
    teammembers: Array,
    menuLinks: Array,
    emailAddress: String,
    joinDate: String,
    addCard: Boolean,
    id: String,
})

import { useRouter } from 'vue-router';
const router = useRouter();


const teammembersarry = ref([]);
const showDetails = ref(false);
const limitationList = ref(5);
const showDescription = ref(false);


function imageUrl(url) {
    return ''+ import.meta.env.VITE_SUPABASE_URL + '/storage/v1/object/public/project/' + url
}



</script>



<template>
    <div
        class="col-lg-3 col-md-6 card-item"
        :class="[addCard ? 'add-item-card' : '']"
    >
        <div class="card card-listing" :class="cssClass ? cssClass : ''">
            <div class="card-body card-listing-body">
                <!-- Create new  item -->
                <div
                    v-if="addCard"
                    class="team-new"
                >
                    <i class="icon-plus"></i>
                    <h5>{{ addItemText }}</h5>
                </div>
                <!-- Create new  item End-->

                <!-- Create Item -->
                <div v-if="!addCard" class="card-data">
                    <!--show menu iocn-->
                    <div class="detail-menu" @click="showDetails = true">
                        <i class="icon-three-dots"></i>
                    </div>

                    <div class="anchor-link">
                        <router-link :to="{
    name: 'organizations-detail',
    params: {
      id: id
    }
  }">
                        </router-link>
                    </div>
                    <!--show menu  iocn end-->
                    <!-- stautus blts -->
                    <span
                        class="status-blts"
                        :class="statusClass ? statusClass : ''"
                    >
                    </span>
                    <!-- stautus blts end-->
                    <!--image-->
                    <div
                        class="card-logo"
                        v-if="mainImage != null"
                        @click="clickFunc"
                    >
                        <div class="image-section">
                            <img
                                :src="imageUrl(mainImage)"/>
                        </div>
                    </div>
                    <!--image end -->
                    <!--card details-->
                    <div class="card-details">
                        <!-- main heading -->
                        <div
                            class="card-title cursor-pointer"
                            @click="clickFunc"
                        >
                            <h4>{{ mainHeading }}</h4>
                        </div>
                        <!-- sub heading -->
                        <div
                            class="card-department cursor-pointer"
                            v-if="subHeading != null"
                            @click="clickFunc"
                        >
                            <h5>{{ subHeading }}</h5>
                        </div>
                        <!-- description -->
                        <div
                            class="card-description"
                            v-if="descprition != null"
                        >
                            <p>
                                {{
                                    descprition.substring(0, 70) +
                                        (descprition.length > 70 ? '...' : '')
                                }}

                                <span
                                    class="btn-link cursor-pointer"
                                    @click="showDescription = true"
                                    v-if="descprition.length > 70"
                                    >Read More
                                </span>
                            </p>
                        </div>

                        <!-- Show full description -->
                        <div
                            class="show-description middle-aligner flex-start card-hotlinks"
                            v-if="showDescription === true"
                        >
                            <div
                                class="detail-menu"
                                @click="showDescription = false"
                            >
                                <i class="icon-close"></i>
                            </div>

                            <p>{{ descprition }}</p>
                        </div>
                        <!-- Show full description -->

                        <!-- date -->
                        <div class="card-department" v-if="joinDate != null">
                            <h5>{{ joinDate }}</h5>
                        </div>
                        <!-- session -->
                        <div class="session-type" v-if="sessionType != null">
                            <ul>
                                <li>{{ sessionTime }}</li>
                                <li>{{ sessionType }}</li>
                            </ul>

                            <span
                                class="status-blts"
                                :class="statusClass ? statusClass : ''"
                            >
                            </span>
                        </div>
                        <!-- email address -->
                        <div
                            class="card-description"
                            v-if="emailAddress != null"
                        >
                            <p>{{ emailAddress }}</p>
                        </div>
                        <!-- team members -->
                        <div class="card-members" v-if="teammembers != null">
                            <!-- team members loop -->
                            <div
                                v-for="(teammember, index) in teammembers"
                                :key="index"
                                v-if="index < limitationList"
                                class="member-block"
                            >
                                <img
                                    :src="'/src//assets/images/dummy/team-members/'+ teammember.image"/>
                            </div>
                            <!-- team members loop end -->
                            <!-- if members more then 5 -->
                            <div
                                class="member-block show-more-members"
                                v-if="teammembers.length > 5"
                            >
                                +12
                            </div>
                            <!-- if members more then 5 end-->
                            <!-- if members less then  0 -->
                            <div
                                class="member-block show-more-members"
                                v-if="teammembers.length < 1"
                            >
                                <i class="icon-plus"></i>
                            </div>
                            <!-- if members less then  0 end-->
                        </div>
                        <!-- team members loop end-->
                    </div>
                    <!--card details end-->
                    <!-- card links -->
                    <div
                        class="card-hotlinks middle-aligner flex-start"
                        v-if="showDetails === true"
                    >
                        <div class="detail-menu" @click="showDetails = false">
                            <i class="icon-close"></i>
                        </div>
                        <div class="card-main-heading">
                            <h4>{{ mainHeading }}</h4>
                        </div>
                        <div class="clearfix"></div>
                        <div class="card-links">
                            <slot name="menu"></slot>
                        </div>
                    </div>
                    <!-- card links end-->
                </div>
                <!-- Create Items end-->
            </div>
        </div>
    </div>
</template>