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
const sprintData = ref([]);
const drag = ref(true);
const sprintStatus = ref([]);
const id = ref();
const route = useRoute();
const listData = ref();


function startData(e) {
  store.commit("setSprintOldValue", e);
  console.log(e)
}
function changeData(e) {
  if(store.getters["setSprintOldValue"] != e){
    console.log(store.getters["getSprintDrag"])
    console.log(e)
    drag.value = false
  }
}

function endData(e) {
 console.log(e)
}

function storeData(e) {
  store.commit("setSprintDrag", e);
}


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
                <VueDraggableNext :sort="drag" v-model="listData" group="sprint" class="dragArea list-group w-full" :list="sprintData" @change="changeData(sprint.id)" @start="startData(sprint.id)" @end="drag = false">
                  <div v-for="item in sprintData" @drag="storeData(item.id)" v-show="item.task_status_id === sprint.id" :key="item.id" class="list-group-item bg-gray-300 m-1 p-3 rounded-md text-center">{{ item.task_name }}</div>
                </VueDraggableNext>
            </div>
        </div>
    </div>
  </div>
</template>
