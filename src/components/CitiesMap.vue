<template>
  <div>
    <h1>Carte des villes</h1>
    <div id="map"/>
  </div>
</template>

<script lang="js">
import mapboxgl from "mapbox-gl";
import "mapbox-gl/dist/mapbox-gl.css";
import {onMounted} from "vue";
import axios from "axios";
import {defineComponent} from "vue";

export default defineComponent({
  name: 'CitiesMap',
  setup() {
    onMounted(() => {
      mapboxgl.accessToken =
          "pk.eyJ1Ijoic29uaWFjbiIsImEiOiJja2w5aHB0amIwOW9nMm9vb2JkODBoOWpkIn0.OzS_BnyJucJStUhfvnaFcA";
      const map = new mapboxgl.Map({
        container: "map",
        style: "https://maps.hotentic.com/styles/isere/style.json",
        center: [process.env.VUE_APP_DEFAULT_LONGITUDE, process.env.VUE_APP_DEFAULT_LATITUDE],
        zoom: 10,
      });
      map.on('load', () => {
        const mapboxgl = require('mapbox-gl/dist/mapbox-gl');
        let cities = [];
        axios
            .get('https://api.openweathermap.org/data/2.5/find?lat=' + process.env.VUE_APP_DEFAULT_LATITUDE + '&lon=' + process.env.VUE_APP_DEFAULT_LONGITUDE + '&cnt=20&cluster=yes&lang=fr&units=metric&APPID=' + process.env.VUE_APP_OW_APP_ID)
            .then((citiesData) => {
              for (const {
                name,
                coord: {lat, lon},
                weather: [{description: weather, icon: icon}],
                main: {temp: temperature},
                dt: updatedAt
              } of citiesData.data.list) {
                cities.push({name, lat, lon, weather, icon, temperature, updatedAt: new Date(updatedAt * 1000)});
              }
              cities.forEach(city => {
                let el = document.createElement('img');
                el.src = `https://openweathermap.org/img/wn/${city.icon}@2x.png`;
                el.classList.add('marker');
                el.title = `${city.name} - ${city.temperature}°C`;
                new mapboxgl.Marker(el)
                    .setLngLat([city.lon, city.lat])
                    .addTo(map);
              });
            });
      });
    });
    return {};
  },
})
</script>

<style scoped>
h1 {
  margin: 40px 0 0;
}

</style>
