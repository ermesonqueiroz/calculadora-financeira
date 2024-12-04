<script setup lang="ts">
import { computed, onMounted, ref } from "vue";
import { ibgeService, IPCA } from "./services/ibge";
import { formatCurrency, unFormatCurrency } from "./utils/formatter";

const ipcaData = ref<IPCA[]>([]);
const formData = ref({
  startDate: null,
  endDate: null,
  value: "0,00",
});

const valueToCorrect = computed(() => unFormatCurrency(formData.value.value));

const resultData = ref<{
  correctionIndex: number;
  value: number;
} | null>(null);

function handleSubmit() {
  const startIndex = ipcaData.value.findIndex(
    ({ date }) => date === formData.value.startDate
  );
  const previousIndex = startIndex > 0 ? startIndex - 1 : null;

  const startIPCA =
    previousIndex !== null
      ? ipcaData.value[previousIndex]
      : ipcaData.value[startIndex];
  const endIPCA = ipcaData.value.find(
    ({ date }) => date === formData.value.endDate
  );

  if (!startIPCA || !endIPCA) return;

  const correctionIndex = endIPCA.accumulatedIndex / startIPCA.accumulatedIndex;

  resultData.value = {
    correctionIndex,
    value: valueToCorrect.value * correctionIndex,
  };

  formData.value = {
    startDate: null,
    endDate: null,
    value: "0,00",
  };
}

onMounted(() => {
  ipcaData.value = ibgeService.getHistoricIPCA();
});
</script>

<template>
  <div class="mx-auto px-10 xl:px-0 space-y-16 max-w-screen-lg my-20">
    <main class="space-y-10">
      <div
        class="flex flex-col gap-6 bg-gray-50 p-8 border border-gray-200 rounded-md"
      >
        <header>
          <h1 class="text-2xl font-bold">
            Calculadora de Correção pela Inflação
          </h1>
          <p>
            Insira as datas e o valor para calcular a correção pela inflação
            histórica do Brasil
          </p>
        </header>

        <form class="grid grid-cols-2 gap-5" @submit.prevent="handleSubmit">
          <div class="flex flex-col gap-1">
            <label class="text-sm">Data inicial</label>
            <input
              type="text"
              placeholder="MM/AAAA"
              v-mask="'##/####'"
              class="h-10 px-3 rounded-sm border border-gray-300 placeholder:text-gray-400"
              v-model="formData.startDate"
            />
          </div>
          <div class="flex flex-col gap-1">
            <label class="text-sm">Data final</label>
            <input
              type="text"
              placeholder="MM/AAAA"
              v-mask="'##/####'"
              class="h-10 px-3 rounded-sm border border-gray-300 placeholder:text-gray-400"
              v-model="formData.endDate"
            />
          </div>
          <div class="flex flex-col col-span-2 gap-1">
            <label class="text-sm">Valor a ser corrigido</label>
            <div class="flex rounded-sm border border-gray-300">
              <span
                class="w-12 flex items-center border-r border-gray-300 justify-center bg-gray-100"
                >R$</span
              >
              <input
                type="text"
                placeholder="0,00"
                class="h-10 px-3 w-full placeholder:text-gray-400"
                v-model.lazy="formData.value"
                v-money="{
                  decimal: ',',
                  thousands: '.',
                  precision: 2,
                }"
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
        v-if="resultData"
        class="flex flex-col gap-6 bg-gray-50 p-10 border border-gray-200 rounded-md"
      >
        <header>
          <h2 class="text-2xl font-bold">Resultado da Correção</h2>
          <p>
            Resultado do valor corrigido pela inflação para o período
            selecionado
          </p>
        </header>

        <div class="grid grid-cols-2 gap-5">
          <div
            class="bg-zinc-700 p-5 text-white text-center rounded-sm col-span-2"
          >
            <p>Valor corrigido na data final</p>
            <p class="font-bold text-xl">
              {{ formatCurrency(resultData.value) }}
            </p>
          </div>
          <div
            class="bg-white border border-gray-300 p-5 text-black text-center rounded-sm"
          >
            <p>índice de correção no período</p>
            <p class="font-bold text-xl">
              {{
                resultData?.correctionIndex
                  .toFixed(4)
                  .toString()
                  .replace(".", ",")
              }}
            </p>
          </div>
          <div
            class="bg-white border border-gray-300 p-5 text-black text-center rounded-sm"
          >
            <p>Valor percentual correspondente</p>
            <p class="font-bold text-xl">
              {{
                ((resultData.correctionIndex - 1) * 100)
                  .toFixed(2)
                  .toString()
                  .replace(".", ",")
              }}%
            </p>
          </div>
        </div>
      </div>
    </main>

    <section class="space-y-4">
      <h2 class="text-3xl font-bold">O que é inflação?</h2>
      <p class="text-lg leading-relaxed">
        A inflação é o aumento geral e contínuo dos preços de bens e serviços em
        uma economia ao longo do tempo. Ela reflete a perda do poder de compra
        da moeda: com a inflação, a mesma quantia de dinheiro compra menos do
        que anteriormente. No Brasil, o índice oficial que mede a inflação é o
        <strong>IPCA (Índice Nacional de Preços ao Consumidor Amplo)</strong>,
        calculado pelo <strong>IBGE</strong>.
      </p>
    </section>
    <section class="space-y-4">
      <h2 class="text-3xl font-bold">De onde vêm os dados da inflação?</h2>
      <p class="text-lg leading-relaxed">
        O IPCA é o índice oficial da inflação no Brasil, calculado e divulgado
        mensalmente pelo
        <strong>IBGE (Instituto Brasileiro de Geografia e Estatística)</strong>.
        Ele mede as variações de preços de uma cesta de bens e serviços
        consumidos pelas famílias brasileiras. O IPCA é utilizado pelo Banco
        Central do Brasil para orientar a política monetária do país.
        <br />
        <br />
        Nosso site utiliza a Série temporal 433 do Banco Central para calcular a
        correção pela inflação de valores em períodos passados. Essa série pode
        ser acessada no
        <a
          href="https://www3.bcb.gov.br/sgspub/localizarseries/localizarSeries.do?method=prepararTelaLocalizarSeries"
        >
          Sistema Gerenciador de Séries Temporais do Banco Central
        </a>
      </p>
    </section>
    <section class="space-y-4">
      <h2 class="text-3xl font-bold">
        Como é feito o cálculo da correção pela inflação?
      </h2>
      <p class="text-lg leading-relaxed">
        O cálculo da correção de valores é realizado aplicando-se o índice
        acumulado do IPCA. A cada mês, a variação percentual do IPCA é
        convertida em um fator multiplicativo, que é aplicado ao valor inicial
        para ajustá-lo à inflação. Isso significa que o valor é corrigido mês a
        mês, de acordo com a inflação registrada durante esse período.
      </p>
    </section>
  </div>
</template>
