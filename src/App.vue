<script setup lang="ts">
import { computed, onMounted, ref } from 'vue';
import { ibgeService, IPCA } from './services/ibge';
import { formatCurrency, unFormatCurrency } from './utils/formatter';

const ipcaData = ref<IPCA[]>([]);
const formData = ref({
  startDate: null,
  endDate: null,
  value: '0,00'
});

const valueToCorrect = computed(() => unFormatCurrency(formData.value.value));

const resultData = ref<{
  correctionIndex: number,
  value: number
} | null>(null);

function handleSubmit() {
  const startIndex = ipcaData.value.findIndex(({ date }) => date === formData.value.startDate);
  const previousIndex = startIndex > 0 ? startIndex - 1 : null;

  const startIPCA = previousIndex !== null ? ipcaData.value[previousIndex] : ipcaData.value[startIndex];
  const endIPCA = ipcaData.value.find(({ date }) => date === formData.value.endDate);

  if (!startIPCA || !endIPCA) return

  const correctionIndex = endIPCA.accumulatedIndex / startIPCA.accumulatedIndex;

  resultData.value = {
    correctionIndex,
    value: valueToCorrect.value * correctionIndex
  };

  formData.value = {
    startDate: null,
    endDate: null,
    value: '0,00'
  };
}

onMounted(() => {
  ipcaData.value = ibgeService.getHistoricIPCA();
});
</script>

<template>
  <main class="mx-auto space-y-10 max-w-screen-lg my-14">
    <div class="flex flex-col gap-6 bg-gray-50 p-8 border border-gray-200 rounded-md">
      <header>
        <h1 class="text-2xl font-bold">Correção de Valor pela Inflação</h1>
        <p>Insira as datas e o valor para calcular a correção pela inflação histórica do Brasil</p>
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
            <span class="w-12 flex items-center border-r border-gray-300 justify-center bg-gray-100">R$</span>
            <input
              type="text"
              placeholder="0,00"
              class="h-10 px-3 w-full placeholder:text-gray-400"
              v-model.lazy="formData.value"
              v-money="{
                decimal: ',',
                thousands: '.',
                precision: 2
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
        <h1 class="text-2xl font-bold">Resultado da Correção</h1>
        <p>Resultado do valor corrigido pela inflação para o período selecionado</p>
      </header>
  
      <div class="grid grid-cols-2 gap-5">
        <div class="bg-zinc-700 p-5 text-white text-center rounded-sm col-span-2">
          <p>Valor corrigido na data final</p>
          <p class="font-bold text-xl">{{ formatCurrency(resultData.value) }}</p>
        </div>
        <div class="bg-white border border-gray-300 p-5 text-black text-center rounded-sm">
          <p>índice de correção no período</p>
          <p class="font-bold text-xl">{{ resultData?.correctionIndex.toFixed(4).toString().replace('.', ',') }}</p>
        </div>
        <div class="bg-white border border-gray-300 p-5 text-black text-center rounded-sm">
          <p>Valor percentual correspondente </p>
          <p class="font-bold text-xl">{{ ((resultData.correctionIndex - 1) * 100).toFixed(2).toString().replace('.', ',') }}%</p>
        </div>
      </div>
    </div>
  </main>
</template>
