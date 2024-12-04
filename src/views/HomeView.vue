<script setup lang="ts">
import { PhBank, PhHandCoins } from "@phosphor-icons/vue";
import { useHead } from "@unhead/vue";
import { RouterLink } from "vue-router";

useHead({
  title: "Calculadoras - Tools Invest",
});

const items = [
  {
    icon: PhBank,
    title: "Correção pela Inflação",
    description:
      "Calcule a correção de valores pela inflação, aplicando o índice IPCA para o período desejado.",
    link: "/correcao-de-valor-pela-inflacao",
  },
  {
    icon: PhHandCoins,
    title: "Fórmula de Graham",
    description:
      "Calcule o valor intrínseco de uma ação usando a famosa fórmula de Benjamin Graham, para avaliar seu potencial de investimento.",
    link: "/formula-de-graham",
  },
];
</script>

<template>
  <div class="mx-auto px-10 xl:px-0 space-y-16 max-w-screen-lg mt-4 mb-20">
    <main class="space-y-6">
      <div>
        <h1 class="text-3xl font-bold">Calculadoras</h1>
        <p>
          Essas calculadoras têm o objetivo de otimizar seu tempo e otimizar o
          seu processo de tomada de decisão.
        </p>
      </div>

      <div class="grid grid-cols-2 gap-4">
        <RouterLink
          v-for="item in items"
          :key="item.title"
          :to="item.link"
          class="border p-6 border-gray-200 rounded-sm flex gap-6 items-center hover:border-gray-400 transition-colors"
        >
          <div>
            <component :is="item.icon" :size="40" />
          </div>
          <div>
            <h2 class="text-xl font-bold leading-tight">{{ item.title }}</h2>
            <p class="text-sm">{{ item.description }}</p>
          </div>
        </RouterLink>
      </div>
    </main>
  </div>
</template>
