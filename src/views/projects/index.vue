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
            const projectType = ref(1);             
            
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
                    name: 'Active',
                    value: 1,
                },
                {
                    name: 'Archived',
                    value: 2,
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
            const profile = computed(() => store?.state?.profile);
            const authToken = computed(() => store.getters.token)

async function projects() {
    if(authToken.value != 'null'){
        isLoading.value = true
        await store.dispatch('project').then((value) => {
            if(value){
                manageCards.value = null
                manageCards.value = value
                Object.keys(manageCards.value).forEach(index => {
                    manageCards.value[index].team.forEach(team => {
                        if(team.designation === 'Owner'){
                            if(team?.user_id?.id === profile.value.id) {
                                manageCards.value[index] = {...manageCards.value[index], owner: true };
                            }
                        }
                    })
                })
                isLoading.value = false
            }
        })
    }
}

function archiveProjectFunction(projectid, projectName) {
    archiveProjectStoreId.value = projectid
    archiveProjectStoreName.value = projectName
    archiveProject.value = true
    projectType.value = 2
}

async function activeProjectFunction(projectid, projectName) {
    isLoading.value = true
    await store.dispatch('activeProject', projectid).then((e) => { 
        projects()
        isLoading.value = false
        projectType.value = 1
    })
}


onMounted(() => {
    projects()
})



</script>



<template>
    <div class="col-md-12">
        <div class="title-row">
            <h3 class="title-area">{{ titleBarHeading }}</h3>
            <div class="switchArea">
                <div class="btn-group-toggle btn-group">
                    <label v-for="(filter, index) in optionsFilter" :key="index" :class="filter.value === projectType ? 'btn-primary' : 'btn-outline-primary'" class="btn btn-lg">
                        <input type="radio" :value="filter.value" v-model="projectType" />
                        <span>{{ filter.name }}</span>
                    </label>
                </div>
            </div>
        </div>
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
                    v-show="manage.project_status === projectType"
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
                                <li v-if="manage.project_status === 1 && manage?.owner">
                                    <a class="cursor-pointer" @click="archiveProjectFunction(manage.id, manage.name)">
                                        <i class="icon-download"></i>
                                        Archive
                                    </a>
                                </li>
                                <li v-if="manage.project_status === 2">
                                    <a class="cursor-pointer" @click="activeProjectFunction(manage.id)">
                                        <i class="icon-download"></i>
                                        Active
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
