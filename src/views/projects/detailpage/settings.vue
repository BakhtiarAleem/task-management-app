<script setup>
import { ref, onMounted, computed, watch } from 'vue'
import store from "/store";
import BaseLoader from '/src/components/BaseLoader.vue'
import { useRoute } from 'vue-router';
const route = useRoute();
const selectedProject = computed(() => store.state.projectDetail)
const optionsSelect = ref([
    {
        value: null,
        text: 'Select Projects diagnostics category',
    },
]);
const isLoading = ref(false);
const name = ref();
const category = ref();
const description = ref();
const uploadImage = ref();
const uploadPlaceholderImage = ref('/company-placeholder.png');
const authToken = computed(() => store.getters.token)

async function callOrginizationType() {
    if(authToken.value != 'null'){
        await store.dispatch('projectTypes').then((value) => {
            optionsSelect.value = value
        })
        name.value = selectedProject.value.name
        category.value = selectedProject.value.type
        description.value = selectedProject.value?.description
        uploadImage.value = selectedProject.value?.project_image
        uploadPlaceholderImage.value = uploadImage.value
    }
}

function imageUpload(event) {
    uploadImage.value = event.target.files[0];
    uploadPlaceholderImage.value = URL.createObjectURL(uploadImage.value);
}


async function submitForm(val) {
    val.preventDefault();    
    isLoading.value = true;
    const data = {
        id: selectedProject.value.id,
        name: name.value,
        description: description.value,
        type: category.value,
        uploadImage: uploadImage.value,
    }
    await store.dispatch('updateProject', data).then((e) => {
        console.log(e)
    })
    isLoading.value = false;
}


watch(name, (currentValue) => {
  return currentValue
    });

    watch(description, (currentValue) => {
  return currentValue
    });

    watch(uploadImage, (currentValue) => {
  return currentValue
    });

onMounted(() => {
    callOrginizationType()
})
</script>
<template>
    <div>
        <div class="project-detail-page-title mb-4">
            <div class="title-icon">
                <i class="icon-admin"></i>
            </div>
            <h3>Settings</h3>      
        </div>  
        <div class="setting-page">
                <form @submit="submitForm">
                <div class="row">
                    <div class="col-md-8">
                        <div class="row">
                            <div class="col-md-6">
                                <div class="form-group">
                                    <label>Project Name</label>
                                    <input type="text" v-model="name" class="form-control" placeholder="Enter Project Name" required />
                                </div>
                            </div>
                            <div class="col-md-6">
                                <div class="form-group">
                                    <label>Category</label>
                                    <select v-model="category" class="custom-select">  
                                        <option disabled value="null">Select organization diagnostics category</option>
                                        <option v-for="(option, index) in optionsSelect" :key="index" :value="option.name">{{ option.name }}</option>
                                    </select>
                                </div>
                            </div>
                            <div class="col-md-12">
                                <div class="form-group">
                                    <div class="row">
                                        <div class="col-md-11">
                                            <label class="custom-file-label" for="inputGroupFile03">Upload Image</label>
                                            <div class="custom-file">
                                                <input type="file" @change="imageUpload" class="custom-file-input form-control" id="inputGroupFile03">                           
                                            </div>
                                        </div>
                                        <div class="col-md-1">
                                            <div class="custom-image" :style="{'background-image': 'url('+ uploadPlaceholderImage +')'}">                                 
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div class="col-md-12">
                                <div class="form-group">
                                    <label>Short bio</label>
                                    <textarea class="form-control" v-model="description" placeholder="Write short description about organization"></textarea>                                   
                                </div>
                            </div>
                            <div class="col-md-12">
                                <button type="submit" :class="isLoading ? 'disabled' : ''" class="btn btn-primary">Update<BaseLoader/></button>
                            </div>
                        </div>
                    </div>
                </div>    
                </form>
            </div>
    </div>
</template>