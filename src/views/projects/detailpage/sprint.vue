<script setup>
import { ref, onMounted, computed, watch } from 'vue'
import { VueDraggableNext } from "vue-draggable-next";
const enabled = ref(true);
import { useRoute } from "vue-router";
import store from "/store";

const list = ref([
  { name: "John", id: 1 },
  { name: "Joao", id: 2 },
  { name: "Jean", id: 3 },
  { name: "Gerard", id: 4 },
]);
const dragging = ref(false);
const isLoading = ref(true);
const sprintData = ref(true);
const sprintStatus = ref(true);
const id = ref();
const route = useRoute();


async function sprintFunction() {
  id.value = route.params.id;
  isLoading.value = true;
  await store.dispatch("projectIssues", id.value).then((val) => {
    sprintData.value = val;
    console.log(sprintData.value)
  });
  isLoading.value = false;
}


async function statusTaskFunction() {
    await store.dispatch("statusTask").then((val) => {
    sprintStatus.value = val;
  });
}


onMounted(async () => {
    statusTaskFunction();
    sprintFunction();
})

</script>

<template>
  <div>
    <div class="project-detail-page-title">
      <div class="title-icon">
        <i class="icon-final-ico"></i>
      </div>
      <h3>Sprint</h3>
    </div>
    <div class="sprint-card-row row">
        <div v-for="(sprint, sprintIndex) in sprintStatus" :key="sprintIndex" class="sprint-card-data col-lg-4 col-md-4">
            <div class="sprint-card-header">
                {{ sprint.name }}
            </div>
            <div class="sprint-card-body">
                <VueDraggableNext class="dragArea list-group w-full" :list="list" @change="log">
                    <transition-group>
                        <div
                        class="list-group-item bg-gray-300 m-1 p-3 rounded-md text-center"
                        v-for="element in sprintData"
                        :key="element.task_name"
                        v-show="sprint.id === element.task_status_id"
                        >
                        {{ element.task_name }}
                        </div>
                    </transition-group>
                </VueDraggableNext>
            </div>
        </div>
    </div>
  </div>
</template>
