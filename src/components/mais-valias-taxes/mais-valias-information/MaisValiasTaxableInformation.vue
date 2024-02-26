<script setup>
    import { useEURFormat } from '@/composables/useEURFormat';
    import { useMaisValiaTaxExemptionPercentage } from '@/composables/useMaisValiaTaxExemptionPercentage';
    import { useMaisValiaTaxCalculator } from '@/composables/useMaisValiaTaxCalculator';
    import GenericInfo from '@/components/GenericInfo.vue'
    import { ref, toRef, watch } from 'vue';
    
    let props = defineProps({
        maisValiaValue: Number,
        sellValue: Number,
        hasArtExemption: Boolean,
        amortization: Boolean,
        amortizationValue: String,
        reinvestAmount: String,
        incomeTotal: String,
        isCouple: String
    });

    let trackedProps = toRef(props);
    let taxableMaisValia = ref(trackedProps.value.maisValiaValue * .5);
    let exemptionPercentage = ref(0);
    let taxCalculations = ref({});

    watch(() => trackedProps, (nv) => {

        taxableMaisValia.value = nv.value.maisValiaValue * .5;
        if(nv.value.hasArtExemption === true){
            taxableMaisValia.value = nv.value.maisValiaValue;
        }

        if(nv.value.amortization === true){
            exemptionPercentage.value = useMaisValiaTaxExemptionPercentage(
                nv.value.sellValue,
                Number(nv.value.amortizationValue),
                Number(nv.value.reinvestAmount)
            );

            if(exemptionPercentage.value <= 100){
                taxableMaisValia.value = taxableMaisValia.value - taxableMaisValia.value * (exemptionPercentage.value / 100);
            }
        }

        taxCalculations.value = useMaisValiaTaxCalculator(
            taxableMaisValia.value,
            (!nv.value.incomeTotal) ? 0 : Number(nv.value.incomeTotal),
            nv.value.isCouple === "true",
            nv.value.hasArtExemption
        );

    }, {deep: true});


</script>

<template>

    <div id="exemption-info" class="mb-10" v-if="amortization && exemptionPercentage > 0">
        <h4 class="font-comfortaa mb-4 font-bold text-blue-600">
            Cálculo da Isenção
        </h4>
        <div class="flex flex-row justify-between px-4 py-3 bg-slate-200" v-if="reinvestAmount > 0">
            <h4 class="font-normal text-medium">Valor reinvestido</h4>
            <p class="font-bold font-muli">
                {{ useEURFormat(reinvestAmount) }}
            </p>
        </div>
        <div class="flex flex-row justify-between px-4 py-3 bg-slate-100">
            <h4 class="font-normal text-medium">
                Valor de realização	
            </h4>
            <p class="font-bold font-muli">
                {{ useEURFormat(sellValue) }}
            </p>
        </div>
        <div class="flex flex-row justify-between px-4 py-3 bg-slate-200">
            <h4 class="font-normal text-medium">Amortização do empréstimo</h4>
            <p class="font-bold font-muli">
                {{ useEURFormat(amortizationValue) }}
            </p>
        </div>
        <div class="flex flex-row justify-between px-4 py-3 bg-green-600">
            <h4 class="font-bold text-medium text-white">Isenção</h4>
            <p class="font-bold font-muli text-white">
                {{ (exemptionPercentage > 100) ? 100 : exemptionPercentage }} %
            </p>
        </div>
    </div>

    <div class="mb-10" v-if="exemptionPercentage <= 100">
        <h4 class="font-comfortaa mb-4 font-bold text-blue-600">
            Cálculo aproximado do Imposto a pagar
        </h4>
        <div class="flex flex-row justify-between px-4 py-3 bg-slate-200" id="imt-value">
            <h4 class="font-normal text-medium">Mais-valia</h4>
            <p class="font-bold font-muli">
                {{ useEURFormat(maisValiaValue) }}
            </p>
        </div>
        <div class="flex flex-row justify-between px-4 py-3 bg-slate-100" id="imt-value">
            <h4 class="font-normal text-medium">
                Art. 43º
            </h4>
            <p class="font-bold font-muli">
                * {{ (hasArtExemption === true) ? '100' : '50' }} %
            </p>
        </div>
        <div class="flex flex-row justify-between px-4 py-3 bg-slate-200" v-if="exemptionPercentage > 0 && amortization == true">
            <h4 class="font-normal text-medium">
                Isenção
            </h4>
            <p class="font-bold font-muli">
                - {{ exemptionPercentage }} %
            </p>
        </div>
        <div class="flex flex-row justify-between px-4 py-3 bg-green-600" id="imt-value">
            <h4 class="font-bold text-medium text-white">Mais-valia tributável</h4>
            <p class="font-bold font-muli text-white">
                {{ useEURFormat(taxableMaisValia) }}
            </p>
        </div>
    </div>

    <div v-if="Object.keys(taxCalculations).length > 0 && exemptionPercentage <= 100">
        <div class="flex flex-row justify-between gap-4 px-4 py-3 bg-slate-50" id="imt-value">
            <div></div>
            <div class="flex flex-row w-1/3 justify-end gap-4">
                <p class="font-medium font-muli text-right">
                    Sem mais-valia
                </p>
                <p class="font-bold font-muli text-right">
                    Com mais-valia
                </p>
            </div>
        </div>
        <div class="flex flex-row justify-between px-4 py-3 bg-slate-200">
            <h4 class="font-normal text-medium">Mais-valia tributável</h4>
            <div class="flex flex-row w-1/3 justify-end gap-4">
                <p class="font-bold font-muli pr-6">
                    -
                </p>
                <p class="font-bold font-muli">
                    {{ useEURFormat(taxableMaisValia) }}
                </p>
            </div>
        </div>

        <div class="flex flex-row justify-between px-4 py-3 bg-slate-100">
            <h4 class="font-normal text-medium">Rendimento coletável</h4>
            <div class="flex flex-row w-1/3 justify-end gap-4">
                <p class="font-bold font-muli  w-28 text-right">
                    {{ useEURFormat(taxCalculations.withoutMaisValia.taxableIncome) }}
                </p>
                <p class="font-bold font-muli w-28 text-right">
                    {{ useEURFormat(taxCalculations.withMaisValia.preCalculatedTotalIncome) }}
                </p>
            </div>
        </div>

        <div class="flex flex-row justify-between px-4 py-3 bg-slate-200">
            <h4 class="font-normal text-medium">Quociente conjugal</h4>
            <div class="flex flex-row w-1/3 justify-end gap-4">
                <p class="font-bold font-muli w-28 text-right">
                    ÷ {{ (isCouple === "true") ? "2" : "1" }}
                </p>
                <p class="font-bold font-muli w-28 text-right">
                    ÷ {{ (isCouple === "true") ? "2" : "1" }}
                </p>
            </div>
        </div>

        <div class="flex flex-row justify-between px-4 py-3 bg-slate-100">
            <h4 class="font-normal text-medium">Taxa de IRS	</h4>
            <div class="flex flex-row w-1/3 justify-end gap-4">
                <p class="font-bold font-muli w-28 text-right">
                    x {{ taxCalculations.withoutMaisValia.incomeTaxBracket.marginalRate }} %
                </p>
                <p class="font-bold font-muli w-28 text-right">
                    x {{ taxCalculations.withMaisValia.incomeTaxBracket.marginalRate }} %
                </p>
            </div>
        </div>

        <div class="flex flex-row justify-between px-4 py-3 bg-slate-200">
            <h4 class="font-normal text-medium">Parcela a abater</h4>
            <div class="flex flex-row w-1/3 justify-end gap-4">
                <p class="font-bold font-muli w-28 text-right">
                    - {{ useEURFormat(taxCalculations.withoutMaisValia.incomeTaxBracket.deduction) }}
                </p>
                <p class="font-bold font-muli w-28 text-right">
                    - {{ useEURFormat(taxCalculations.withMaisValia.incomeTaxBracket.deduction) }}
                </p>
            </div>
        </div>

        <div class="flex flex-row justify-between px-4 py-3 bg-slate-100">
            <h4 class="font-normal text-medium">Quociente conjugal</h4>
            <div class="flex flex-row w-1/3 justify-end gap-4">
                <p class="font-bold font-muli w-28 text-right">
                    x {{ (isCouple === "true") ? "2" : "1" }}
                </p>
                <p class="font-bold font-muli w-28 text-right">
                    x {{ (isCouple === "true") ? "2" : "1" }}
                </p>
            </div>
        </div>

        <div class="flex flex-row justify-between px-4 py-3 bg-slate-200">
            <h4 class="font-normal text-medium">Coleta</h4>
            <div class="flex flex-row w-1/3 justify-end gap-4">
                <p class="font-bold font-muli w-28 text-right">
                    = {{ useEURFormat(taxCalculations.withoutMaisValia.totalIRS) }}
                </p>
                <p class="font-bold font-muli w-28 text-right">
                    = {{ useEURFormat(taxCalculations.withMaisValia.totalIRS) }}
                </p>
            </div>
        </div>

        <div class="flex flex-row justify-between px-4 py-3 bg-green-600">
            <h4 class="font-bold text-medium text-white">Diferença (valor aproximado do "imposto correspondente" à mais-valia)	</h4>
            <p class="font-bold font-muli text-white">
                {{ useEURFormat(taxCalculations.withMaisValia.totalIRS - taxCalculations.withoutMaisValia.totalIRS) }}
            </p>
        </div>

    </div>

    <GenericInfo
    title="Mais-valia não dá lugar ao pagamento de imposto adicional"
    v-if="exemptionPercentage > 100"
    >
        <p>
            A mais-valia não dá lugar ao pagamento de imposto adicional, dado a isenção ser superior a 100%.
        </p>
    </GenericInfo>

</template>