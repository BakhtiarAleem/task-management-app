<script setup>
import BaseMultiSelect from '/src/components/BaseMultiSelect.vue'
import { ref, onMounted, computed, watch } from 'vue'
import BaseLoader from '/src/components/BaseLoader.vue'
import store from "/store";
import { useRoute } from 'vue-router';
const route = useRoute();
const isLoading = ref(false);
const projectid = ref(route.params.id);
const authToken = computed(() => store.getters.token)
const memberList = ref([]);
const designation = ref()
const memberSelected = ref()


async function submitForm(val) {
    val.preventDefault();    
    isLoading.value = true;
    await store.dispatch('addTeamMember',{
        project_id: store.getters.projectSelected,
        userId: memberSelected.value,
        designation: designation.value,
  }).then((e) => {        
    }) 
    emit('close', false)
    emit('reload')
    isLoading.value = false;
}

function initialAvatar(value){
    return 'https://ui-avatars.com/api/background=a3216d&color=fff?name='+ value
}

async function alreadyRegisterdUsers() {
    if(authToken){
        await store.dispatch('addMembertoProject', projectid.value).then((e) => {      
            for (let i = 0; i < e.length; i++) {
            let image = e[i].user_id.avatar_url === null ? initialAvatar(e[i].user_id.username) : e[i].user_id.avatar_url
            memberList.value.push({username: e[i].user_id.username, value: e[i].user_id.id, icon: image })
            }
        })
    }
}

function selectedUser(n){
    memberSelected.value = n
}

const props = defineProps({
  popup: Boolean
})


onMounted(() => {
    alreadyRegisterdUsers();
})

const emit = defineEmits(['close','reLoad'])

</script>




<template>
<div class="modal fade" :class="popup ? 'show' : ''" tabindex="-1">
  <div class="modal-dialog sm">
    <div class="modal-content">
        <div class="modal-header">
            <h5 class="modal-title">Add User</h5>
            <button type="button" @click="emit('close', false)" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
        </div>
        <form @submit="submitForm">
            <div class="modal-body">
                <div class="modal-content-area">
                    <div class="form-group">
                        <label>Add User</label>
                        <BaseMultiSelect :assignTaskOption="memberList" @value="selectedUser" />
                    </div>
                    <div class="form-group">
                        <label>Designation</label>
                        <input type="text" v-model="designation" required class="form-control" placeholder="Enter Designation" />
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