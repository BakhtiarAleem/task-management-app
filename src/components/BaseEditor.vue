<script setup>
import { ref, onMounted, computed, watch } from 'vue'
import { QuillEditor } from '@vueup/vue-quill'
import '@vueup/vue-quill/dist/vue-quill.snow.css';

const value = ref();
const oncha = ref();
const emit = defineEmits(['value'])


watch(value, (currentValue) => {
    emit('value', currentValue)
});

</script>

<template>
    <div>
        <QuillEditor v-model:content="value" @change="onChange($event)" contentType="html" />
    </div>

  </template>