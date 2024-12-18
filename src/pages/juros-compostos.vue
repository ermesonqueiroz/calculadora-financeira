<script setup lang="ts">
import { ref } from "vue";
import { formatCurrency, maskNumber, unFormatNumber } from "../utils/formatter";

const formData = ref({
  startValue: "",
  monthlyValue: "",
  interestRate: "10,00",
  timePeriod: 1,
});

const result = ref<null | {
  finalAmount: number;
  investedValue: number;
  accumulatedInterest: number;
}>(null);

function handleSubmit() {
  const startValue = unFormatNumber(formData.value.startValue);
  const monthlyValue = unFormatNumber(formData.value.monthlyValue);
  const interestRate = unFormatNumber(formData.value.interestRate) / 100;

  const monthlyRate = Math.pow(1 + interestRate, 1 / 12) - 1;
  const months = formData.value.timePeriod * 12;

  const initialCapitalAmount = startValue * Math.pow(1 + monthlyRate, months);

  const contributionsAmount =
    monthlyValue * ((Math.pow(1 + monthlyRate, months) - 1) / monthlyRate);
  const finalAmount = initialCapitalAmount + contributionsAmount;

  const investedValue = startValue + monthlyValue * months;
  const accumulatedInterest = finalAmount - investedValue;

  result.value = {
    finalAmount,
    investedValue,
    accumulatedInterest,
  };
}
</script>

<template>
  <div class="mx-auto px-10 xl:px-0 space-y-16 max-w-screen-lg mt-4 mb-20">
    <main class="space-y-10">
      <div
        class="flex flex-col gap-6 bg-gray-50 p-8 border border-gray-200 rounded-sm"
      >
        <header>
          <h1 class="text-2xl font-bold">Calculadora de Juros Compostos</h1>
          <h2>Simule cálculos de Juros Compostos nos seus investimentos</h2>
        </header>

        <form class="grid grid-cols-2 gap-5" @submit.prevent="handleSubmit">
          <div class="flex flex-col gap-1">
            <label class="text-sm">Valor inicial</label>
            <div class="flex rounded-sm border border-gray-300">
              <span
                class="w-12 flex items-center border-r border-gray-300 justify-center bg-gray-100"
              >
                R$
              </span>
              <input
                placeholder="0,00"
                class="h-10 px-3 w-full placeholder:text-gray-400"
                @input="
                  (event) =>
                    (formData.startValue = maskNumber(
                      (event.target as HTMLInputElement).value
                    ))
                "
                :value="formData.startValue"
              />
            </div>
          </div>
          <div class="flex flex-col gap-1">
            <label class="text-sm">Valor mensal</label>
            <div class="flex rounded-sm border border-gray-300">
              <span
                class="w-12 flex items-center border-r border-gray-300 justify-center bg-gray-100"
              >
                R$
              </span>
              <input
                placeholder="0,00"
                class="h-10 px-3 w-full placeholder:text-gray-400"
                @input="
                  (event) =>
                    (formData.monthlyValue = maskNumber(
                      (event.target as HTMLInputElement).value
                    ))
                "
                :value="formData.monthlyValue"
              />
            </div>
          </div>
          <div class="flex flex-col gap-1">
            <label class="text-sm">Taxa de juros (Anual)</label>
            <div class="flex rounded-sm border-gray-300 border">
              <span
                class="w-12 flex items-center border-r border-gray-300 justify-center bg-gray-100"
              >
                %
              </span>
              <input
                placeholder="0,00"
                class="h-10 px-3 w-full placeholder:text-gray-400"
                @input="
                  (event) =>
                    (formData.interestRate = maskNumber(
                      (event.target as HTMLInputElement).value
                    ))
                "
                :value="formData.interestRate"
              />
            </div>
          </div>
          <div class="flex flex-col gap-1">
            <label class="text-sm">Período (Anos)</label>
            <input
              type="number"
              placeholder="1"
              class="h-10 px-3 rounded-sm border border-gray-300 placeholder:text-gray-400"
              v-model="formData.timePeriod"
            />
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
        class="flex flex-col gap-6 bg-gray-50 p-10 border border-gray-200 rounded-sm"
        v-if="result"
      >
        <header>
          <h2 class="text-2xl font-bold">Resultado</h2>
          <p>Confira abaixo o montante e o valor dos juros gerados</p>
        </header>

        <div class="grid grid-cols-2 gap-5">
          <div
            class="bg-zinc-700 p-5 text-white text-center rounded-sm col-span-2"
          >
            <p>Montante final</p>
            <p class="font-bold text-xl">
              {{ formatCurrency(result.finalAmount) }}
            </p>
          </div>
          <div
            class="bg-white border border-gray-300 p-5 text-black text-center rounded-sm"
          >
            <p>Valor investido</p>
            <p class="font-bold text-xl">
              {{ formatCurrency(result.investedValue) }}
            </p>
          </div>
          <div
            class="bg-white border border-gray-300 p-5 text-black text-center rounded-sm"
          >
            <p>Total em juros</p>
            <p class="font-bold text-xl">
              {{ formatCurrency(result.accumulatedInterest) }}
            </p>
          </div>
        </div>
      </div>
    </main>
    <article class="space-y-10">
      <section class="space-y-4">
        <h2 class="text-3xl font-bold">O que são Juros Compostos?</h2>
        <p class="text-lg leading-relaxed">
          Os <strong>juros compostos</strong> são um conceito fundamental no
          mundo das finanças e dos investimentos. Eles representam a aplicação
          de juros sobre o valor inicial de um investimento, bem como sobre os
          <strong>juros acumulados</strong> ao longo do tempo. Isso significa
          que, além de os juros serem aplicados sobre o valor investido
          inicialmente, eles também são aplicados sobre os juros que já foram
          gerados, fazendo com que o montante cresça de forma exponencial.
          <br />
          <br />
          Ao contrário dos <strong>juros simples</strong>, onde os juros são
          calculados apenas sobre o valor inicial do investimento, os juros
          compostos permitem que o valor cresça mais rapidamente, à medida que o
          tempo passa. Esse fenômeno é frequentemente chamado de “efeito bola de
          neve”, pois o valor do investimento tende a aumentar de forma
          acelerada conforme os juros se acumulam.
        </p>
      </section>
      <section class="space-y-4">
        <h2 class="text-3xl font-bold">Como Funcionam os Juros Compostos?</h2>
        <p class="text-lg leading-relaxed">
          Para calcular juros compostos, utiliza-se a fórmula:
        </p>
        <math class="text-3xl py-5" display="block">
          <mi>M</mi>
          <mo>=</mo>
          <mi>P</mi>
          <mo>&times;</mo>
          <msup>
            <mrow>
              <mo>(</mo>
              <mi>1</mi>
              <mo>+</mo>
              <mi>i</mi>
              <mo>)</mo>
            </mrow>
            <mi>n</mi>
          </msup>
        </math>
        <p class="text-lg">Onde:</p>
        <ul class="list-disc list-inside text-lg leading-relaxed">
          <li><strong>M</strong> é o montante final.</li>
          <li><strong>P</strong> é o capital inicial.</li>
          <li><strong>i</strong> é a taxa de juros.</li>
          <li>
            <strong>n</strong> é o número de períodos (geralmente meses ou
            anos).
          </li>
        </ul>
        <p class="text-lg leading-relaxed">
          Além disso, quando você faz <strong>aportes mensais</strong> em um
          investimento, como uma contribuição regular, o valor investido ao
          longo do tempo também gera juros compostos, tornando o seu rendimento
          ainda maior. Essa forma de crescimento de um investimento é ideal para
          quem quer ver o valor investido crescer ao longo dos anos,
          aproveitando ao máximo os benefícios dos
          <strong>juros compostos</strong>.
        </p>
      </section>
      <section class="space-y-4">
        <h2 class="text-3xl font-bold">
          Exemplos de Aplicação dos Juros Compostos
        </h2>
        <p class="text-lg leading-relaxed">
          Os <strong>juros compostos</strong> são amplamente utilizados em
          diversos tipos de investimentos, como:
        </p>
        <ul class="list-disc list-inside text-lg leading-relaxed">
          <li>
            <strong>Poupança:</strong> Uma das formas mais comuns de aplicar
            juros compostos, onde o saldo da conta cresce ao longo do tempo.
          </li>
          <li>
            <strong>Fundos de Investimento:</strong> Alguns fundos de
            investimento, especialmente os de longo prazo, aplicam juros
            compostos, tornando os rendimentos mais significativos à medida que
            o tempo passa.
          </li>
          <li>
            <strong>Empréstimos e Financiamentos:</strong> Em muitas situações
            de crédito, como no caso de empréstimos pessoais ou financiamento de
            imóveis, os juros compostos aumentam o valor final que será pago ao
            longo do tempo.
          </li>
        </ul>
      </section>
      <section class="space-y-4">
        <h2 class="text-3xl font-bold">Vantagens dos Juros Compostos</h2>
        <p class="text-lg leading-relaxed">
          Uma das principais vantagens dos <strong>juros compostos</strong> é a
          possibilidade de alcançar uma
          <strong>rentabilidade exponencial</strong> ao longo do tempo. Quanto
          mais cedo você começar a investir ou pagar um empréstimo, mais o seu
          dinheiro terá tempo para crescer, aproveitando os benefícios dos juros
          compostos. Isso torna os juros compostos uma ferramenta poderosa para
          quem deseja planejar o futuro financeiro e acumular riqueza ao longo
          do tempo.
        </p>
      </section>
      <section class="space-y-4">
        <h2 class="text-3xl font-bold">
          Como Maximizar os Benefícios dos Juros Compostos?
        </h2>
        <p class="text-lg leading-relaxed">
          Para aproveitar ao máximo os juros compostos, é importante começar a
          investir o quanto antes e fazer <strong>aportes regulares</strong>,
          garantindo que seu dinheiro tenha mais tempo para crescer. Além disso,
          escolher investimentos que aplicam juros compostos de maneira eficaz
          pode ajudar a aumentar significativamente os retornos ao longo dos
          anos.
        </p>
      </section>
      <section class="space-y-4">
        <h2 class="text-3xl font-bold">Conclusão</h2>
        <p class="text-lg leading-relaxed">
          Os juros compostos são um dos conceitos mais importantes para quem
          deseja alcançar estabilidade financeira e aumentar seus investimentos.
          Ao entender como eles funcionam e aplicar esse conhecimento na
          prática, você pode aproveitar o crescimento exponencial que eles
          proporcionam e fazer seu dinheiro trabalhar para você ao longo do
          tempo.
        </p>
      </section>
    </article>
  </div>
</template>
