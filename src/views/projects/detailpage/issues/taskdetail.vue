<script setup>
import { ref, onMounted, computed, nextTick  } from 'vue';
import { useRoute } from 'vue-router';
import BlockLoader from '/src/components/BlockLoader.vue'
import VueEasyLightbox from 'vue-easy-lightbox'
import store from "/store";
import Datepicker from 'vue3-datepicker'
import VueDatePicker from '@vuepic/vue-datepicker';
import '@vuepic/vue-datepicker/dist/main.css'
import dayjs from 'dayjs';

const taskDetailId = ref({});
const route = useRoute();
const toggleRightBar = ref(false); 
const issueDetail = ref();
const statusModalOpen = ref(false);
const authToken = computed(() => store.getters.token)
const visible = ref(false);
const reportedBy = ref();
const dateCheckStatus = ref(false);
const commentMessage = ref();
const profile = computed(() => store?.state?.profile || 'Anyonomous');
const isLoading = ref(true);    
function initialAvatar(value){
    return 'https://ui-avatars.com/api/background=a3216d&color=fff?name='+ value
}
function dateTime(value){
   
    let dateValue = dayjs(value).format('DD/MM/YYYY')
    return dateValue
}
async function reportedByFunction(reportData) {
    await store.dispatch('getProfileDetail', reportData).then((val) => {
        reportedBy.value = val[0]
    })
} 
const projectid = ref(route.params.id);
const taskStatus = computed(() => store.getters.taskStatus)
const taskid = ref(route.params.taskid);
const project = computed(() => store.state.projectDetail)
const currentProfile = computed(() => store?.state?.profile || 'Anyonomous');
const taskEndDate = ref();
async function issues() {
    taskDetailId.value = {
        projectid: projectid.value,
        taskid: taskid.value,
    }
    isLoading.value = true
    await store.dispatch('taskDetail', taskDetailId.value).then((val) => {
        issueDetail.value = val[0]
        taskEndDate.value = val[0]?.task_complete_data
        reportedByFunction(issueDetail.value.reporter)
    })
    isLoading.value = false
}

async function commenting() {
    const commentData = {
        comment: commentMessage.value,
        taskid: taskid.value,
    }
    await store.dispatch('addComment', commentData).then((e) => {        
        commentMessage.value = null
        issues()
    })
}

async function changeStatus(value){
    let datatask = {
        statusid: value,
        taskid: taskid.value,
    }
    statusModalOpen.value = false
    await store.dispatch('changeTaskStatus', datatask).then((val) => {
        issues()
    })
}

async function taskStatusFunction() {
  if(authToken){
    await store.dispatch('taskStatus')
  }
}
async function taskEndDateChange() {
    nextTick(() => {
        let dataTask = {
            taskid: taskid.value,
            endDate: taskEndDate.value
        }
         store.dispatch('changeTaskEndDate', dataTask).then((val) => {
            reportedBy.value = val[0]
            dateCheckStatus.value = false
            issues();
        })
    })
} 

onMounted(() => {
    issues()
    taskStatusFunction()
});

</script>



<template>
    <div>
     <BlockLoader class="loader-page-block" v-if="isLoading" />
    <div v-if="!isLoading">
        <div class="task-top-banner">
            <div class="left-sidearea">
                <div class="task-link">
                    <router-link :to="{
                            name: 'projects',
                        }">
                        Projects
                    </router-link>
                    <div class="seperator">/</div>
                    <router-link :to="{
                            name: 'projects-detail',
                            params: {
                            id: projectid
                            }
                        }">
                        <div class="project-image" :style="{'background-image': 'url('+ project.project_image +')'}">                                 
                                </div>
                        <div class="project-name">
                            {{ project.name }}
                        </div>                        
                    </router-link>
                    <div class="seperator">/</div>
                    <router-link :to="{
                            name: 'projects-detail-issues-content',
                            params: {
                            id: projectid,
                            taskid: taskid
                            }
                        }">
                        {{ taskid }}
                        </router-link>
                </div>
            </div>
            <div class="right-sidearea">
                
            </div>
        </div>
        <div class="task-left-sidearea">
            <div class="project-detail-page-title full">            
                <h3>{{ issueDetail.task_name }}</h3>
            </div>    
            <div class="task-detail">
                <label class="task-detail-label">Description:</label>
                <div class="task-description" v-html="issueDetail.task_description"></div>            
            </div>
            <div class="task-image-container">
                <label class="task-detail-label">Attachments:</label>
                <div class="task-image-list">
                    <div v-if="issueDetail.task_image" @click="visible = !visible" class="task-image" :style="{'background-image': 'url('+ issueDetail.task_image +')'}">
                    </div>
                </div>
                        <vue-easy-lightbox
                            escDisabled
                            moveDisabled
                            :visible="visible"
                            :imgs="issueDetail.task_image"
                            :index="index"
                            @hide="visible = false"
                        ></vue-easy-lightbox>
                </div>    
            <div class="task-comment">
                <label class="task-detail-label">Comments:</label>
                <div class="task-comment-on send-comment">
                    <div v-tooltip="currentProfile?.full_name" class="commenter-id">
                        <div class="profile-image">
                            <img :src="currentProfile?.avatar_url != null ? currentProfile?.avatar_url : initialAvatar(currentProfile?.full_name)" />
                        </div>
                    </div>
                    <div class="commenter-message">
                        <div class="form-group">
                            <textarea type="text" @keyup.enter="commenting" placeholder="Add a comment..." v-model="commentMessage" class="form-control"></textarea>
                        </div>
                    </div>
                </div>
                <div v-if="issueDetail.task_comments.length != 0">
                    <div class="task-comments-data">
                        <div v-for="(comments, index) in issueDetail.task_comments" :key="index" class="task-comment-on">
                            <div v-tooltip="profile?.full_name" class="commenter-id">
                                <div class="profile-image">
                                    <img :src="comments.commentBy.avatar_url != null ? comments.commentBy.avatar_url : initialAvatar(comments.commentBy.full_name)" />
                                </div>
                            </div>
                            <div class="commenter-message">
                                <p>{{ comments.comment }}</p>
                            </div>
                            <div class="commenter-date-time">
                                {{ dateTime(comments.created_at) }}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div @click="toggleRightBar = !toggleRightBar" class="task-right-sec-mobile">
            <i class="icon-circle-left" />
        </div>
        <div :class="toggleRightBar ? 'active' : ''" class="task-right-sidearea">
            <div class="task-assign">
                <div class="task-status-selected" @click="statusModalOpen = !statusModalOpen" :style="{'background-color': ''+ issueDetail?.status_task?.color_indicator +''}">
                    {{ issueDetail?.status_task?.name }}
                    <div class="icon-caret"></div>
                </div>
                <div v-if="statusModalOpen" class="task-status-options">
                    <ul>
                        <li v-for="(task, index) in taskStatus" :key="index" @click="changeStatus(task.id)">
                            {{ task.name }}
                        </li>
                    </ul>
                </div>
            </div>
            <div class="task-complete-data">
                <div class="task-side-action">
                    <div class="main-side-heading">
                        <h4>Details</h4>
                    </div>
                    <div class="task-side-action-content">

                        <div class="field-data">
                            <div class="field-label">
                                Assignee:
                            </div>
                            <div class="field-action">
                                <div v-tooltip="profile?.full_name" class="commenter-id">
                                    <div class="profile-image">
                                        <img :src="profile?.avatar_url != null ? profile?.avatar_url : initialAvatar(profile?.full_name)" />
                                    </div>
                                    <div class="profile-label">
                                        {{ profile?.full_name }}
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div class="field-data">
                            <div class="field-label">
                                Reporter
                            </div>
                            <div class="field-action">
                                <div v-tooltip="reportedBy?.full_name" class="commenter-id">
                                    <div class="profile-image">
                                        <img :src="reportedBy?.avatar_url != null ? reportedBy?.avatar_url : initialAvatar(reportedBy?.full_name)" />
                                    </div>
                                    <div class="profile-label">
                                        {{ reportedBy?.full_name }}
                                    </div>
                                </div>
                            </div>
                        </div>


                        <div class="field-data">
                            <div class="field-label">
                                Task End Data
                            </div>
                            <div class="field-action">
                                <div class="form-group">                                 
                                    <VueDatePicker @update:model-value="taskEndDateChange()" v-model="taskEndDate"></VueDatePicker>
                                </div>                                
                            </div>
                        </div>                        
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>
</template>