<script setup>
    import {ref, watch} from 'vue';
    import { differenceInCalendarYears } from "date-fns";
    import MaisValiasTaxableInformation from '@/components/mais-valias-taxes/mais-valias-information/MaisValiasTaxableInformation.vue';

    let props = defineProps({
        simulationData: Object,
        taxSettings: Object
    });

    let artExemptionLess10Years = ref(false);
    let amortization = ref(false);
    let amortizationValue = ref("");
    let reinvestAmount = ref("");

    watch(() => props.taxSettings, (nv) => {
        artExemptionLess10Years.value = false;
        amortizationValue.value = '0';
        reinvestAmount.value = '0';
        amortization.value = false;

        if(nv.govermentAid == "true"){
            const govermentAidDate = new Date(props.taxSettings.govermentAidYear, props.taxSettings.govermentAidMonth, 1);
            const currentDate = new Date();
            const years = differenceInCalendarYears(currentDate, govermentAidDate);
            artExemptionLess10Years.value = years < 10;
        }

        if(nv.livedInHouse == "false" && nv.amortizationHPP == "true" && nv.amortizationHPPAmount > 0){
            amortization.value = true;
            amortizationValue.value = nv.amortizationHPPAmount;
        }

        if(nv.reinvestInHPP == "true" && nv.amountPaidToBank > 0){
            amortization.value = true;
            amortizationValue.value = nv.amountPaidToBank;
            reinvestAmount.value = nv.reinvestmentAmount;
        }

    }, {deep: true});
    
</script>


<template>
    <div class="py-6 px-4 bg-slate-50 border-2 border-green-800 rounded-md" id="imt-details">
        <h3 class="mb-6 font-comfortaa font-bold text-xl text-green-700">Resultado da simulação: </h3>
        <MaisValiasTaxableInformation
        :maisValiaValue="props.simulationData.totalProfit"
        :hasArtExemption="artExemptionLess10Years"
        :amortization="amortization"
        :amortizationValue="amortizationValue"
        :reinvestAmount="reinvestAmount"
        :sellValue="Number(props.simulationData.sellValue)"
        :incomeTotal="props.taxSettings.totalIRS"
        :isCouple="props.taxSettings.coupleTax"
        />
    </div>
  </template>