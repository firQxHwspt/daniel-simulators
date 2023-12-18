<script setup>
import { ref, toValue } from 'vue';
import { useIMTCalculator } from '../../composables/useIMTCalculator';

defineProps({
    modelValue: Object
});

let emit = defineEmits(['update:modelValue']);

let valueInputFocus = ref(false);

let local = ref('portugal');
let useCase = ref('self');
let houseCost = ref(0);

function calculateIMT(){
    emit('update:modelValue', useIMTCalculator(toValue(local), toValue(useCase), toValue(houseCost)));
}
</script>

<template>
  <div class="py-6 px-4 bg-slate-50 border-2 border-red-900 rounded-md" id="imt-form">
    <h3 class="mb-6 font-comfortaa font-bold text-xl">Dados para a simulação: </h3>
    <form @submit.prevent="submitForm" class="flex flex-col">
        <div class="flex flex-row mb-6">
            <div class="w-1/2 pr-8">
                <label class="font-comfortaa font-muli font-medium pb-2 block" for="local">Local do Imóvel</label>
                <select @change="calculateIMT" class="font-comfortaa max-w-full w-full px-2 py-2 rounded-md border-2 border-gray-200 focus:outline-brand-red text-sm" name="local" id="local" v-model="local">
                    <option value="portugal">Portugal Continental</option>
                    <option value="islands">Regiões Autónomas</option>
                </select>
            </div>
            <div class="w-1/2">
                <label class="ffont-comfortaa ont-muli font-medium pb-2 block" for="usecase">Finalidade do imóvel</label>
                <select @change="calculateIMT" class="font-comfortaa max-w-full w-full px-2 py-2 rounded-md border-2 border-gray-200 focus:outline-brand-red text-sm" name="usecase" id="usecase" v-model="useCase">
                    <option value="self" selected>Habitação Própria e Permanente</option>
                    <option value="secondary">Habitação secundária ou arrendamento</option>
                    <option value="rustic">Prédios rústicos</option>
                    <option value="urban">Prédios urbanos e outras aquisições onerosas</option>
                    <option value="taxHavenNotSelf">Adquirente (exceto particulares) residente em paraíso fiscal ou em território em que o regime fiscal é mais favorável</option>
                    <option value="taxHavenControlled">Entidade dominada ou controlada, direta ou indiretamente, por entidade com domicílio em paraíso fiscal ou em território em que o regime fiscal é mais favorável.</option>
                </select>
            </div>
        </div>
        <div class="w-100 block">
            <label for="housecost" class="font-comfortaa font-muli font-medium pb-2 block">
                Preço do imóvel
            </label>
            <div class="relative">
                <input 
                type="text"
                name="housecost"
                id="housecost"
                v-model="houseCost"
                @focus="valueInputFocus = true"
                @blur="valueInputFocus = false"
                @keyup="calculateIMT"
                class="font-comfortaa max-w-full text-sm w-full px-2 py-2 rounded-md border-2 border-gray-200 focus:outline-brand-red"
                />
                <span :class="{'bg-brand-red text-white': valueInputFocus}" class="absolute top-0 bottom-0 bg-gray-200 text-sm font-bold w-10 h-full right-0 flex flex-col justify-center items-center rounded-r-md">
                    €
                </span>
            </div>
        </div>
    </form>
  </div>
</template>