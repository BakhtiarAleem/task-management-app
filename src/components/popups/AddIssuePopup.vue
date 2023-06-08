<script setup>

import { ref, onMounted, computed, watch } from 'vue'
// const Multiselect = await import('@vueform/multiselect').then(module => module.default);
import BaseEditor from '/src/components/BaseEditor.vue'
import store from "/store";
import { useRouter } from 'vue-router';
const router = useRouter();
const optionsSelect = ref([
    {
        value: null,
        text: 'Select organization diagnostics category',
    },
]);
const name = ref();
const description = ref();
const uploadImage = ref();


const userSelected = ref({ name: 'Vue.js', language: 'JavaScript' });
const userSelection = ref([
        { name: 'Vue.js', language: 'JavaScript' },
        { name: 'Rails', language: 'Ruby' },
        { name: 'Sinatra', language: 'Ruby' },
        { name: 'Laravel', language: 'PHP' },
        { name: 'Phoenix', language: 'Elixir' }
      ]);

      const authToken = computed(() => store.getters.token)
      const taskStatus = computed(() => store.getters.taskStatus)

      const taskStatusSelected = ref(taskStatus[0]?.name ? taskStatus[0].name : null);


async function submitForm(val) {
    val.preventDefault();    
}

async function taskStatusFunction() {
  if(authToken){
    await store.dispatch('taskStatus')
  }
}


function imageUpload(event) {
    uploadImage.value = event.target.files[0]
}

const props = defineProps({
  popup: Boolean
})


watch(taskStatusSelected, (currentValue) => {
 return currentValue
    });


onMounted(() => {
    taskStatusFunction();
})

const emit = defineEmits(['close'])

</script>




<template>
<div class="modal fade" :class="popup ? 'show' : ''" tabindex="-1">
  <div class="modal-dialog md">
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
                        <input type="text" v-model="name" class="form-control" placeholder="Enter Task Name" />
                    </div>

                    <div class="form-group">
                        <label>Task Description</label>
                        <BaseEditor />                    
                    </div>

                    <div class="form-group">
                        <label>Task Status</label>
                        <select v-model="taskStatusSelected" class="custom-select">  
                            <option disabled value="null">Select Task Status</option>
                            <option v-for="(option, index) in taskStatus" :key="index" :value="option.id" class="text-capitilize">{{ option.name }}</option>
                        </select>
                    </div>

                    <div class="form-group">
                        <label>Assign Task To</label>
                        <select v-model="taskStatusSelected" class="custom-select">  
                            <option disabled value="null">Select Users</option>
                            <option v-for="(option, index) in taskStatus" :key="index" :value="option.id" class="text-capitilize">{{ option.name }}</option>
                        </select>
                    </div>
                    
                    <!-- <div class="form-group">
                        <label>Short bio</label>
                        <input type="text" v-model="description" class="form-control" placeholder="Write short description about organization" />
                    </div> -->
                    <!-- <div class="form-group">
                        <label class="custom-file-label" for="inputGroupFile03">Upload Image</label>
                        <div class="custom-file">
                            <input type="file" @change="imageUpload" class="custom-file-input" id="inputGroupFile03">                           
                        </div>
                    </div> -->
                
                
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
.modal.fade.show .modal-dialog.md {
    max-width: 500px;
}
.modal-content-area .ql-editor {
    min-height: 150px;
}
</style>