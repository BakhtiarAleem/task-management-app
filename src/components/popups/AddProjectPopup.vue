<script setup>
import { ref, onMounted, computed, watch } from 'vue'
import store from "/store";
import BaseLoader from '/src/components/BaseLoader.vue'
import { useRouter } from 'vue-router';
const router = useRouter();
const optionsSelect = ref([
    {
        value: null,
        text: 'Select Projects diagnostics category',
    },
]);
const isLoading = ref(false);
const name = ref();
const category = ref(optionsSelect[0]?.name ? optionsSelect[0].name : null);
const description = ref();
const uploadImage = ref();
const uploadPlaceholderImage = ref('/company-placeholder.png');


const authToken = computed(() => store.getters.token)

async function callOrginizationType() {
    if(authToken.value != 'null'){
        await store.dispatch('projectTypes').then((value) => {
            optionsSelect.value = value
        })
    }
}



async function submitForm(val) {
    val.preventDefault();    
    isLoading.value = true;
    const data = {
        name: name.value,
        description: description.value,
        type: category.value,
        uploadImage: uploadImage.value,
    }
    await store.dispatch('addProject', data).then(() => {
        emit('close', false)
        emit('reload')
    })
    isLoading.value = false;
}




function imageUpload(event) {
    uploadImage.value = event.target.files[0];
    uploadPlaceholderImage.value = URL.createObjectURL(uploadImage.value);
}

const props = defineProps({
  popup: Boolean
})


watch(category, (currentValue) => {
 return currentValue
    });


onMounted(() => {
    callOrginizationType()
})

const emit = defineEmits(['close','reLoad'])

</script>




<template>
<div class="modal fade" :class="popup ? 'show' : ''" tabindex="-1">
  <div class="modal-dialog">
    <div class="modal-content">
        <div class="modal-header">
            <h5 class="modal-title">Add Projects</h5>
            <button type="button" @click="emit('close', false)" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
        </div>
        <form @submit="submitForm">
            <div class="modal-body">
                <div class="modal-content-area">
                    <div class="form-group">
                        <label>Name</label>
                        <input type="text" v-model="name" class="form-control" placeholder="Enter company / organization name" />
                    </div>

                    <div class="form-group">
                        <label>Category</label>
                        <select v-model="category" class="custom-select">  
                            <option disabled value="null">Select organization diagnostics category</option>
                            <option v-for="(option, index) in optionsSelect" :key="index" :value="option.name">{{ option.name }}</option>
                        </select>
                    </div>

                    <div class="form-group">
                        <label>Short bio</label>
                        <input type="text" v-model="description" class="form-control" placeholder="Write short description about organization" />
                    </div>
                    <div class="form-group">
                        <div class="row">
                            <div class="col-md-10">
                                <label class="custom-file-label" for="inputGroupFile03">Upload Image</label>
                                <div class="custom-file">
                                    <input type="file" @change="imageUpload" class="custom-file-input form-control" id="inputGroupFile03">                           
                                </div>
                            </div>
                            <div class="col-md-2">
                                <div class="custom-image" :style="{'background-image': 'url('+ uploadPlaceholderImage +')'}">                                 
                                </div>
                            </div>
                        </div>
                    </div>
                
                
                </div>
            </div>
            <div class="modal-footer">
                <button @click="emit('close', false)" class="btn btn-danger">Cancel</button>

                <button type="submit" :class="isLoading ? 'disabled' : ''" class="btn btn-primary">Submit<BaseLoader/></button>
            </div>
        </form>
        </div>
    </div>
</div>

</template>

