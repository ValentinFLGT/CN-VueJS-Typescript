import { createWebHistory, createRouter } from "vue-router";
import EasterEgg from "@/components/EasterEgg.vue";
import City from "@/components/City.vue";
import CitiesList from "@/components/CitiesList.vue";
import CitiesMap from  "@/components/CitiesMap.vue";

const routes = [
  { path: '/', component: EasterEgg},
  { path: '/ville', component: City},
  { path: '/villes', component: CitiesList},
  { path: '/carte', component: CitiesMap}
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;