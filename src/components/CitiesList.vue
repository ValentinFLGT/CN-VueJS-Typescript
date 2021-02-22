<template>
  <h2>Rafraîchissement automatique : {{ formatSecondsInMinute }}</h2>
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
import {mapState} from "vuex";

export default defineComponent({
  name: 'CitiesList',
  components: {
    City
  },
  setup() {

    // Avant de faire un appel axios, regarder les data du localStorage et initialiser le store avec ça et ensuite si c'est périmé faire un appel axios

    const store = useStore()

    store.dispatch('axiosRequest')
    store.dispatch('countdown')
    store.dispatch('refreshData')


    return {cityWeather: store.state.cityWeather}
  },
  computed: {

    formatSecondsInMinute(){
      const store = useStore()
      if(store.state.count > 60){
        // Divide by 60 to round seconds in minutes then modulo to find the remaining seconds
        return `0${Math.floor(store.state.count / 60)} m : ${store.state.count % 60} s`
      } else {
        return `${store.state.count} s`; // Return basic timer if no minutes
      }
    },

    ...mapState(['loadCitiesWeather'])
  }
})
</script>

<style scoped>
h1 {
  margin: 40px 0 0;
}
</style>
