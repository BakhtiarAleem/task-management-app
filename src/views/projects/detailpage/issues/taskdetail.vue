<script setup>
import { ref, onMounted, reactive } from 'vue';
import { useRoute } from 'vue-router';
import AddIssuePopup from '/src/components/popups/AddIssuePopup.vue'
import BlockLoader from '/src/components/BlockLoader.vue'
import store from "/store";

const taskDetailId = ref({});
const route = useRoute();
const issueDetail = ref();
const modalClick = ref(false);
const isLoading = ref(true);    
function initialAvatar(value){
    return 'https://ui-avatars.com/api/background=a3216d&color=fff?name='+ value
}

async function issues() {
    taskDetailId.value = {
        projectid: route.params.id,
        taskid: route.params.taskid,
    }
    isLoading.value = true
    await store.dispatch('taskDetail', taskDetailId.value).then((val) => {
        issueDetail.value = val[0]
        console.log(issueDetail.value)
    })
    isLoading.value = false
}





onMounted(() => {
    issues()
});

</script>



<template>
    <div>
     <BlockLoader class="loader-page-block" v-if="isLoading" />
    <div v-if="!isLoading">
        <div class="task-left-sidearea">
            <div class="project-detail-page-title">            
                <h3>{{ issueDetail.task_name }}</h3>
            </div>    
            <div class="task-detail">
                <div class="task-description" v-html="issueDetail.task_description"></div>
                <div class="task-image-container">
                    <div v-if="issueDetail.task_image" class="task-image" :style="{'background-image': 'url('+ issueDetail.task_image +')'}">
                    </div>
                </div>
                <div v-if="issueDetail.task_comments.length" class="task-comment">
                </div>
            </div>
        </div>
        <div class="task-right-sidearea">
            <div class="task-assign">
                
            </div>
            <div class="task-complete-data">
                <div class="form-group">
                    <input type="date" class="form-control" />
                </div>
            </div>
        </div>
    </div>
</div>
</template>