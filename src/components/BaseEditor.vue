<script setup>
import { ref, onMounted, computed, watch } from 'vue'
import { QuillEditor } from '@vueup/vue-quill'
import '@vueup/vue-quill/dist/vue-quill.snow.css';

const value = ref();


watch(value, (currentValue) => {
 return currentValue
    });

</script>

<template>
    <div>
        <QuillEditor v-model:content="value" contentType="html" />
    </div>

  </template>