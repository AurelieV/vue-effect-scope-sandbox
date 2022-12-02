import { computed } from "vue";
import { ref, reactive } from "vue";

export const selectedId = ref(0);
export const currentTime = ref("day");
export function toggleCurrentTime() {
  currentTime.value = currentTime.value === "day" ? "night" : "day";
}

export const ANIMAL_SLEEP_STATUS = {
  cat: { day: true, night: true },
  dog: { day: false, night: true },
  owl: { day: true, night: false },
};
export const ANIMALS = reactive({});

const isAnimalSleeping = reactive(new Map());

export function useSleepStatus(type) {
  if (!isAnimalSleeping.has(type)) {
    isAnimalSleeping.set(
      type,
      computed(() => ANIMAL_SLEEP_STATUS[type][currentTime.value])
    );
  }
  return isAnimalSleeping.get(type);
}

let animalId = 0;
export function createAnimal(type) {
  const id = animalId++;
  ANIMALS[id] = { id, type };
}
export function deleteAnimal(id) {
  delete ANIMALS[id];
}
