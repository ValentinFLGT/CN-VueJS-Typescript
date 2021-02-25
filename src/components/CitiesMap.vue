<template>
  <div style="height: 75vh; width: 100vw;">
    <l-map
        v-model="zoom"
        v-model:zoom="zoom"
        :center="[45.899247, 6.129384]"
    >
      <l-tile-layer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      ></l-tile-layer>

      <l-marker v-for="city in cityWeather" :lat-lng="[city.lat, city.lon]" :key="city.name">
        <l-icon :icon-url="`https://openweathermap.org/img/wn/${city.icon}.png`" :icon-size="iconSize"/>
      </l-marker>
    </l-map>
  </div>
  <h2>Rafraîchissement automatique : {{ formatSecondsInMinute }}</h2>
</template>

<script lang="ts">
import {
  LMap,
  LTileLayer,
  LMarker,
  LIcon,
} from "@vue-leaflet/vue-leaflet";
import "leaflet/dist/leaflet.css";
import {defineComponent} from "vue";
import {useStore} from '@/store';
import {mapState} from "vuex";

export default defineComponent({
  name: 'CitiesMap',
  components: {
    LMap,
    LTileLayer,
    LMarker,
    LIcon,
  },
  data() {
    return {
      zoom: 12,
    }
  },
  computed: {
    iconSize() {
      return [50, 50];
    },

    formatSecondsInMinute() {
      const store = useStore()
      if (store.state.countdown > 60) {
        // Divide by 60 to round seconds in minutes then modulo to find the remaining seconds
        return `0${Math.floor(store.state.countdown / 60)} m : ${store.state.countdown % 60} s`
      } else {
        return `${store.state.countdown} s`; // Return basic timer if no minutes
      }
    },

    ...mapState(['cityWeather'])
  }
})
</script>

<style scoped>
h1 {
  margin: 40px 0 0;
}

h4 {
  position: absolute;
  margin: 50px;
}
</style>
