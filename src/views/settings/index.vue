<script setup>
import { ref, onMounted, computed, watch } from 'vue'
import store from "/store";
import BaseLoader from '/src/components/BaseLoader.vue'
import { useRoute } from 'vue-router';
const route = useRoute();



const username = ref();
const fullname = ref();
const website = ref();
const role = ref();
const isLoading = ref(false);
const uploadImage = ref();
const uploadPlaceholderImage = ref('/company-placeholder.png');

async function getUserSetting() {
    await store.dispatch('getUserSetting').then((e) => {
        username.value = e[0].username
        website.value = e[0].website
        role.value = e[0].role
        uploadImage.value = e[0].avatar_url
        uploadPlaceholderImage.value = e[0].avatar_url
        fullname.value = e[0].full_name
        store.commit('loginUser', e[0])
        store.commit('setProfile', e[0])
    })
}

function imageUpload(event) {
    uploadImage.value = event.target.files[0];
    uploadPlaceholderImage.value = URL.createObjectURL(uploadImage.value);
}

async function submitForm(val) {
    val.preventDefault();    
    isLoading.value = true;
    const data = {
        username: username.value,
        fullname: fullname.value,
        website: website.value,
        role: role.value,
        uploadImage: uploadImage.value,
    }
    await store.dispatch('updateSettings', data).then((e) => {
        console.log(e)
    })
    isLoading.value = false;
}

onMounted(() => {
    getUserSetting()
})

</script>
<template>
    <div>
        <h3 class="main-heading mb-4">Settings</h3>
        <div class="setting-page">
                <form @submit="submitForm">
                <div class="row">
                    <div class="col-md-7">
                        <div class="row">
                            <div class="col-md-6">
                                <div class="form-group">
                                    <label>Username</label>
                                    <input type="text" v-model="username" class="form-control" placeholder="Enter Username" required />
                                </div>
                            </div>
                            <div class="col-md-6">
                                <div class="form-group">
                                    <label>Full Name</label>
                                    <input type="text" v-model="fullname" class="form-control" placeholder="Enter Full Name" required>
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
                            <div class="col-md-6">
                                <div class="form-group">
                                    <label>Website</label>
                                    <input class="form-control" v-model="website" placeholder="Enter Website" />                              
                                </div>
                            </div>
                            <div class="col-md-6">
                                <div class="form-group">
                                    <label>Role</label>
                                    <input class="form-control" v-model="role" placeholder="Enter Role" />                              
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