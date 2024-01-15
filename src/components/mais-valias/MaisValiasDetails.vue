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
            <h4 class="font-normal text-medium">Valor de realização</h4>
            <p class="font-bold font-muli">
                {{ 
                    (simulationData.sellValue === null || simulationData.sellValue === 0 || simulationData.sellValue === undefined)
                    ? ''
                    : `${useEURFormat(simulationData.sellValue)}`
                }}
            </p>
        </div>

        <div class="flex flex-row justify-between px-4 py-3 bg-slate-100" id="imt-value">
            <h4 class="font-normal text-medium">Coeficiente de atualização monetária</h4>
            <p class="font-bold font-muli">
                {{ 
                    (simulationData.currentDevaluationApplied === 0 || simulationData.currentDevaluationApplied === undefined || simulationData.currentDevaluationApplied === null )
                    ? '1'
                    : `${simulationData.currentDevaluationApplied}`
                }}
            </p>
        </div>

        <div class="flex flex-row justify-between px-4 py-3 bg-slate-200" id="imt-value">
            <h4 class="font-normal text-medium">Valor de aquisição atualizado</h4>
            <p class="font-bold font-muli">
                {{ 
                    (simulationData.updatedPurchaseCost === null || simulationData.updatedPurchaseCost === 0 || simulationData.updatedPurchaseCost === undefined)
                    ? ''
                    : `- ${useEURFormat(simulationData.updatedPurchaseCost)}`
                }}
            </p>
        </div>
        
        <div class="flex flex-row justify-between px-4 py-3 bg-slate-100" id="imt-value">
            <h4 class="font-normal text-medium">Despesas e encargos</h4>
            <p class="font-bold font-muli">
                {{ 
                    ( simulationData.extraSpendings === 0 || simulationData.extraSpendings === undefined)
                    ? '0 €'
                    : `- ${useEURFormat(simulationData.extraSpendings)}`
                }}
            </p>
        </div>
        
        <div class="flex flex-row justify-between px-4 py-3 bg-green-600" id="total">
            <h4 class="font-bold text-medium text-white">Mais-valia</h4>
            <p class="font-bold font-muli text-white">
                {{ 
                    (simulationData.totalProfit === 0 || simulationData.totalProfit === undefined)
                    ? ''
                    : `${useEURFormat(simulationData.totalProfit)}`
                }}
            </p>
        </div>
    </div>
  </div>
</template>