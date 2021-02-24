<template>
  <div id="v-model-select" class="demo">
    <select v-model="selected" multiple>
      <option v-for="city of cityWeather" :value="city.name">{{city.name}}</option>
    </select>
    <br/>
    <br/>
    <span>Selected: {{ selected }}</span>
  </div>
</template>

<script lang="ts">
import {defineComponent} from "vue";
import {mapState} from "vuex";

export default defineComponent({
  name: "CitiesForm",
  data() {
    return {
      selected: ''
    }
  },
  computed: {
    ...mapState(['cityWeather']),
    ...mapState(['countdown'])
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