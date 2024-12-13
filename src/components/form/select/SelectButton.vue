<script setup lang="ts">
import { ListboxButton } from '@headlessui/vue';
import { PhCaretDown } from '@phosphor-icons/vue';
</script>

<template>
  <div class="border rounded-sm border-gray-300">
    <ListboxButton class="h-10 w-full px-3 rounded-sm bg-white text-left placeholder:text-gray-400 relative">
      <span class="block truncate">
        <slot></slot>
      </span>
      <span
        class="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2"
      >
        <PhCaretDown class="h-5 w-5 text-gray-400" aria-hidden="true" />
      </span>
    </ListboxButton>
  </div>
</template>