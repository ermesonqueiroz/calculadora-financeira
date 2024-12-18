<script setup lang="ts">
import { Listbox } from '@headlessui/vue';

const model = defineModel<string | number | boolean | object | null>();
const props = defineProps({
  class: {
    required: false,
    type: String
  }
})
</script>

<template>
  <Listbox v-model="model">
    <div :class="['relative', props?.class]">
      <slot></slot>
    </div>
  </Listbox>
</template>