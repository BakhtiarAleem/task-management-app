<script setup>
const props = defineProps({
anchorClass: {
    type: String, // User[]?
  },
  anchorLink: {
    type: String, // User[]?
  },
})
</script>


<template>
    <div class="logo">
        <router-link :class="anchorClass" to="/">
            <img src="src/assets/images/logo.png" />
        </router-link>
    </div>
</template>
