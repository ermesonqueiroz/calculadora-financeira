<script setup lang="ts">
import { PhBank, PhChartLineUp, PhHandCoins } from "@phosphor-icons/vue";
import { useHead } from "@unhead/vue";
import { RouterLink } from "vue-router";

defineOptions({
  name: "HomePage",
});

useHead({
  title: "Calculadoras - Tools Invest",
  meta: [
    {
      name: 'description',
      content: 'Simule investimentos com juros compostos, corrija valores pela inflação e muito mais!'
    },
    {
      name: 'keywords',
      content: 'calculadora inflação, correção monetária, IPCA, atualização de valores, índice de preços, cálculo inflação, correção pela inflação, inflação Brasil, IPCA mensal, Banco Central, IBGE'
    }
  ],
  script: [
    {
      hid: 'json-ld',
      type: 'application/ld+json',
      textContent: JSON.stringify({
        "@context": "https://schema.org",
        "@type": "ItemList",
        "name": "Calculadoras Financeiras",
        "itemListElement": [
          {
            "@type": "ListItem",
            "position": 1,
            "name": "Calculadora de Juros Compostos",
            "url": "https://toolsinvest.com.br/juros-compostos"
          },
          {
            "@type": "ListItem",
            "position": 2,
            "name": "Correção de Valores pela Inflação",
            "url": "https://toolsinvest.com.br/correcao-de-valor-pela-inflacao"
          },
          {
            "@type": "ListItem",
            "position": 3,
            "name": "Fórmula de Graham",
            "url": "https://toolsinvest.com.br/formula-de-graham"
          }
        ]
      })
    }
  ]
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
      "Calcule o valor intrínseco de uma ação usando a famosa fórmula de Benjamin Graham.",
    link: "/formula-de-graham",
  },
  {
    icon: PhChartLineUp,
    title: "Juros Compostos",
    description:
      "Descubra quanto seu dinheiro pode crescer ao longo do tempo com Juros Compostos.",
    link: "/juros-compostos",
  },
];
</script>

<template>
  <main class="mx-auto px-10 xl:px-0 space-y-6 max-w-screen-lg mt-4 mb-20">
    <header>
      <h1 class="text-3xl font-bold">Calculadoras</h1>
      <p>
        Essas calculadoras têm o objetivo de otimizar seu tempo e otimizar o seu
        processo de tomada de decisão.
      </p>
    </header>
    <div>
      <div class="grid grid-cols-1 grid-rows- lg:grid-cols-2 gap-4">
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
            <h2 class="text-xl font-bold">{{ item.title }}</h2>
            <p class="text-sm">{{ item.description }}</p>
          </div>
        </RouterLink>
      </div>
    </div>
  </main>
</template>
