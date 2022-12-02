<script>
import Animal from "./components/Animal.vue";
import { toggleCurrentTime, currentTime, ANIMALS, createAnimal } from "./store";

export default {
  components: { Animal },
  setup() {
    return {
      toggleCurrentTime,
      currentTime,
      ANIMALS,
      createAnimal,
    };
  },
};
</script>

<template>
  <main>
    <button
      :style="{ backgroundColor: currentTime === 'day' ? 'yellow' : 'black' }"
      @click="toggleCurrentTime"
    >
      {{ currentTime === "day" ? "Go to night" : "Go to day" }}
    </button>
    <h1>Animal Shelter</h1>
    <div style="{display: 'flex', marginBottom: '12px'}">
      <button @click="createAnimal('cat')">Create a cat</button>
      <button @click="createAnimal('dog')">Create a dog</button>
      <button @click="createAnimal('owl')">Create an owl</button>
    </div>
    <div class="animals" v-for="animal in ANIMALS" :key="animal.id">
      <Animal :animal="animal"></Animal>
    </div>
  </main>
</template>

<style scoped>
.animals {
  display: flex;
  flex-direction: column;
}
.animals > *:not(:first-child) {
  margin-top: 12px;
}
</style>
