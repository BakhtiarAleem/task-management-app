<script setup>
import { ref, onMounted, computed } from 'vue'
import addProjectPopup from '/src/components/popups/AddProjectPopup.vue'
import ArchiveProject from '/src/components/popups/ArchiveProject.vue'
import CardBlock from '/src/components/CardBlock.vue'
// import actionpopup from '/src/components/popups/ActionPopup.vue'
import BlockLoader from '/src/components/BlockLoader.vue'
import store from "/store";


            const titleBarHeading = ref('Manage Projects');
            const modalClick = ref(false);
            const isLoading = ref(true);           
            const cardMenuLinks = ref([
                {
                    menuText: 'fdas',
                },
            ]);
            const breadcrumbs = ref([
                {
                    text: 'Manage Projects',
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
            const archiveProject = ref(false);
            const archiveProjectStoreId = ref();
            const archiveProjectStoreName = ref();
            const authToken = computed(() => store.getters.token)

async function projects() {
    if(authToken.value != 'null'){
        isLoading.value = true
        await store.dispatch('project').then((value) => {
            if(value){
                manageCards.value = null
                manageCards.value = value
                isLoading.value = false
            }
        })
    }
}

function archiveProjectFunction(projectid, projectName) {
    archiveProjectStoreId.value = projectid
    archiveProjectStoreName.value = projectName
    archiveProject.value = true
}

onMounted(() => {
    projects()
})



</script>



<template>
    <div class="col-md-12">
        <h3 class="main-heading">{{ titleBarHeading }}</h3>
        <BlockLoader class="loader-page" v-if="isLoading" />
        <div v-if="!isLoading" >
            <div v-if="!manageCards" class="row">
                <!--new team card-->
                <CardBlock
                    addCard
                    cssClass="add-new-team-card"
                    addItemText="New Project"
                    @click="modalClick = true"
                ></CardBlock>
                <!--new team card end-->
            </div>
            <div v-if="manageCards" class="row">
                <!--new team card-->
                <CardBlock
                    addCard
                    cssClass="add-new-team-card"
                    addItemText="New Project"
                    @click="modalClick = true"
                ></CardBlock>
                <!--new team card end-->
                <!--Teams details card-->
                <CardBlock
                    v-for="(manage, index) in manageCards"
                    :key="index"
                    :id="manage.id"
                    :mainImage="manage.project_image"
                    :mainHeading="manage.name"
                    :subHeading="manage.type"
                    :descprition="manage.description"
                    :teammembers="manage.team"
                    @card-click="redirect"
                >
                <template v-slot:menu>
                        <div>
                            <ul>
                                <li>
                                    <router-link
                                        :to="{
                                        name: 'projects-detail-members',
                                        params: {
                                            id: manage.id,
                                        },
                                        }"
                                    >
                                        <i class="icon-team"></i>
                                        <span>Team members</span>
                                    </router-link>
                                </li>
                                <!-- <li>
                                    <a href="#">
                                        <i class="icon-edit"></i>
                                        Modify
                                    </a>
                                </li> -->
                                <li>
                                    <a class="cursor-pointer" @click="archiveProjectFunction(manage.id, manage.name)">
                                        <i class="icon-download"></i>
                                        Archive
                                    </a>
                                </li>
                            </ul>
                        </div>
                    </template>
                </CardBlock>
            </div>
        </div>
        <addProjectPopup :popup="modalClick" @close="modalClick = false" @reload="projects"></addProjectPopup>
        <ArchiveProject  :popup="archiveProject" :projectid="archiveProjectStoreId" :projectname="archiveProjectStoreName" @close="archiveProject = false" @reload="projects"></ArchiveProject>
        <!-- <actionpopup
            title="Archive"
            content="Are you sure you want to archive this organization?"
            btnText="Archive"
        ></actionpopup> -->
    </div>
</template>
