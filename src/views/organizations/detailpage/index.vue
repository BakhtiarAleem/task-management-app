<script setup>
import { ref, onMounted } from 'vue';
import { useRoute } from 'vue-router';
import DetailSidebar from '/src/components/DetailSidebar.vue'
import BlockLoader from '/src/components/BlockLoader.vue'
import store from "/store";
const id = ref('');
const route = useRoute();
const projectSelected = ref();
const isLoading = ref(true)

async function projectLoad() {
    id.value = route.params.id;
    isLoading.value = true
    await store.dispatch('projectDetail', id.value).then((val) => {
        projectSelected.value = val
    })
    projectSelected.value = projectSelected.value[0]
    isLoading.value = false
}

onMounted(() => {
    projectLoad()
});

</script>

<template>
<div class="detail-content-area">
    <BlockLoader v-if="isLoading" />
    <div v-if="!isLoading">
        <DetailSidebar v-if="projectSelected" :image="projectSelected?.project_image" :name="projectSelected?.name" :type="projectSelected?.type" />   
        <div class="detail-inner-content-area">
            <div class="container">
                <router-view />
            </div>
        </div>
    </div>
</div>
</template>