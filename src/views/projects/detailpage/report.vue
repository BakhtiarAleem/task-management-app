<script setup>
import { ref, onMounted, computed, watch, nextTick } from "vue";
import BlockLoader from "/src/components/BlockLoader.vue";
import store from "/store";
import { useRoute } from 'vue-router';
const route = useRoute();
import VueDatePicker from '@vuepic/vue-datepicker';
import '@vuepic/vue-datepicker/dist/main.css'

const projectid = ref(route.params.id);

const startDate = ref();
const cusStartDate = ref();
const endDate = ref();
const cusEndDate = ref();
const isLoading = ref(false);
const reportData = ref(store.state.reportGenerated);
const reportLabel = ref();
const chartData = ref(false);


const options = ref({
    labels: [],
    responsive: [
    {
      breakpoint: 1000,
      options: {
        plotOptions: {
          bar: {
            horizontal: false
          }
        },
        legend: {
          position: "bottom"
        }
      }
    }
  ]
  });

  const formatStartDate = (date) => {
    const day = date.getDate();
    const month = date.getMonth() + 1;
    const year = date.getFullYear();
    startDate.value = `${month}/${day}/${year}`;
}

const formatEndtDate = (date) => {
    const day = date.getDate();
  const month = date.getMonth() + 1;
  const year = date.getFullYear();
    endDate.value =  `${month}/${day}/${year}`;
}
const series =  ref([44, 55, 41, 17, 15]);

async function generateReport(val) {
    val.preventDefault(); 
    chartData.value = false;
    isLoading.value = true;
    let dateReport = {
        startDate: startDate.value,
        endDate: endDate.value,
        projectSelected: projectid.value,
    }
    await store.dispatch('generateReport', dateReport).then((e) => {   
        setTimeout(() => {
            reportData.value = e
            reportLabel.value = Object.keys(reportData?.value)
            const mappedArray = Object.entries(reportData.value).map(([key, value]) => {
                return value.length;
            });         
            options.value.labels = reportLabel.value
            series.value = mappedArray
            isLoading.value = false;
            chartData.value = true;
        }, 2000)

    })
}

watch(reportData, (currentValue) => {
    if(currentValue){
        return currentValue
    }
    });

onMounted(() => {
    // members();
})
</script>

<template>
  <div>
    <div class="project-detail-page-title mb-4">
    <div class="report-flex-title">
      <div class="title-icon">
        <i class="icon-Report"></i>
      </div>
      <h3>Reports</h3>
    </div>
      <div class="add-issues filter-report">
        <div class="row">
            <div class="col-md-12">
                <div class="report-filter">
                    <form @submit="generateReport">
                    <div class="row">
                        <div class="col-md-4">
                            <div class="form-group relative">
                                <label>Start Date</label>
                                <div class="date-show" v-if="startDate">
                                    {{ startDate }}
                                </div>
                                <VueDatePicker :format="formatStartDate" v-model="startDate"></VueDatePicker>
                            </div>
                        </div>
                        <div class="col-md-4">
                            <div class="form-group relative">
                                <label>End Date</label>
                                <div class="date-show" v-if="endDate">
                                    {{ endDate }}
                                </div>
                                <VueDatePicker :format="formatEndtDate" v-model="endDate"></VueDatePicker>
                            </div>
                        </div>
                        <div class="col-md-4">
                            <label class="hidden">Generate Report</label>
                            <button
                                class="btn btn-primary mr-4"
                                type="submit"
                                >
                                <i class="icon-Report"></i><span>Generate</span>
                            </button>
                        </div>
                    </div>
                </form>
                </div>
            </div>
        </div>
      </div>
    </div>
    <BlockLoader class="loader-page-block" v-if="isLoading" /> 
   
    <div v-if="!isLoading" class="report-data">
        <div v-if="chartData" class="generate-chart">
            <div class="row">
                <div class="col-md-12">
                    <h5 class="mb-4 mt-4">Issues From {{ startDate }} to {{ endDate }}</h5>
                </div>
                    <div class="col-md-6 col-sm-12">
                        <div class="card card-listing">
                            <apexchart type="donut" :options="options" :series="series"></apexchart>
                        </div>
                    </div>
            </div>
        </div>
       <div v-if="!chartData" class="generate-chart-placeholder">
            <div class="row">
                <div class="col-md-12">
                    <div class="card card-listing">
                        <i class="icon-Report"></i>
                        <h2>No Chart Generated</h2>
                    </div>
                </div>
            </div>
        </div>
    </div>
  </div>
</template>
<style scoped>
.form-group.relative {
    position: relative;
}
.date-show {
    position: absolute;
    z-index: 1;
    padding-left: 40px;
    bottom: 9px;
    font-weight: 600;
}
</style>