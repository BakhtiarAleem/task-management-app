<script setup>
import { ref, onMounted } from 'vue'
import { useRoute, useRouter } from "vue-router";
import store from "/store";
import BaseLoader from '/src/components/BaseLoader.vue'
import { useToast } from "vue-toast-notification";

const password = ref("");
const confirmpassword = ref("");
const isLoading = ref(false);


const toast = useToast();
const router = useRouter();
const route = useRoute();
const email = ref(route.params.email);


async function setPassword() {
  isLoading.value = true;
  if(password.value === confirmpassword.value){
    store.dispatch('loginUser',{
    email: email.value,
    password: password.value,
  }).then((e) => {
  if(e === 'success'){
    router.push('/login')
  }
  isLoading.value = false;
})
  }
  else{
    toast.error('Password & Confirm Password Not Match');
  }

}

onMounted(() => {
});

</script>

<template>
  <div>
    <h3 class="welcome-heading">Set Your Password</h3>
    <div class="card">
      <div class="card-body auth-card-body">
        <form @submit.prevent="setPassword">
          <div class="form-group">
            <label for="password">Password</label>
            <input class="form-control" id="password" type="password" required v-model="password" />
          </div>
          <div class="form-group">
            <label for="confirmpassword">Confirm Password</label>
            <input class="form-control" id="password" type="password" required v-model="confirmpassword" />
          </div>
          <div>
            <button class="btn btn-primary" :class="isLoading ? 'disabled' : ''" type="submit">
              Create Password          
                <BaseLoader/>
            </button>        
          </div>
        </form>
      </div>
    </div>
  </div>
</template>
