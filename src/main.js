import { createApp } from 'vue'
import '././assets/styles/main.scss'
import App from './App.vue'
import router from '././router'
import FloatingVue from 'floating-vue'
import VueLazyLoad from 'vue3-lazyload'
import 'floating-vue/dist/style.css'

createApp(App).use(router).use(FloatingVue).use(VueLazyLoad).mount('#app')