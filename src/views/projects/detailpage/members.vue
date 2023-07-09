<script setup>
import { ref, onMounted, computed } from "vue";
import CardBlock from "/src/components/CardBlock.vue";
import InviteUser from '/src/components/popups/InviteUser.vue'
import AddUser from '/src/components/popups/AddUser.vue'
import BlockLoader from "/src/components/BlockLoader.vue";
import RemoveMember from '/src/components/popups/RemoveMember.vue'
import NoRecordFound from "/src/components/NoRecordFound.vue";
import store from "/store";
import { useRoute } from 'vue-router';
const route = useRoute();


const projectid = ref(route.params.id);
const manageCards = ref([]);
const modalClick = ref(false);
const addUsersermodalClick = ref(false);
const isLoading = ref(true);
const removeMemberPopup = ref(false);
const removeMemberProjectID = ref()
const removeMemberuserID = ref()
const removeMemberName= ref()

async function members() {
    await store.dispatch('teamMembers', projectid.value).then((e) => {   
        manageCards.value = e
        isLoading.value = false
    })
}




function removeMember(projectid, userid, username){
  removeMemberProjectID.value = projectid
  removeMemberuserID.value = userid
  removeMemberName.value = username
  removeMemberPopup.value = true
}

function initialAvatar(value){
    return 'https://ui-avatars.com/api/background=a3216d&color=fff?name='+ value
}

onMounted(() => {
    members();
})
</script>

<template>
  <div>
    <div class="project-detail-page-title mb-4">
      <div class="title-icon">
        <i class="icon-team"></i>
      </div>
      <h3>Members</h3>
      <div class="add-issues">
        <button
          @click="modalClick = true"
          class="btn btn-primary mr-4"
          type="button"
        >
          <i class="icon-warm-ico"></i><span>Invite User</span>
        </button>
        <button
          @click="addUsersermodalClick = true"
          class="btn btn-secondary"
          type="button"
        >
          <i class="icon-team-member"></i><span>Add User</span>
        </button>
      </div>
    </div>
    <BlockLoader class="loader-page-block" v-if="isLoading" />
    <div v-if="!isLoading">
    <div v-if="manageCards.length" class="row">
      <CardBlock
      v-for="(manage, index) in manageCards"
                :key="index"
        cssClass="rectangle-card"
        :class="manage?.designation === 'Owner' ? 'project-owner' : ''"
        :mainImage="manage?.user_id?.avatar_url ? manage?.user_id?.avatar_url : initialAvatar(manage?.user_id?.full_name)"
                :mainHeading="manage?.user_id?.full_name"
                :subHeading="manage?.designation"                
      >
      <template v-slot:menu>
                        <div>
                            <ul>
                                <!-- <li>
                                    <router-link
                                        :to="{
                                        name: 'projects-detail-members',
                                        params: {
                                            id: manage.id,
                                        },
                                        }"
                                    >
                                        <i class="icon-team"></i>
                                        <span>Team members</span>
                                    </router-link>
                                </li> -->
                                <li v-if="manage?.designation != 'Owner'">
                                    <a @click="removeMember(manage.project_id, manage.user_id.id, manage.user_id.username)" class="cursor-pointer">
                                        <i class="icon-block-user"></i>
                                        Remove Member
                                    </a>
                                </li>
                                <!-- <li v-if="manage.project_status === 2">
                                    <a class="cursor-pointer" @click="activeProjectFunction(manage.id)">
                                        <i class="icon-download"></i>
                                        Active
                                    </a>
                                </li> -->
                            </ul>
                        </div>
                    </template>
    </CardBlock>
    </div>
  </div>
    <div v-if="!manageCards.length && !isLoading">
            <NoRecordFound />
    </div>
    <InviteUser :popup="modalClick" @close="modalClick = false" @reload="projects"></InviteUser>
    <AddUser :popup="addUsersermodalClick" @close="addUsersermodalClick = false" @reload="members"></AddUser>
    <RemoveMember  :popup="removeMemberPopup" :projectid="removeMemberProjectID" :userid="removeMemberuserID" :memberName="removeMemberName" @close="removeMemberPopup = false" @reload="members"></RemoveMember>
  </div>
</template>
