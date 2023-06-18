<script setup>
import { ref, onMounted, reactive } from "vue";
import { useRoute } from "vue-router";
import AddIssuePopup from "/src/components/popups/AddIssuePopup.vue";
import BlockLoader from "/src/components/BlockLoader.vue";
import store from "/store";

const id = ref("");
const route = useRoute();
const projectIssue = ref();
const modalClick = ref(false);
const isLoading = ref(true);
function initialAvatar(value) {
  return "https://ui-avatars.com/api/background=a3216d&color=fff?name=" + value;
}
const currentProject = ref(route.params.id);
async function issues() {
  id.value = route.params.id;
  isLoading.value = true;
  await store.dispatch("projectIssues", id.value).then((val) => {
    projectIssue.value = val;
  });
  isLoading.value = false;
}

onMounted(() => {
  issues();
});
</script>

<template>
  <div>
    <div class="project-detail-page-title">
      <div class="title-icon">
        <i class="icon-business-bag"></i>
      </div>
      <h3>Issues</h3>
      <div class="add-issues">
        <button
          @click="modalClick = true"
          class="btn btn-secondary"
          type="button"
        >
          <i class="icon-add-member"></i><span>Add Issue</span>
        </button>
      </div>
    </div>
    <div class="issue-listing">
      <BlockLoader class="loader-page-block" v-if="isLoading" />
      <div v-if="!isLoading" class="table-responsive">
        <div class="table-content">
          <table class="table b-table table-striped table-hover">
            <thead>
              <tr>
                <th>ID</th>
                <th>Task</th>
                <th>Assign to</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="(issues, index) in projectIssue" :key="index">
                <td>
                  {{ issues.id }}
                </td>
                <td>
                  <div
                    class="bullet-icon"
                    :style="{
                      'background-color': issues.status_task.color_indicator,
                    }"
                  ></div>
                  <div class="item-title">
                    <p>{{ issues.task_name }}</p>
                  </div>
                </td>
                <td>
                  <div v-if="issues.profiles" class="profile-table">
                    <img
                      class="character-option-icon"
                      :src="
                        issues.profiles.avatar_url === null
                          ? initialAvatar(issues.profiles.username)
                          : issues.profiles.avatar_url
                      "
                    />
                    <p>{{ issues.profiles.username }}</p>
                  </div>
                  <div v-if="!issues.profiles">Not Assign</div>
                </td>
                <td>
                  <div
                    class="status inline-status-table"
                    :style="{
                      'background-color': issues.status_task.color_indicator,
                    }"
                  >
                    {{ issues.status_task.name }}
                  </div>
                </td>
                <div class="select-project">
                  <router-link
                    :to="{
                      name: 'projects-detail-issues-content',
                      params: {
                        id: currentProject,
                        taskid: issues.id,
                      },
                    }"
                  >
                  </router-link>
                </div>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
    <AddIssuePopup
      :popup="modalClick"
      @close="modalClick = false"
      @reload="issues"
    ></AddIssuePopup>
  </div>
</template>
