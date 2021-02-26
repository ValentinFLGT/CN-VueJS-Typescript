<template>
  <div id="app">
    <header id="app_header">
      <img src="./assets/logo-cn.png" alt="Logo Campus Numérique">
      <div>
        <router-link to="/villes">Liste</router-link>
        <router-link to="/carte">Carte</router-link>
      </div>
    </header>
    <router-view></router-view>
  </div>
</template>

<script lang="ts">
import {defineComponent, onMounted} from "vue";
import {useStore} from "@/store";


export default defineComponent({
  name: 'App',
  setup() {
    const store = useStore()
    store.commit('initialiseStore')
    onMounted(() => {
      store.subscribe((mutation, state) => {
        localStorage.setItem('store', JSON.stringify(state))
      })
      store.dispatch('loadCityWeatherDataAsync')
      store.dispatch('countdownAsync')
    })
  }
})
</script>

<style lang="scss">
@import "scss/globalStyle";

html, body {
  margin: 0;
  padding: 0;
}

#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: $app-color;
}

#app_header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  background-color: #262626;
  padding-right: 20px;
}

#app_header img {
  height: 80px;
  padding: 20px;
}

#app_header a {
  color: white;
  text-transform: uppercase;
  padding: 20px;
  text-decoration: none;
}

#map {
  width: 100%;
  height: 500px;
}

#map .marker {
  width: 50px;
  height: auto;
  cursor: pointer;
}
</style>
