import { createApp } from 'vue';
import { index, key} from "@/store";
import App from './App.vue'
import router from "@/router";
import i18n from "@/plugin/i18n"

createApp(App).use(router).use(index, key).use(i18n).mount('#app');