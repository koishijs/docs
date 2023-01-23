<script setup>
import {ref, computed, onUnmounted} from 'vue'
const props = defineProps({
  value: {
    type: String,
    default: '',
    required: false,
  },
  delay: {
    type: Number,
    default: 200,
    required: false,
  },
})

const emit = defineEmits(["change", "reset"]);

const inputBox = ref(null)
const timerId = ref(null)
const localQuery = ref(props.value)
const query = computed({
  get() {
    return localQuery.value
  },
  set(val) {
    localQuery.value = val
    if (timerId.value) {
      clearTimeout(timerId.value)
    }
    timerId.value = setTimeout(() => {
      emit('change', localQuery.value);
    }, props.delay)
  }
})

onUnmounted(() => {
  if (timerId.value) {
    clearTimeout(timerId.value)
  }
})

defineExpose({
  focus: () => inputBox.value?.focus(),
});
</script>

<template>
  <input type="search" v-model="query" ref="inputBox" @keydown.esc="emit('reset')" />
</template>
