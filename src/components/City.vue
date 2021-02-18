<template>
  <div>
    <h2>{{ name }}</h2>
    <p>Temps : {{ weather }} - Température : {{ temperature }}°C</p>
    <p><em>Dernière mise à jour : {{ updatedAt }}</em></p>
  </div>
</template>

<script lang="ts">

import { defineComponent } from "vue";

export default defineComponent({
  name: 'City',
  props: {
    name: String,
    weather: String,
    temperature: Number,
    updatedAt: Date
  }
})


</script>

<style scoped>
h1 {
  margin: 40px 0 0;
}
</style>
