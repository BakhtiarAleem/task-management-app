<script setup>
import BaseMultiSelect from '/src/components/BaseMultiSelect.vue'
import { ref, onMounted, computed, watch } from 'vue'
import BaseEditor from '/src/components/BaseEditor.vue'
import store from "/store";
import { useRouter } from 'vue-router';
const router = useRouter();
const name = ref();
const description = ref();

const authToken = computed(() => store.getters.token)
const taskStatus = computed(() => store.getters.taskStatus)
const uploadImage = ref();
const profileList = ref([]);
const selectedProfile = ref();
const uploadPlaceholderImage = ref('/company-placeholder.png');
const taskStatusSelected = ref(taskStatus[0]?.name ? taskStatus[0].name : null);



async function submitForm(val) {
    val.preventDefault();    
    await store.dispatch('addIssue',{
        project_id: store.getters.projectSelected,
        task_name: name.value,
        task_description: description.value,
        task_status_id: taskStatusSelected.value,
        uploadImage: uploadImage.value,
        assign_to: selectedProfile.value,
  }).then((e) => {        
     console.log(e)
    }) 
}

function initialAvatar(value){
    return 'https://ui-avatars.com/api/background=a3216d&color=fff?name='+ value
}

async function profile() {
    await store.dispatch('userProfile').then((e) => {        
        for (let i = 0; i < e.length; i++) {
        let image = e[i].avatar_url === null ? initialAvatar(e[i].username) : e[i].avatar_url
        profileList.value.push({username: e[i].username, value: e[i].id, icon: image })
        }
    })
}


function imageUpload(event) {
    uploadImage.value = event.target.files[0];
    uploadPlaceholderImage.value = URL.createObjectURL(uploadImage.value);
}

async function taskStatusFunction() {
  if(authToken){
    await store.dispatch('taskStatus')
  }
}

function taskDescription(n){
    description.value = n
}


function assignTaskTo(n){
    selectedProfile.value = n
}

const props = defineProps({
  popup: Boolean
})


watch(taskStatusSelected, (currentValue) => {
 return currentValue
    });


onMounted(() => {
    taskStatusFunction();
    profile();
})

const emit = defineEmits(['close'])

</script>




<template>
<div class="modal fade" :class="popup ? 'show' : ''" tabindex="-1">
  <div class="modal-dialog lg">
    <div class="modal-content">
        <div class="modal-header">
            <h5 class="modal-title">Add Issue</h5>
            <button type="button" @click="emit('close', false)" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
        </div>
        <form @submit="submitForm">
            <div class="modal-body">
                <div class="modal-content-area">
                    <div class="form-group">
                        <label>Task Name</label>
                        <input type="text" v-model="name" class="form-control" placeholder="Enter Task Name" required />
                    </div>

                    <div class="form-group">
                        <label>Task Description</label>
                        <BaseEditor @value="taskDescription" />                    
                    </div>
                    <div class="form-group">
                        <div class="row">
                            <div class="col-md-11">
                                <label class="custom-file-label" for="inputGroupFile03">Upload Task Image</label>
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
                    <div class="form-group">
                        <label>Task Status</label>
                        <select v-model="taskStatusSelected" class="custom-select" required>  
                            <option disabled value="null">Select Task Status</option>
                            <option v-for="(option, index) in taskStatus" :key="index" :value="option.id" class="text-capitilize">{{ option.name }}</option>
                        </select>
                    </div>

                    <div class="form-group">
                        <label>Assign Task To</label>
                        <BaseMultiSelect :assignTaskOption="profileList" @value="assignTaskTo" />
                    </div>                                       
                
                
                </div>
            </div>
            <div class="modal-footer">
                <button @click="emit('close', false)" class="btn btn-danger">Cancel</button>

                <button type="submit" class="btn btn-primary">Submit</button>
            </div>
        </form>
        </div>
    </div>
</div>

</template>
<style>
.modal-content-area .ql-editor {
    min-height: 150px;
}
</style>