<script setup>
import { ref, onMounted } from 'vue'
import addOrganizationPopup from '/src/components/popups/AddOrganizationPopup.vue'
import CardBlock from '/src/components/CardBlock.vue'
// import actionpopup from '/src/components/popups/ActionPopup.vue'
import store from "/store";


            const titleBarHeading = ref('Manage Organizations');
            const modalClick = ref(false);
            const cardMenuLinks = ref([
                {
                    menuText: 'fdas',
                },
            ]);
            const breadcrumbs = ref([
                {
                    text: 'Manage Organizations',
                    href: '#',
                },
            ]);            
            const optionsFilter = ref([
                {
                    text: 'Active',
                    value: 'active',
                },
                {
                    text: 'Archived',
                    value: 'archived',
                },
            ]);  
            const menuList = ref([
                {
                    menuIcons: 'icon-team',
                    menuText: 'Team members',
                },
                {
                    menuIcons: 'icon-session',
                    menuText: 'Sessions',
                },
                {
                    menuIcons: 'icon-Report',
                    menuText: 'Report',
                },
                {
                    menuIcons: 'icon-edit',
                    menuText: 'Modify',
                },
                {
                    menuIcons: 'icon-download',
                    menuText: 'Archive',
                },
            ]);

            const manageCards = ref();



async function orginization() {
    await store.dispatch('project').then((value) => {
        if(value){
            manageCards.value = null
            manageCards.value = value
        }
    })
}



onMounted(() => {
    orginization()
})



</script>



<template>
    <div class="col-md-12">
        <h3 class="main-heading">{{ titleBarHeading }}</h3>
        <div v-if="!manageCards" class="row">
            <!--new team card-->
            <CardBlock
                addCard
                cssClass="add-new-team-card"
                addItemText="New Organization"
                @click="modalClick = true"
            ></CardBlock>
            <!--new team card end-->
        </div>
        <div v-if="manageCards" class="row">
            <!--new team card-->
            <CardBlock
                addCard
                cssClass="add-new-team-card"
                addItemText="New Organization"
                @click="modalClick = true"
            ></CardBlock>
            <!--new team card end-->
            <!--Teams details card-->
            <CardBlock
                v-for="(manage, index) in manageCards"
                :key="index"
                :mainImage="manage.project_image"
                :mainHeading="manage.name"
                :subHeading="manage.type"
                :descprition="manage.description"
                :teammembers="manage.users"
                @card-click="redirect"
            >
                <div slot="menu">
                    <div>
                        <ul>
                            <li>
                                <router-link
                                    class=""
                                >
                                    <i class="icon-team"></i>
                                    <span>Team members</span>
                                </router-link>
                            </li>
                            <li>
                                <router-link
                                    class=""
                                >
                                    <i class="icon-session"></i>
                                    <span>Sessions</span>
                                </router-link>
                            </li>
                            <li>
                                <a href="#">
                                    <i class="icon-Report"></i>
                                    Reports
                                </a>
                            </li>
                            <li>
                                <a href="#">
                                    <i class="icon-edit"></i>
                                    Modify
                                </a>
                            </li>
                            <li>
                                <a href="#">
                                    <i class="icon-download"></i>
                                    Archive
                                </a>
                            </li>
                        </ul>
                    </div>
                </div>
            </CardBlock>
        </div>
        <addOrganizationPopup :popup="modalClick" @close="modalClick = false"></addOrganizationPopup>
        <!-- <actionpopup
            title="Archive"
            content="Are you sure you want to archive this organization?"
            btnText="Archive"
        ></actionpopup> -->
    </div>
</template>
