<script setup>
import { ref } from "vue";
import BaseLoader from "/src/components/BaseLoader.vue";
import FrontHeader from "/src/components/front/FrontHeader.vue";
import FrontFooter from "/src/components/front/FrontFooter.vue";
import store from "/store";
const isLoading = ref(false);
const user = ref();
const pass = ref();
const dataRecieved = ref();

async function login() {
  isLoading.value = true;
  if (user.value === "bakhtiar" || ("Bakhtiar" && pass.value === "admin123"))
    store.dispatch("requestDemoData").then((e) => {
      dataRecieved.value = e;
    });
}
</script>

<template>
  <div class="request-demo-banner inner-banner">
    <FrontHeader></FrontHeader>
    <div class="front-container">
      <div class="site-admin">
        <form v-if="!dataRecieved" @submit.prevent="login">
          <div class="row">
            <div class="col-xs-12 col-sm-6">
              <div class="form-group">
                <label>Username</label>
                <input
                  class="form-control"
                  placeholder="Enter Username"
                  id="username"
                  type="text"
                  required
                  v-model="user"
                />
              </div>
            </div>
            <div class="col-xs-12 col-sm-6">
              <div class="form-group">
                <label>Password</label>
                <input
                  class="form-control"
                  placeholder="Enter Password"
                  id="password"
                  type="password"
                  required
                  v-model="pass"
                />
              </div>
            </div>
            <div class="col-xs-12 col-sm-12">
              <button
                class="btn btn-primary"
                :class="isLoading ? 'disabled' : ''"
                type="submit"
              >
                Sign in
                <span>
                  <BaseLoader />
                </span>
              </button>
            </div>
          </div>
        </form>
        <div v-if="dataRecieved" class="table-data">
          <div class="table-responsive">
            <div v-if="dataRecieved?.length" class="table-content">
              <table class="table b-table table-striped table-hover">
                <thead>
                  <tr>
                    <th>ID</th>
                    <th>FullName</th>
                    <th>Phone No</th>
                    <th>Email</th>
                    <th>Subject</th>
                    <th>Message</th>
                    <th>Date</th>
                  </tr>
                </thead>
                <tbody>
                  <tr v-for="(issues, index) in dataRecieved" :key="index">
                    <td>
                      {{ issues.id }}
                    </td>
                    <td>
                      <div class="item-title">
                        <p>{{ issues.fullname }}</p>
                      </div>
                    </td>
                    <td>
                      <p>{{ issues.phonenumber }}</p>
                    </td>
                    <td>
                      <p>{{ issues.email }}</p>
                    </td>
                    <td>
                      <p>{{ issues.subject }}</p>
                    </td>
                    <td>
                      <p>{{ issues.message }}</p>
                    </td>
                    <td>
                      <p>{{ issues.created_at }}</p>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
            <div v-if="!projectIssue?.length">
              <NoRecordFound />
            </div>
          </div>
        </div>
      </div>
    </div>
    <FrontFooter></FrontFooter>
  </div>
</template>
