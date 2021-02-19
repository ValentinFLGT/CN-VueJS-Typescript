<template>
  <div>
    <h1>Liste des villes</h1>
    <City v-for="city of cityWeather" :key="city.id" :name="city.name" :weather="city.weather"
          :temperature="city.temperature" :updated-at="city.updatedAt"></City>
  </div>
</template>

<script lang="ts">
import {defineComponent} from "vue";
import City from "@/components/City.vue";
import {useStore} from "@/store";

export default defineComponent({
  name: 'CitiesList',
  components: {
    City
  },
  setup() {
    const store = useStore()
    store.commit('loadCities')
    return {cityWeather: store.state.cityWeather}
  }
})
</script>

<style scoped>
h1 {
  margin: 40px 0 0;
}
</style>
