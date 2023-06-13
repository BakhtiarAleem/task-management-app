<script setup>
import { ref, onMounted, computed, watch } from 'vue'
import Multiselect from '@vueform/multiselect'

const props = defineProps({
    assignTaskOption: Array,
})
const value = ref();
const emit = defineEmits(['value'])

watch(value, (currentValue) => {
    emit('value', currentValue)
});


</script>


<template>
    <div v-if="props.assignTaskOption">
      <Multiselect
        v-model="value"
        :options="props.assignTaskOption"
        placeholder="Select User to Assign"
        label="username"
      >
        <template v-slot:singlelabel="{ value }">
            <div class="multiselect-single-label">
            <img class="character-label-icon" :src="value.icon"> {{ value.username }}
            </div>
        </template>

        <template v-slot:option="{ option }">
            <img class="character-option-icon" :src="option.icon"> {{ option.username }}
        </template>
      </Multiselect>
    </div>
  </template>
  
  <style src="@vueform/multiselect/themes/default.css"></style>