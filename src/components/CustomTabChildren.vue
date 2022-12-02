<template>
  <div :style="{ color: getRandomColor() }">
    {{ label }}
    <span v-if="isSelected">POUET</span>
  </div>
</template>

<script>
import { computed } from "vue";
import { selectedId } from "/src/store.js";

const getRandomColor = () => {
  const letters = "0123456789ABCDEF";
  let color = "#";
  for (let i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
};

export default {
  props: {
    id: { type: Number, required: true },
    label: { type: String, required: true },
    isSelected: {}
  },
  setup(props) {
    return {
    //   isSelected: computed(() => selectedId.value === props.id),
      getRandomColor,
      selectedId
    };
  },
};
</script>
