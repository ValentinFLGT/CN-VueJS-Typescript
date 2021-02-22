<template>
  <h2>Délai avant rafraichissement : {{ count }}</h2>
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
    const store = useStore()

    function timer() {
      store.commit('decrement')
    }

    setInterval(timer, 1000)


    function refreshData() {
      store.commit('emptyCitiesWeather')
      store.commit('loadCitiesWeather')
      store.commit('refreshTimer')
    }

    // 300k ms stand for 5 minutes
    setInterval(refreshData, 300000)

    store.commit('loadCitiesWeather')
    return {cityWeather: store.state.cityWeather}
  },
  computed: {
    ...mapState(['count']),
    ...mapState(['loadCitiesWeather'])
  }
})
</script>

<style scoped>
h1 {
  margin: 40px 0 0;
}
</style>
