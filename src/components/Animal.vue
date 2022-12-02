<template>
  <div class="animal">
    <div
      :style="
        isSleeping
          ? { backgroundColor: 'black', color: 'white', padding: '12px' }
          : { opacity: 0, padding: '12px' }
      "
    >
      Zzzz
    </div>
    <div :style="{ flex: 1, marginLeft: '8px', marginRight: '8px' }">
      {{ animal.type }} {{ animal.id }}
    </div>
    <button @click="onDelete">Delete</button>
  </div>
</template>

<script>
import { deleteAnimal, useSleepStatus } from "../store";
export default {
  props: { animal: { type: Object, required: true } },
  setup(props) {
    return {
      isSleeping: useSleepStatus(props.animal.type),
    };
  },
  methods: {
    onDelete() {
      deleteAnimal(this.animal.id);
    },
  },
};
</script>

<style scoped>
.animal {
  border: 1px solid black;
  position: relative;
  border-radius: 8px;
  padding: 16px 8px;
  display: flex;
  align-items: center;
}
</style>
