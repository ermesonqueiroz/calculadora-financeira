<script setup lang="ts">
import { ListboxOption } from '@headlessui/vue';
import { PhCheck } from '@phosphor-icons/vue';
</script>

<template>
  <ListboxOption
    v-slot="{ active, selected }"
    as="template"
  >
    <li
      :class="[
        active ? 'bg-gray-200' : '',
        'relative cursor-default select-none py-2 pl-10 pr-4',
      ]"
    >
      <span
        :class="[
          selected ? 'font-medium' : 'font-normal',
          'block truncate',
        ]"
      >
        <slot></slot>
      </span>
      <span
        v-if="selected"
        class="absolute inset-y-0 left-0 flex items-center pl-3 text-zinc-700"
      >
        <PhCheck class="h-5 w-5" aria-hidden="true" />
      </span>
    </li>
  </ListboxOption>
</template>