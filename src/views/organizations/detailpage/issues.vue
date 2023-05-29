<script setup>
import { ref, onMounted } from 'vue';
import { useRoute } from 'vue-router';
import AddIssuePopup from '/src/components/popups/AddIssuePopup.vue'
import store from "/store";
const id = ref('');
const route = useRoute();
const projectIssue = ref();
const modalClick = ref(false);

async function projectLoad() {
    id.value = route.params.id;
    await store.dispatch('projectIssues', id.value).then((val) => {
        projectIssue.value = val
    })
}

onMounted(() => {
    projectLoad()
});

</script>



<template>
    <div>
        <div class="project-detail-page-title">
            <div class="title-icon">
                <i class="icon-business-bag"></i>
            </div>
            <h3>Issues</h3>
            <div class="add-issues">
                <button @click="modalClick = true" class="btn btn-secondary" type="button"><i class="icon-add-member"></i><span>Add Issue</span></button>
            </div>
        </div>    
        <div class="issue-listing">
            <div v-for="(issues, index) in projectIssue" :key="index" class="issue-item">
                <div class="bullet-icon" :style="{'background-color': issues.status_task.color_indicator}">
                </div>
                <div class="item-title">
                    <p>{{ issues.task_name }}</p>
                </div>
                <div class="status" :style="{'background-color': issues.status_task.color_indicator}">
                    {{ issues.status_task.name }}
                </div>
            </div>
        </div>  
        <AddIssuePopup :popup="modalClick" @close="modalClick = false"></AddIssuePopup>
    </div>
</template>