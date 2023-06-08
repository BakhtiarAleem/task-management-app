<script setup>
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router';
import BaseLoader from '/src/components/BaseLoader.vue'
import {useToast} from 'vue-toast-notification';
import store from "/store";
const firstname = ref('');
const lastname = ref('');
const email = ref('');
const password = ref("");
const confirmPassword = ref("");
const isLoading = ref(false);
const toast = useToast();
const router = useRouter();

async function handerSignUp() {
if(password.value === confirmPassword.value){
    isLoading.value = true
  store.dispatch('register',{
    email: email.value,
    password: password.value,
    options: {
    data: {
      first_name: firstname.value,
      last_name: lastname.value,
    },
  },
  }).then((e) => {
    isLoading.value = false
    router.push('/login')
})
}
else{
    toast.error('New Password and Confirm Password does not match')
}
    }
</script>

<template>
  <div>
    <h3 class="welcome-heading">Register</h3>
    <div class="card">
      <div class="card-body auth-card-body">
        <form @submit.prevent="handerSignUp">
            <div class="row">
                <div class="col-md-6">
                    <div class="form-group">
                        <label for="email">First Name</label>
                        <input class="form-control" id="firstname" type="text" v-model="firstname" />
                    </div>
                </div>
                <div class="col-md-6">
                    <div class="form-group">
                        <label for="email">Last Name</label>
                        <input class="form-control" id="lastname" type="text" v-model="lastname" />
                    </div>
                </div>
                <div class="col-md-12">
                    <div class="form-group">
                        <label for="email">Email</label>
                        <input class="form-control" id="email" type="email" v-model="email" />
                    </div>
                </div>
                <div class="col-md-6">
                    <div class="form-group">
                        <label for="password">New Password</label>
                        <input class="form-control" id="password" type="password" v-model="password" />
                    </div>
                </div>
                <div class="col-md-6">
                    <div class="form-group">
                        <label for="password">Confirm Password</label>
                        <input class="form-control" id="confirmpassword" type="password" v-model="confirmPassword" />
                    </div>
                </div>
            </div>          
            <div>
                <button class="btn btn-primary" :class="isLoading ? 'disabled' : ''" type="submit">
                    Register
                    <span>
                        <BaseLoader/>
                    </span>
                </button>
                <button type="button" @click="()=> router.push('/login')" class="btn btn-link right-side-btn">Login to account</button>
            </div>
        </form>
      </div>
    </div>
  </div>
</template>
