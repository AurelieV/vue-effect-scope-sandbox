<template>
  <div @click="onClick" class="tab" :class="{ '-selected': isSelected }">
    <custom-tab-children :id="id" :label="label" :isSelected="isSelected"></custom-tab-children>
  </div>
</template>

<script>
import { computed } from "vue";
import { selectedId } from "/src/store.js";
import CustomTabChildren from "./CustomTabChildren.vue";

const getRandomColor = () => {
  const letters = "0123456789ABCDEF";
  let color = "#";
  for (let i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
};

export default {
  components: { CustomTabChildren },
  props: {
    id: { type: Number, required: true },
    label: { type: String, required: true },
  },
  componenents: [CustomTabChildren],
  setup(props) {
    return {
      selectedId,
      isSelected: computed(() => selectedId.value === props.id),
      getRandomColor,
    };
  },
  methods: {
    onClick() {
      this.selectedId = this.id;
    },
  },
};
</script>

<style>
.tab {
  padding: 12px;
  border: 1px solid black;
  cursor: pointer;
}
.tab.-selected {
  font-weight: bold;
}
</style>
