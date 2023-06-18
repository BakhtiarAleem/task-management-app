<script setup>
import { ref, onMounted, reactive } from 'vue';
import { useRoute } from 'vue-router';
import AddIssuePopup from '/src/components/popups/AddIssuePopup.vue'
import BlockLoader from '/src/components/BlockLoader.vue'
import store from "/store";

const id = ref('');
const route = useRoute();
const projectIssue = ref();
const modalClick = ref(false);
const isLoading = ref(true);    
function initialAvatar(value){
    return 'https://ui-avatars.com/api/background=a3216d&color=fff?name='+ value
}

async function issues() {
    id.value = route.params.id;
    isLoading.value = true
    await store.dispatch('projectIssues', id.value).then((val) => {
        projectIssue.value = val   
       console.log(projectIssue.value)
    })
    isLoading.value = false
}





onMounted(() => {
    issues()
});

</script>



<template>
    <div>
        <div class="task-left-sidearea">
            <div class="project-detail-page-title">            
                <h3>Task Name</h3>
            </div>    
            <div class="task-description">

            </div>
        </div>
        <div class="task-right-sidearea">

        </div>
    </div>
</template>