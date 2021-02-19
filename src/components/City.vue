<template>
  <div>
    <h2>{{ name }}</h2>
    <p>Temps : {{ weather }} - Température : {{ temperature }}°C</p>
    <p><em>Dernière mise à jour : {{ currentDateTime() }}</em></p>
    <p>{{count}}</p>
  </div>
</template>

<script lang="ts">

import {defineComponent} from "vue";
import moment from 'moment';
import {useStore} from "@/store";

export default defineComponent({
  name: 'City',
  props: {
    name: String,
    weather: String,
    temperature: Number,
    updatedAt: Date
  },
  methods: {
    currentDateTime() {
      return moment(this.updatedAt).fromNow();
    }
  },
  setup() {
    const store = useStore()
    store.commit('increment')
    return { count: store.state.count}
  }
})
</script>

<style scoped>
h1 {
  margin: 40px 0 0;
}
</style>
