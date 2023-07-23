<script setup>
import { ref, onMounted, computed, watch } from 'vue'
import BaseLoader from '/src/components/BaseLoader.vue'
import store from "/store";
import { useRoute } from 'vue-router';
const route = useRoute();
const isLoading = ref(false);
const inviteUser = ref();


async function submitForm(val) {
    val.preventDefault();    
    isLoading.value = true;
    await store.dispatch('inviteUser', inviteUser.value).then((e) => { 
        console.log(e)
        emit('reLoad', true)     
        emit('close', true)  
        isLoading.value = false;
    })
}




const props = defineProps({
  popup: Boolean
})



const emit = defineEmits(['close','reLoad'])

</script>




<template>
<div class="modal fade" :class="popup ? 'show' : ''" tabindex="-1">
  <div class="modal-dialog sm">
    <div class="modal-content">
        <div class="modal-header">
            <h5 class="modal-title">Invite User</h5>
            <button type="button" @click="emit('close', false)" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
        </div>
        <form @submit="submitForm">
            <div class="modal-body">
                <div class="modal-content-area">
                    <div class="form-group">
                        <label>Invite User</label>
                        <input type="email" v-model="inviteUser" class="form-control" placeholder="Invite New User" required />
                    </div>
                
                </div>
            </div>
            <div class="modal-footer">
                <button type="button" @click="emit('close', false)" class="btn btn-danger">Cancel</button>

                <button type="submit" :class="isLoading ? 'disabled' : ''" class="btn btn-primary">Submit<BaseLoader/></button>
            </div>
        </form>
        </div>
    </div>
</div>

</template>
<style>
.modal-content-area .ql-editor {
    min-height: auto;
    max-height: 150px;
    overflow: auto;
}
</style>