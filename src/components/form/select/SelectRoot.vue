<script setup lang="ts">
import { Listbox } from '@headlessui/vue';

const model = defineModel<string | number | boolean | object | null>();
</script>

<template>
  <Listbox v-model="model">
    <div class="relative">
      <slot></slot>
    </div>
  </Listbox>
</template>