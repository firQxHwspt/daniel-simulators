<script setup>

import { useEURFormat } from '@/composables/useEURFormat';

defineProps({
    simulationData: Object
});

</script>

<template>
  <div class="py-6 px-4 bg-slate-50 border-2 border-green-800 rounded-md" id="imt-details">
    <h3 class="mb-6 font-comfortaa font-bold text-xl text-green-700">Resultado da simulação: </h3>
    <div>
        <div class="flex flex-row justify-between px-4 py-3 bg-slate-200" id="imt-value">
            <h4 class="font-normal text-medium">Valor do IMT</h4>
            <p class="font-bold font-muli">
                {{ 
                    (simulationData.IMTValue === null || simulationData.IMTValue === 0 || simulationData.IMTValue === undefined) 
                    ? 'Isento' 
                    : `${useEURFormat(simulationData.IMTValue)}`
                }}
            </p>
        </div>
        <div class="flex flex-row justify-between px-4 py-3 bg-slate-100" id="stamp-duty">
            <h4 class="font-normal text-medium">
                Imposto de Selo
                <span>(0,8%)</span>
            </h4>
            <p class="font-bold font-muli">
                {{ 
                    (simulationData.stampTax === null || simulationData.stampTax === 0 || simulationData.stampTax === undefined) 
                    ? ''
                    : `${useEURFormat(simulationData.stampTax)}`
                }}
            </p>
        </div> 
        <div class="flex flex-row justify-between px-4 py-3 bg-green-600" id="total">
            <h4 class="font-bold text-medium text-white">Total a pagar</h4>
            <p class="font-bold font-muli text-white">
                {{ 
                    (simulationData.total === null || simulationData.total === 0 || simulationData.total === undefined)
                    ? ''
                    : `${useEURFormat(simulationData.total)}`
                }}
            </p>
        </div>
    </div>
  </div>
</template>