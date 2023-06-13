<script setup>
import { ref, onMounted } from "vue";
const props = defineProps({
  image: String,
  name: String,
  type: String,
  mobilebar: Boolean,
});
function imageUrl(url) {
  // return ''+ import.meta.env.VITE_SUPABASE_URL + '/storage/v1/object/public/project/' + url
  return (
    "" +
    import.meta.env.VITE_SUPABASE_URL +
    "/storage/v1/object/public/project/" +
    props.image
  );
}
import { useRoute, useRouter } from "vue-router";
import store from "../../store";
const route = useRoute();
const currentProject = ref(route.params.id);

function currentProjectSelected() {
  store.state.projectSelected = currentProject.value;
}

onMounted(() => {
  currentProjectSelected();
});
</script>

<template>
  <div class="detail-sidebar" :class="mobilebar ? 'mobile-active' : ''">
    <div class="container">
      <div class="project-selected">
        <div class="project-logo">
          <div class="image-section">
            <img v-if="image" :src="imageUrl(image)" />
          </div>
        </div>
        <div class="project-details">
          <h4 v-if="name">{{ name }}</h4>
          <h5 v-if="type">{{ type }}</h5>
        </div>
        <div class="navigation">
          <ul>
            <li>
              <router-link
                :to="{
                  name: 'projects-detail-sprint',
                  params: {
                    id: currentProject,
                  },
                }"
              >
                <i class="icon-final-ico"></i>
                <span>Sprint</span>
              </router-link>
            </li>
            <li>
              <router-link
                :to="{
                  name: 'projects-detail-issues',
                  params: {
                    id: currentProject,
                  },
                }"
              >
                <i class="icon-business-bag"></i>
                <span>Issues</span>
              </router-link>
            </li>
            <li>
              <router-link
                :to="{
                  name: 'projects-detail-settings',
                  params: {
                    id: currentProject,
                  },
                }"
              >
                <i class="icon-admin"></i>
                <span>Settings</span>
              </router-link>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>
