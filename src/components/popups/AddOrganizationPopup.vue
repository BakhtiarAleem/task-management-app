<script setup>
import { ref, onMounted } from 'vue'
import store from "/store";
const optionsSelect = ref([
    {
        value: null,
        text: 'Select organization diagnostics category',
    },
    {
        value: 1,
        text: 'Internet Services',
    },
    {
        value: 2,
        text: 'Marketing & Sales',
    },
]);

async function callOrginizationType() {
    await store.dispatch('projectTypes').then((value) => {
        optionsSelect.value = value
    })
}

async function submitForm() {
    await store.dispatch('projectTypes').then((value) => {
        optionsSelect.value = value
    })
}

const props = defineProps({
  popup: Boolean
})

onMounted(() => {
    callOrginizationType()
})

const emit = defineEmits(['close'])

</script>




<template>
<div class="modal fade" :class="popup ? 'show' : ''" tabindex="-1">
  <div class="modal-dialog">
    <div class="modal-content">
        <div class="modal-header">
            <h5 class="modal-title">Add Organization</h5>
            <button type="button" @click="emit('close', false)" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
        </div>
        <form @submit="">
            <div class="modal-body">
                <div class="modal-content-area">


                    <div class="form-group">
                        <label>Name</label>
                        <input type="text" class="form-control" placeholder="Enter company / organization name" />
                    </div>

                    <div class="form-group">
                        <label>Category</label>
                        <select class="custom-select">  
                            <option v-for="(option, index) in optionsSelect" :key="index" :value="option.name">{{ option.name }}</option>
                        </select>
                    </div>

                    <div class="form-group">
                        <label>Short bio</label>
                        <input type="text" class="form-control" placeholder="Write short description about organization" />
                    </div>
                    <div class="form-group">
                        <label class="custom-file-label" for="inputGroupFile03">Upload Image</label>
                        <div class="custom-file">
                            <input type="file" class="custom-file-input" id="inputGroupFile03">                           
                        </div>
                    </div>
                
                
                </div>
            </div>
            <div class="modal-footer">
                <button @click="emit('close', false)" class="btn btn-danger">Cancel</button>

                <button @click="emit('close', false)" class="btn btn-primary">Submit</button>
            </div>
        </form>
        </div>
    </div>
</div>

</template>

