import { computed, onScopeDispose } from "vue";
import { ref, reactive, effectScope } from "vue";

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

function createSharedRefDictionary(createRef) {
  const dictionary = new Map();
  return (key, ...args) => {
    if (!dictionary.has(key)) {
      const scope = effectScope(true);
      const memory = {
        scope,
        subscribers: 0,
        value: scope.run(() => createRef(key, ...args)),
      };
      dictionary.set(key, memory);
    }
    dictionary.get(key).subscribers++;
    onScopeDispose(() => {
      if (dictionary.has(key)) {
        const memory = dictionary.get(key);
        memory.subscribers--;
        if (!memory.subscribers) {
          memory.scope.stop();
          dictionary.delete(key);
        }
      }
    });

    return dictionary.get(key).value;
  };
}

export const useSleepStatus = createSharedRefDictionary((type) =>
  computed(() => ANIMAL_SLEEP_STATUS[type][currentTime.value])
);

let animalId = 0;
export function createAnimal(type) {
  const id = animalId++;
  ANIMALS[id] = { id, type };
}
export function deleteAnimal(id) {
  delete ANIMALS[id];
}
