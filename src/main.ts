import { createApp } from 'vue';
import { index, key} from "@/store";
import App from './App.vue'
import router from "@/router";

createApp(App).use(router).use(index, key).mount('#app');