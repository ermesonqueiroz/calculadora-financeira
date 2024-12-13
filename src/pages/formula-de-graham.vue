<script setup lang="ts">
import { useHead } from "@unhead/vue";
import { maskNumber, formatCurrency, unFormatNumber } from "../utils/formatter";
import { ref } from "vue";

defineOptions({
  name: 'GrahamPage',
});

useHead({
  title: "Fórmula de Graham - Tools Invest",
});

const formData = ref({
  PL: "15,00",
  PVP: "1,50",
  LPA: null,
  VPA: null,
});

const result = ref<null | number>(null);

function handleSubmit() {
  if (!formData.value.LPA || !formData.value.VPA) return;

  const PL = unFormatNumber(formData.value.PL);
  const PVP = unFormatNumber(formData.value.PVP);
  const LPA = unFormatNumber(formData.value.LPA);
  const VPA = unFormatNumber(formData.value.VPA);

  result.value = Math.sqrt(PL * PVP * LPA * VPA);
}
</script>

<template>
  <div class="mx-auto px-10 xl:px-0 space-y-16 max-w-screen-lg mt-4 mb-20">
    <main class="space-y-10">
      <div
        class="flex flex-col gap-6 bg-gray-50 p-8 border border-gray-200 rounded-md"
      >
        <header>
          <h1 class="text-2xl font-bold">Fórmula de Graham</h1>
          <p>Insira os indicadores e calcule o valor intrínseco de uma ação</p>
        </header>

        <form class="grid grid-cols-2 gap-5" @submit.prevent="handleSubmit">
          <div class="flex flex-col gap-1">
            <label class="text-sm">P/L (Preço sobre Lucro)</label>
            <input
              type="text"
              placeholder="15"
              class="h-10 px-3 rounded-sm border border-gray-300 placeholder:text-gray-400"
              @input="formData.PL = maskNumber($event.target.value)"
              :value="formData.PL"
            />
          </div>
          <div class="flex flex-col gap-1">
            <label class="text-sm">P/VP (Preço sobre Valor Patrimonial)</label>
            <input
              type="text"
              placeholder="1,5"
              class="h-10 px-3 rounded-sm border border-gray-300 placeholder:text-gray-400"
              @input="formData.PVP = maskNumber($event.target.value)"
              :value="formData.PVP"
            />
          </div>
          <div class="flex flex-col gap-1">
            <label class="text-sm">LPA (Lucro por Ação)</label>
            <div class="flex rounded-sm border border-gray-300">
              <span
                class="w-12 flex items-center border-r border-gray-300 justify-center bg-gray-100"
              >
                R$
              </span>
              <input
                placeholder="0,00"
                class="h-10 px-3 w-full placeholder:text-gray-400"
                @input="formData.LPA = maskNumber($event.target.value)"
                :value="formData.LPA"
              />
            </div>
          </div>
          <div class="flex flex-col gap-1">
            <label class="text-sm">VPA (Valor Patrimonial por Ação)</label>
            <div class="flex rounded-sm border border-gray-300">
              <span
                class="w-12 flex items-center border-r border-gray-300 justify-center bg-gray-100"
              >
                R$
              </span>
              <input
                type="text"
                placeholder="0,00"
                class="h-10 px-3 w-full placeholder:text-gray-400"
                @input="formData.VPA = maskNumber($event.target.value)"
                :value="formData.VPA"
              />
            </div>
          </div>
          <button
            type="submit"
            class="h-10 col-span-2 rounded-sm text-white bg-zinc-700"
          >
            Calcular
          </button>
        </form>
      </div>

      <div
        v-if="result"
        class="flex flex-col gap-6 bg-gray-50 p-10 border border-gray-200 rounded-md"
      >
        <header>
          <h2 class="text-2xl font-bold">Resultado</h2>
          <p>Esse resultado corresponde ao valor intrínseco de uma ação</p>
        </header>
        <div
          class="bg-zinc-700 p-5 text-white text-center rounded-sm col-span-2"
        >
          <p class="font-bold text-xl">
            {{ formatCurrency(result) }}
          </p>
        </div>
      </div>
    </main>
    <section class="space-y-4">
      <h2 class="text-3xl font-bold">Quem foi Benjamin Graham?</h2>
      <p class="text-lg leading-relaxed">
        Benjamin Graham é considerado o <strong>Value Investing</strong>. Ele
        foi um investidor, economista e professor, conhecido por ensinar
        fundamentos de análise de ações e investimento seguro. Graham escreveu
        dois livros icônicos: <strong>"O Investidor Inteligente"</strong> e
        <strong>"Security Analysis"</strong>, que influenciaram gerações de
        investidores, incluindo <strong>Warren Buffett</strong>, um de seus
        alunos mais famosos.
      </p>
    </section>
    <section class="space-y-4">
      <h2 class="text-3xl font-bold">Como funciona a fórmula de Graham?</h2>
      <p class="text-lg leading-relaxed">
        A fórmula de Graham é uma ferramenta simples e eficaz para calcular o
        valor intrínseco de uma ação. A fórmula original é:
      </p>
      <math class="text-3xl py-5" display="block">
        <mi>V</mi>
        <mo>=</mo>
        <msqrt>
          <mrow>
            <mn>22.5</mn>
            <mo>&#xD7;</mo>
            <mi>LPA</mi>
            <mo>&#xD7;</mo>
            <mi>VPA</mi>
          </mrow>
        </msqrt>
      </math>
      <p class="text-lg leading-relaxed">
        Explicando cada termo
      </p>
      <ul class="list-disc list-inside text-lg leading-relaxed">
        <li>V: Valor intrínseco da ação - o preço justo estimado.</li>
        <li>
          LPA (Lucro por Ação): representa o lucro líquido da empresa dividido pelo número total de ações.
        </li>
        <li>
          VPA (Valor Patrimonial por Ação): corresponde ao patrimônio líquido da empresa dividido pelo número total de ações.
        </li>
        <li>
          22.5: Um fator que Graham determinou como adequado, combinando um múltiplo máximo de 15 para o P/L (Preço/Lucro) e de 1.5 para o P/VP (Preço/Valor Patrimonial).
        </li>
      </ul>
    </section>
    <section class="space-y-4">
      <h2 class="text-3xl font-bold">Para que serve o Número de Graham?</h2>
      <p class="text-lg leading-relaxed">
        A fórmula de Graham é uma ferramenta que calcula o valor justo de uma ação com base nos lucros e no patrimônio da empresa. O resultado desse cálculo pode ser comparado ao preço atual de mercado para ajudar os investidores a identificar oportunidades de investimento.
        <br>
        <br>
        De acordo com a fórmula, se o preço de mercado de uma ação estiver abaixo do valor calculado, isso indica que a ação está <strong>subvalorizada</strong>, podendo ser uma boa oportunidade de compra. Por outro lado, se o preço de mercado for superior ao valor calculado, a ação pode estar <strong>supervalorizada</strong>, sugerindo maior cautela ao investir.
      </p>
    </section>
    <section class="space-y-4">
      <h2 class="text-3xl font-bold">Exemplo Prático</h2>
      <p class="text-lg leading-relaxed">
        Imagine uma ação com os seguintes indicadores:
      </p>
      <ul class="list-disc list-inside text-lg leading-relaxed">
        <li>
          LPA (Lucro por Ação): R$ 5,00
        </li>
        <li>
          VPA (Valor Patrimonial por Ação): R$ 20,00
        </li>
      </ul>
      <br>
      <p>
        Aplicando a fórmula:   
      </p>
      <math class="text-3xl py-5" display="block">
        <mi>V</mi>
        <mo>=</mo>
        <msqrt>
          <mrow>
            <mn>22.5</mn>
            <mo>&#xD7;</mo>
            <mn>5</mn>
            <mo>&#xD7;</mo>
            <mn>20</mn>
          </mrow>
        </msqrt>
        <mo>=</mo>
        <msqrt>
          <mn>2250</mn>
        </msqrt>
        <mo>=</mo>
        <mn>47.43</mn>
      </math>

      <p class="text-lg leading-relaxed">
        O valor intrínseco calculado (V) é aproximadamente R$ 47,43.
  
        Agora, comparando com o preço atual de mercado:
      </p>
      <ul class="list-disc list-inside">
        <li>
          Se o preço de mercado for R$ 40,00: A ação está subvalorizada, sugerindo uma possível oportunidade de compra.
        </li>
        <li>
          Se o preço de mercado for R$ 50,00: A ação está supervalorizada, o que exige mais cautela.
        </li>
      </ul>
    </section>
  </div>
</template>
