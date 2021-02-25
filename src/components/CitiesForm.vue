<template>
  <div id="v-model-select" class="demo">
    <select v-model="selectedCity">
      <option v-for="city of cityWeather" :key="city.index" :value="city">{{ city.name }}</option>
    </select>
    <city v-if="selectedCity" :name="selectedCity.name" :weather="selectedCity.weather"
          :temperature="selectedCity.temperature" :updated-at="selectedCity.updatedAt"></city>
  </div>
</template>

<script lang="ts">
import {defineComponent, onUpdated} from "vue";
import {mapState} from "vuex";
import City from "@/components/City.vue";
import {useStore} from "@/store";

export default defineComponent({
  name: "CitiesForm",
  components: {City},
  data() {
    return {
      selectedCity: ''
    }
  },
  setup() {
    const store = useStore()
    onUpdated(() => {
      store.dispatch('loadSelectedCitiesDataAsync')
    })
  },
  computed: {
    ...mapState(['cityWeather']),
    ...mapState(['selectedCities'])
  }
})
</script>

<style scoped>

.demo {
  font-family: sans-serif;
  border: 1px solid #eee;
  border-radius: 2px;
  padding: 20px 30px;
  margin-top: 1em;
  margin-bottom: 40px;
  user-select: none;
  overflow-x: auto;
}

</style>