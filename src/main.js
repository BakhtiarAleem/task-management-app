import { createApp } from 'vue'
import '././assets/styles/main.scss'
import App from './App.vue'
import router from '././router'
import 'vue3-easy-data-table/dist/style.css';


createApp(App).use(router).mount('#app')