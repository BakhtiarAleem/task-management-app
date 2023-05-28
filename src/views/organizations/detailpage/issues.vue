<script setup>
import { ref, onMounted } from 'vue';
import { useRoute } from 'vue-router';
import store from "/store";
const id = ref('');
const route = useRoute();
const projectIssue = ref();


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
    </div>
</template>