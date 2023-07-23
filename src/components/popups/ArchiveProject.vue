<script setup>
import { ref, onMounted, computed, watch } from 'vue'
import BaseLoader from '/src/components/BaseLoader.vue'
import store from "/store";
import { useRoute } from 'vue-router';
const isLoading = ref(false);


const props = defineProps({
    popup: Boolean,
    projectname: String,
    projectid: Number,
})




async function submitForm(val) {
    val.preventDefault();    
    isLoading.value = true;
    await store.dispatch('archiveProject', props.projectid).then((e) => { 
        emit('reLoad', true)     
        emit('close', true)  
        isLoading.value = false;
    })
}







const emit = defineEmits(['close','reLoad'])

</script>




<template>
<div class="modal fade" :class="popup ? 'show' : ''" tabindex="-1">
  <div class="modal-dialog sm">
    <div class="modal-content">
        <div class="modal-header">
            <h5 class="modal-title">Archive Project</h5>
            <button type="button" @click="emit('close', false)" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
        </div>
        <form @submit="submitForm">
            <div class="modal-body">
                <div class="modal-content-area">
                  <p>Are Your Sure You Want to Archive <strong>{{ projectname }}</strong> Project ?</p>
                
                </div>
            </div>
            <div class="modal-footer">
                <button type="button" @click="emit('close', false)" class="btn btn-danger">No</button>

                <button type="submit" :class="isLoading ? 'disabled' : ''" class="btn btn-primary">Yes<BaseLoader/></button>
            </div>
        </form>
        </div>
    </div>
</div>

</template>
<style>
</style>