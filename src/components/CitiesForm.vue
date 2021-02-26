<template>
  <div style="margin-top: 1em;">
    <select v-model="selectedCity">
      <option v-for="city of cityWeather" :key="city.index" :value="city">{{ city.name }}</option>
    </select>
    <temperature-form/>
  </div>
  <city v-if="selectedCity.name" :name="selectedCity.name" :weather="selectedCity.weather"
        :temperature="selectedCity.temperature" :updated-at="selectedCity.updatedAt"></city>
</template>

<script lang="ts">
import {defineComponent, onUpdated, ref} from "vue";
import {mapState} from "vuex";
import City from "@/components/City.vue";
import {useStore} from "@/store";
import TemperatureForm from "@/components/TemperatureForm.vue";

export default defineComponent({
  name: "CitiesForm",
  components: {TemperatureForm, City},
  setup() {
    const store = useStore()
    const selectedCity = ref({})
    onUpdated(() => {
      store.dispatch('loadSelectedCitiesDataAsync', selectedCity.value)
    })
    return {selectedCity}
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