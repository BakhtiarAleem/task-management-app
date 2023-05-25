<script setup>
import { ref } from 'vue'
const props = defineProps({
    image: String,
    name: String,
    type: String,
})
function imageUrl(url) {
    // return ''+ import.meta.env.VITE_SUPABASE_URL + '/storage/v1/object/public/project/' + url
    return ''+ import.meta.env.VITE_SUPABASE_URL + '/storage/v1/object/public/project/Lever'
}
</script>

<template>
    <div class="detail-sidebar">
        <div class="container">
            <div class="project-selected">
                <div
                    class="project-logo">                   
                    <div class="image-section">
                        <img
                            :src="imageUrl(image)"/>
                    </div>                  
                </div>
                <div class="project-details">
                    <h4>Lever</h4>
                    <h5>Web Development</h5>
                </div>
                <div class="navigation">
                    <ul>
                        <li>
                            <router-link to="/organizations">
                                <i class="icon-final-ico"></i>
                                <span>BackLog</span>
                            </router-link>
                        </li>
                        <li>
                            <router-link to="/organizations">
                                <i class="icon-business-bag"></i>
                                <span>Issues</span>
                            </router-link>
                        </li>
                        <li>
                            <router-link to="/organizations">
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