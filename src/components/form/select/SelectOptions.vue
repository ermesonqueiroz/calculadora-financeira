<script setup lang="ts">
import { ListboxOptions } from '@headlessui/vue';
</script>

<template>
  <ListboxOptions
    class="absolute w-full mt-1 max-h-60 overflow-auto rounded-sm bg-white py-1 text-base border border-gray-300 z-10"
  >
    <slot></slot>
  </ListboxOptions>
</template>