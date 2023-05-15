<script setup>
import { ref, onMounted } from 'vue'
const optionsSelect = ref([
    {
        value: null,
        text: 'Select organization diagnostics category',
    },
    {
        value: 1,
        text: 'Internet Services',
    },
    {
        value: 2,
        text: 'Marketing & Sales',
    },
]);

const props = defineProps({
  popup: Boolean
})

const emit = defineEmits(['close'])

</script>




<template>
<div class="modal fade" :class="popup ? 'show' : ''" tabindex="-1">
  <div class="modal-dialog">
    <div class="modal-content">
        <div class="modal-header">
            <h5 class="modal-title">Add Organization</h5>
            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
        </div>
            <div class="modal-body">
                <div class="modal-content-area">
                    <div class="form-group">
                        <label>Name</label>
                        <b-form-input
                            type="text"
                            placeholder="Enter company / organization name"
                        />
                    </div>

                    <div class="form-group">
                        <base-select-box
                            labelText="Diagnostics category"
                            :options="optionsSelect"
                        ></base-select-box>
                    </div>

                    <div class="form-group">
                        <label>Short bio</label>
                        <b-form-textarea
                            placeholder="Write short description about organization"
                        />
                    </div>

                    <base-upload-picture
                        uploadLabel="Organization logo"
                        uploadContent="Click here to upload team logo or icon"
                    >
                    </base-upload-picture>
                </div>
            </div>
            <div class="modal-footer">
                <button @click="emit('close', false)" class="btn btn-danger">Cancel</button>

                <button @click="emit('close', false)" class="btn btn-primary">Submit</button>
            </div>
        </div>
    </div>
</div>

</template>

