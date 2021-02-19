import { createApp } from 'vue';
import { store, key} from "@/store/store";
import App from './App.vue'
import router from "@/router";

createApp(App).use(router).use(store, key).mount('#app');