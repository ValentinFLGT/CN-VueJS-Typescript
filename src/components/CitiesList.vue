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
  computed: {
    formatSecondsInMinute() {
      const store = useStore()
      if (store.state.countdown > 60) {
        // Divide by 60 to round seconds in minutes then modulo to find the remaining seconds
        return `0${Math.floor(store.state.countdown / 60)} m : ${store.state.countdown % 60} s`
      } else {
        return `${store.state.countdown} s`; // Return basic timer if no minutes
      }
    },

    ...mapState(['cityWeather']),
    ...mapState(['countdown'])
  }
})
</script>

<style scoped>
h1 {
  margin: 40px 0 0;
}
</style>
