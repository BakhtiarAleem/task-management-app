<script setup>
import { ref, onMounted, computed } from 'vue';
import { useRoute } from 'vue-router';
import BlockLoader from '/src/components/BlockLoader.vue'
import VueEasyLightbox from 'vue-easy-lightbox'
import store from "/store";
import moment from 'moment';

const taskDetailId = ref({});
const route = useRoute();
const issueDetail = ref();
const visible = ref(false);
const commentMessage = ref();
const profile = computed(() => store?.state?.profile || 'Anyonomous');
const isLoading = ref(true);    
function initialAvatar(value){
    return 'https://ui-avatars.com/api/background=a3216d&color=fff?name='+ value
}
function dateTime(value){
    let dateValue = moment(value, "YYYYMMDD").fromNow()
    return dateValue
}
const projectid = ref(route.params.id);
const taskid = ref(route.params.taskid);
const project = computed(() => store.state.projectDetail)
async function issues() {
    taskDetailId.value = {
        projectid: projectid.value,
        taskid: taskid.value,
    }
    isLoading.value = true
    await store.dispatch('taskDetail', taskDetailId.value).then((val) => {
        issueDetail.value = val[0]
        console.log(issueDetail.value)
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
    })
}

onMounted(() => {
    issues()
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
            <div class="project-detail-page-title">            
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
                    <div v-tooltip="profile?.full_name" class="commenter-id">
                        <div class="profile-image">
                            <img :src="profile?.avatar_url != null ? profile?.avatar_url : initialAvatar(profile?.full_name)" />
                        </div>
                    </div>
                    <div class="commenter-message">
                        <div class="form-group">
                            <input type="text" @keyup.enter="commenting" placeholder="Add a comment..." v-model="commentMessage" class="form-control" />
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
        <div class="task-right-sidearea">
            <div class="task-assign">
                
            </div>
            <div class="task-complete-data">
                <div class="task-side-action">
                    <div class="form-group">
                        <input type="date" class="form-control" />
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>
</template>