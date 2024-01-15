<script setup>
import { ref, toValue } from 'vue';
import { useMaisValiaCalculator } from '../../composables/useMaisValiaCalculator';

defineProps({
    modelValue: Object
});

let emit = defineEmits(['update:modelValue']);

let purchaseInputFocus = ref(false);
let sellInputFocus = ref(false);
let extraSpendingFocus = ref(false);

let purchaseValues = ref({
    houseCost: 0,
    houseYear: new Date().getFullYear(),
    houseMonth: '1'
});

let sellValues = ref({
    houseCost: 0,
    houseYear: new Date().getFullYear(),
    houseMonth: '1'
});

let extraSpending = ref(0);

function updateMaisValia(){
    emit(
        'update:modelValue', 
        useMaisValiaCalculator(toValue(purchaseValues), toValue(sellValues), toValue(extraSpending))
    );
}

</script>

<template>
  <div class="py-6 px-4 bg-slate-50 border-2 border-red-900 rounded-md" id="imt-form">
    <h3 class="mb-6 font-comfortaa font-bold text-xl">Dados para o cálculo da mais-valia imobiliária: </h3>
    <form @submit.prevent="submitForm" class="flex flex-col">
        <div class="flex flex-row mb-6">
            <div class="w-1/3 pr-8">
                <label class="font-comfortaa font-muli font-medium pb-2 block" for="purchaseprice">
                    Valor de aquisição
                </label>
                <div class="relative">
                    <input 
                    type="text"
                    name="purchaseprice"
                    id="purchaseprice"
                    v-model="purchaseValues.houseCost"
                    @focus="purchaseInputFocus = true"
                    @blur="purchaseInputFocus = false"
                    @keyup="updateMaisValia"
                    class="pr-11 font-comfortaa max-w-full text-sm w-full px-2 py-2 rounded-md border-2 border-gray-200 focus:outline-brand-red"
                    />
                    <span :class="{'!bg-brand-red text-white': purchaseInputFocus}" class="absolute top-0 bottom-0 bg-gray-200 text-sm font-bold w-10 h-full right-0 flex flex-col justify-center items-center rounded-r-md">
                        €
                    </span>
                </div>
            </div>
            <div class="w-1/3 pr-8">
                <label class="ffont-comfortaa ont-muli font-medium pb-2 block" for="purchaseyear">Ano de aquisição</label>
                <select 
                @change="updateMaisValia" 
                class="font-comfortaa max-w-full w-full px-2 py-2 rounded-md border-2 border-gray-200 focus:outline-brand-red text-sm" 
                name="purchaseyear" 
                id="purchaseyear" 
                v-model="purchaseValues.houseYear"
                >
                    <option 
                        v-for="year in Array.from({ length: 2024-1903 }, (_, index) => 2024 - index)" 
                        :key="year" 
                        :value="year"
                    >
                        {{ year }}
                    </option>
                    <option value="before-1903">
                        1903 ou anterior
                    </option>
                </select>
            </div>
            <div class="w-1/3">
                <label class="ffont-comfortaa ont-muli font-medium pb-2 block" for="purchasemonth">Mês de aquisição</label>
                <select 
                @change="updateMaisValia" 
                class="font-comfortaa max-w-full w-full px-2 py-2 rounded-md border-2 border-gray-200 focus:outline-brand-red text-sm" 
                name="purchasemonth" 
                id="purchasemonth" 
                v-model="purchaseValues.houseMonth"
                >
                    <option value="1" selected>Janeiro</option>
                    <option value="2">Fevereiro</option>
                    <option value="3">Março</option>
                    <option value="4">Abril</option>
                    <option value="5">Maio</option>
                    <option value="6">Junho</option>
                    <option value="7">Julho</option>
                    <option value="8">Agosto</option>
                    <option value="9">Setembro</option>
                    <option value="10">Outubro</option>
                    <option value="11">Novembro</option>
                    <option value="12">Dezembro</option>
                </select>
            </div>
        </div>

        <div class="flex flex-row mb-6">
            <div class="w-1/3 pr-8">
                <label class="font-comfortaa font-muli font-medium pb-2 block" for="sellprice">
                    Valor de realização (venda)
                </label>
                <div class="relative">
                    <input 
                    type="text"
                    name="sellprice"
                    id="sellprice"
                    v-model="sellValues.houseCost"
                    @focus="sellInputFocus = true"
                    @blur="sellInputFocus = false"
                    @keyup="updateMaisValia"
                    class="pr-11 font-comfortaa max-w-full text-sm w-full px-2 py-2 rounded-md border-2 border-gray-200 focus:outline-brand-red"
                    />
                    <span :class="{'!bg-brand-red text-white': sellInputFocus}" class="absolute top-0 bottom-0 bg-gray-200 text-sm font-bold w-10 h-full right-0 flex flex-col justify-center items-center rounded-r-md">
                        €
                    </span>
                </div>
            </div>
            <div class="w-1/3 pr-8">
                <label class="ffont-comfortaa ont-muli font-medium pb-2 block" for="sellyear">
                    Ano de realização 
                </label>
                <select 
                @change="updateMaisValia"
                class="font-comfortaa max-w-full w-full px-2 py-2 rounded-md border-2 border-gray-200 focus:outline-brand-red text-sm" 
                name="sellyear" 
                id="sellyear" 
                v-model="sellValues.houseYear"
                >
                    <option 
                        v-for="year in Array.from({ length: 2024-2017 }, (_, index) => 2024 - index)" 
                        :key="year" 
                        :value="year"
                    >
                        {{ year }}
                    </option>
                </select>
            </div>
            <div class="w-1/3">
                <label class="ffont-comfortaa ont-muli font-medium pb-2 block" for="sellmonth">Mês de realização</label>
                <select 
                @change="updateMaisValia" 
                class="font-comfortaa max-w-full w-full px-2 py-2 rounded-md border-2 border-gray-200 focus:outline-brand-red text-sm" 
                name="sellmonth" 
                id="sellmonth" 
                v-model="sellValues.houseMonth"
                >
                    <option value="1">Janeiro</option>
                    <option value="2">Fevereiro</option>
                    <option value="3">Março</option>
                    <option value="4">Abril</option>
                    <option value="5">Maio</option>
                    <option value="6">Junho</option>
                    <option value="7">Julho</option>
                    <option value="8">Agosto</option>
                    <option value="9">Setembro</option>
                    <option value="10">Outubro</option>
                    <option value="11">Novembro</option>
                    <option value="12">Dezembro</option>
                </select>
            </div>
        </div>

        <div class="flex flex-row mb-6">
            <div class="w-1/3 pr-8">
                <label class="font-comfortaa font-muli font-medium pb-2 block" for="extracosts">
                    Despesas e encargos
                </label>
                <div class="relative">
                    <input 
                    type="text"
                    name="extracosts"
                    id="extracosts"
                    v-model="extraSpending"
                    @focus="extraSpendingFocus = true"
                    @blur="extraSpendingFocus = false"
                    @keyup="updateMaisValia"
                    class="pr-11 font-comfortaa max-w-full text-sm w-full px-2 py-2 rounded-md border-2 border-gray-200 focus:outline-brand-red"
                    />
                    <span :class="{'!bg-brand-red text-white': extraSpendingFocus}" class="absolute top-0 bottom-0 bg-gray-200 text-sm font-bold w-10 h-full right-0 flex flex-col justify-center items-center rounded-r-md">
                        €
                    </span>
                </div>
            </div>
        </div>
      
    </form>
  </div>
</template>