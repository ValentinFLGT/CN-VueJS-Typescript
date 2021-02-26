<template>
  <select v-model="temperature">
    <option v-for="temperature of options" :key="temperature.id" :value="temperature.value">
      {{ temperature.value }} °C
    </option>
  </select>
</template>

<script lang="ts">
import {defineComponent, onUpdated, ref} from "vue";
import {useStore} from '@/store';

export default defineComponent({
  name: "TemperatureForm",
  data() {
    return {
      options: [
        {id: 1, value: 0},
        {id: 2, value: 1},
        {id: 3, value: 2},
        {id: 4, value: 3},
        {id: 4, value: 4},
        {id: 4, value: 5},
        {id: 4, value: 6},
        {id: 4, value: 7},
        {id: 4, value: 8},
        {id: 4, value: 9},
        {id: 4, value: 10},
        {id: 4, value: 11},
        {id: 4, value: 12},
        {id: 4, value: 13},
        {id: 4, value: 14},
        {id: 4, value: 15},
        {id: 4, value: 20}
      ]
    }
  },
  setup() {
    const store = useStore();
    const temperature = ref(0);
    onUpdated(() => {
      store.commit('updateTemperature', temperature.value)
    })
    return {temperature}
  },
})
</script>

<style scoped>

</style>