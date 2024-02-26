<script setup>
    import {ref, watch} from 'vue';
    import { useEURFormat } from '@/composables/useEURFormat';
    import GenericInfo from '@/components/GenericInfo.vue';

    defineProps({
        simulationData: Object
    });

    let emit = defineEmits(['update:modelValue']);

    const taxSettings = ref({
        soldToState: 'false',
        livedInHouse: 'true',
        hadPreviousExemption: 'false',
        didBuildHouse: 'false',
        reinvestInHPP: 'false',
        amortizationHPP: 'false',
        amortizationHPPAmount: 0,
        amountPaidToBank: 0,
        reinvestmentAmount: 0,
        coupleTax: 'false',
        totalIRS: 0,
        govermentAid: 'false',
        govermentAidYear: new Date().getFullYear(),
        govermentAidMonth: '1'
    });

    watch(taxSettings, (newValue) => {
        emit('update:modelValue', newValue);
    }, {deep: true});

</script>

<template>
    <div class="py-6 px-4 bg-slate-50 border-2 border-red-900 rounded-md" id="imt-form">
        <h3 class="mb-2 font-comfortaa font-bold text-xl">
            Dados para apuramento de Imposto a pagar pela mais-valia ({{ useEURFormat(simulationData.totalProfit)  }})
        </h3>
        <h5 class="font-comfortaa font-medium text-lg mb-5">Apuramento da isenção de tributação sobre a mais-valia</h5>
        <form>
            <div class="flex flex-col mb-6">

                <div class="w-100 pb-8">
                    <label class="font-comfortaa font-muli font-medium pb-4 block" for="purchaseprice">
                        A venda deste imóvel para habitação foi feita ao Estado, às Regiões Autónomas, às entidades públicas empresariais na área da habitação ou às autarquias locais?
                    </label>
                    <div class="inline-flex gap-4">
                        <div class="relative flex flex-row justify-center items-center">
                            <input 
                            type="radio"
                            name="soldToState"
                            id="soldToStateTrue"
                            v-model="taxSettings.soldToState"
                            value=true
                            class="pr-11 font-comfortaa max-w-full text-sm w-full px-2 py-2 rounded-md border-2 border-gray-200 focus:outline-brand-red"
                            />
                            <label for="soldToStateTrue" class="pl-2">Sim</label>
                        </div>
                        <div class="relative flex flex-row justify-center items-center">
                            <input
                            type="radio"
                            name="soldToState"
                            id="soldToStateFalse"
                            v-model="taxSettings.soldToState"
                            value=false
                            class="pr-11 font-comfortaa max-w-full text-sm w-full px-2 py-2 rounded-md border-2 border-gray-200 focus:outline-brand-red"
                            />
                            <label for="soldToStateFalse" class="pl-2">Não</label>
                        </div>
                    </div>
                </div>

                <div class="w-100 pb-8" v-if="taxSettings.soldToState == 'false'">
                    <label class="font-comfortaa font-muli font-medium pb-4 block" for="purchaseprice">
                        O imóvel vendido era a sua morada fiscal ou do seu agregado familiar há, pelo menos, 24 meses?
                    </label>
                    <div class="inline-flex gap-4">
                        <div class="relative flex flex-row justify-center items-center">
                            <input 
                            type="radio"
                            name="livedInHouse"
                            id="livedInHouseTrue"
                            value="true"
                            v-model="taxSettings.livedInHouse"
                            class="pr-11 font-comfortaa max-w-full text-sm w-full px-2 py-2 rounded-md border-2 border-gray-200 focus:outline-brand-red"
                            />
                            <label for="livedInHouseTrue" class="pl-2">Sim</label>
                        </div>
                        <div class="relative flex flex-row justify-center items-center">
                            <input
                            type="radio"
                            name="livedInHouse"
                            id="livedInHouseLess"
                            value="livedLessThan24Months"
                            v-model="taxSettings.livedInHouse"
                            class="pr-11 font-comfortaa max-w-full text-sm w-full px-2 py-2 rounded-md border-2 border-gray-200 focus:outline-brand-red"
                            />
                            <label for="livedInHouseLess" class="pl-2 min-w-full">Não, é há menos de 24 meses</label>
                        </div>
                        <div class="relative flex flex-row justify-center items-center">
                            <input
                            type="radio"
                            name="livedInHouse"
                            id="livedInHouseFalse"
                            value="false"
                            v-model="taxSettings.livedInHouse"
                            class="pr-11 font-comfortaa max-w-full text-sm w-full px-2 py-2 rounded-md border-2 border-gray-200 focus:outline-brand-red"
                            />
                            <label for="livedInHouseFalse" class="pl-2 min-w-full">Não, é uma segunda habitação</label>
                        </div>
                    </div>
                </div>

                <div class="w-100 pb-8" v-if="taxSettings.soldToState == 'false' && taxSettings.livedInHouse == 'false' ">
                    <label class="font-comfortaa font-muli font-medium pb-4 block" for="purchaseprice">
                        Vai amortizar o crédito da sua habitação própria permanente ou de um descendente? 
                    </label>
                    <div class="inline-flex gap-4">
                        <div class="relative flex flex-row justify-center items-center">
                            <input 
                            type="radio"
                            name="amortizationHPP"
                            id="amortizationHPPTrue"
                            value="true"
                            v-model="taxSettings.amortizationHPP"
                            class="pr-11 font-comfortaa max-w-full text-sm w-full px-2 py-2 rounded-md border-2 border-gray-200 focus:outline-brand-red"
                            />
                            <label for="amortizationHPPTrue" class="pl-2">Sim</label>
                        </div>
                        <div class="relative flex flex-row justify-center items-center">
                            <input
                            type="radio"
                            name="amortizationHPP"
                            id="amortizationHPPFalse"
                            v-model="taxSettings.amortizationHPP"
                            value="false"
                            class="pr-11 font-comfortaa max-w-full text-sm w-full px-2 py-2 rounded-md border-2 border-gray-200 focus:outline-brand-red"
                            />
                            <label for="amortizationHPPFalse" class="pl-2">Não</label>
                        </div>
                    </div>
                    <div class="relative flex flex-col mt-3" v-if="taxSettings.amortizationHPP == 'true'">
                        <label for="amortizationAmountHPP" class="pb-2">Valor amortizado ao empréstimo de uma HPP </label>
                        <input 
                        type="text"
                        name="amortizationAmountHPP"
                        id="amortizationAmountHPPe"
                        v-model="taxSettings.amortizationHPPAmount"
                        class="pr-11 font-comfortaa max-w-full text-sm w-1/3 px-2 py-2 rounded-md border-2 border-gray-200 focus:outline-brand-red"
                        />
                    </div>
                </div>

                <div class="w-100 pb-8" v-if="taxSettings.soldToState == 'false' && taxSettings.livedInHouse == 'true' ">
                    <label class="font-comfortaa font-muli font-medium pb-4 block" for="purchaseprice">
                        Beneficiou nos últimos três anos de isenção de mais-valias imobiliárias?
                    </label>
                    <div class="inline-flex gap-4">
                        <div class="relative flex flex-row justify-center items-center">
                            <input 
                            type="radio"
                            name="hadPreviousExemption"
                            id="hadPreviousExemptionTrue"
                            value="true"
                            v-model="taxSettings.hadPreviousExemption"
                            class="pr-11 font-comfortaa max-w-full text-sm w-full px-2 py-2 rounded-md border-2 border-gray-200 focus:outline-brand-red"
                            />
                            <label for="hadPreviousExemptionTrue" class="pl-2">Sim</label>
                        </div>
                        <div class="relative flex flex-row justify-center items-center">
                            <input
                            type="radio"
                            name="hadPreviousExemption"
                            id="hadPreviousExemptionFalse"
                            value="false"
                            v-model="taxSettings.hadPreviousExemption"
                            class="pr-11 font-comfortaa max-w-full text-sm w-full px-2 py-2 rounded-md border-2 border-gray-200 focus:outline-brand-red"
                            />
                            <label for="hadPreviousExemptionFalse" class="pl-2">Não</label>
                        </div>
                    </div>
                </div>

                <div class="w-100 pb-8" v-if="taxSettings.soldToState == 'false' && taxSettings.livedInHouse == 'true' && taxSettings.hadPreviousExemption == 'false' ">
                    <label class="font-comfortaa font-muli font-medium pb-4 block" for="purchaseprice">
                        A habitação foi construída por si? 
                    </label>
                    <div class="inline-flex gap-4">
                        <div class="relative flex flex-row justify-center items-center">
                            <input 
                            type="radio"
                            name="didBuildHouse"
                            id="didBuildHouseTrue"
                            value="true"
                            v-model="taxSettings.didBuildHouse"
                            class="pr-11 font-comfortaa max-w-full text-sm w-full px-2 py-2 rounded-md border-2 border-gray-200 focus:outline-brand-red"
                            />
                            <label for="didBuildHouseTrue" class="pl-2">Sim</label>
                        </div>
                        <div class="relative flex flex-row justify-center items-center">
                            <input
                            type="radio"
                            name="didBuildHouse"
                            id="didBuildHouseFalse"
                            value="false"
                            v-model="taxSettings.didBuildHouse"
                            class="pr-11 font-comfortaa max-w-full text-sm w-full px-2 py-2 rounded-md border-2 border-gray-200 focus:outline-brand-red"
                            />
                            <label for="didBuildHouseFalse" class="pl-2">Não</label>
                        </div>
                    </div>
                </div>

                <div class="w-100 pb-8" v-if="taxSettings.soldToState == 'false' && taxSettings.livedInHouse == 'true'  && taxSettings.hadPreviousExemption == 'false' ">
                    <label class="font-comfortaa font-muli font-medium pb-4 block" for="purchaseprice">
                        Pretende reinvestir o dinheiro noutra HPP e/ou, estando reformado ou tendo mais de 65 anos, pretende reinvestir num contrato de seguro, num fundo de pensões aberto ou contribuir para o regime público de capitalização?
                    </label>
                    <div class="inline-flex gap-4">
                        <div class="relative flex flex-row justify-center items-center">
                            <input 
                            type="radio"
                            name="reinvestInHPP"
                            id="reinvestInHPPTrue"
                            v-model="taxSettings.reinvestInHPP"
                            value="true"
                            class="pr-11 font-comfortaa max-w-full text-sm w-full px-2 py-2 rounded-md border-2 border-gray-200 focus:outline-brand-red"
                            />
                            <label for="reinvestInHPPTrue" class="pl-2">Sim</label>
                        </div>
                        <div class="relative flex flex-row justify-center items-center">
                            <input
                            type="radio"
                            name="reinvestInHPP"
                            id="reinvestInHPPFalse"
                            v-model="taxSettings.reinvestInHPP"
                            value="false"
                            class="pr-11 font-comfortaa max-w-full text-sm w-full px-2 py-2 rounded-md border-2 border-gray-200 focus:outline-brand-red"
                            />
                            <label for="reinvestInHPPFalse" class="pl-2">Não</label>
                        </div>
                    </div>

                    <div class="flex flex-row gap-4" v-if="taxSettings.reinvestInHPP == 'true'">
                        <div class="relative flex flex-col mt-3 w-1/2">
                            <label for="amortizationAmountHPP" class="pb-2">Valor amortizado ao empréstimo do imóvel alienado</label>
                            <input 
                            type="text"
                            name="amortizationAmountHPP"
                            id="amortizationAmountHPPe"
                            v-model="taxSettings.amountPaidToBank"
                            class="pr-11 font-comfortaa max-w-full text-sm w-full px-2 py-2 rounded-md border-2 border-gray-200 focus:outline-brand-red"
                            />
                        </div>
                        <div class="relative flex flex-col mt-3 w-1/2">
                            <label for="amortizationAmountHPP" class="pb-2">Montante que pretende reinvestir </label>
                            <input 
                            type="text"
                            name="amortizationAmountHPP"
                            id="amortizationAmountHPPe"
                            v-model="taxSettings.reinvestmentAmount"
                            class="pr-11 font-comfortaa max-w-full text-sm w-full px-2 py-2 rounded-md border-2 border-gray-200 focus:outline-brand-red"
                            />
                        </div>
                    </div>

                </div>

                <div class="w-100 pb-8" >
                    <h4 class="font-comfortaa mb-4 text-lg text-brand-red font-bold">Dados para o cálculo do Imposto a pagar</h4>
                    <label class="font-comfortaa font-muli font-medium pb-4 block" for="purchaseprice">
                        Declaração conjunta
                    </label>
                    <div class="inline-flex gap-4">
                        <div class="relative flex flex-row justify-center items-center">
                            <input 
                            type="radio"
                            name="coupleTax"
                            id="coupleTaxTrue"
                            v-model="taxSettings.coupleTax"
                            value="true"
                            class="pr-11 font-comfortaa max-w-full text-sm w-full px-2 py-2 rounded-md border-2 border-gray-200 focus:outline-brand-red"
                            />
                            <label for="coupleTaxTrue" class="pl-2">Sim</label>
                        </div>
                        <div class="relative flex flex-row justify-center items-center">
                            <input
                            type="radio"
                            name="coupleTax"
                            id="coupleTaxFalse"
                            v-model="taxSettings.coupleTax"
                            value="false"
                            class="pr-11 font-comfortaa max-w-full text-sm w-full px-2 py-2 rounded-md border-2 border-gray-200 focus:outline-brand-red"
                            />
                            <label for="coupleTaxFalse" class="pl-2">Não</label>
                        </div>
                    </div>

                    <div class="flex flex-row gap-4">
                        <div class="relative flex flex-col mt-3 w-1/2">
                            <label for="totalIRS" class="pb-2">Rendimento Anual Coletável para IRS</label>
                            <input 
                            type="text"
                            name="totalIRS"
                            id="totalIRS"
                            v-model="taxSettings.totalIRS"
                            class="pr-11 font-comfortaa max-w-full text-sm w-full px-2 py-2 rounded-md border-2 border-gray-200 focus:outline-brand-red"
                            />
                        </div>
                    </div>

                </div>

                <div class="w-100 pb-8">
                    <label class="font-comfortaa font-muli font-medium pb-4 block">
                        Relativamente ao imóvel alienado, beneficiou de apoio não reembolsável concedido pelo Estado ou outras entidades públicas para a aquisição, construção, reconstrução ou realização de obras de conservação de valor superior a 30% do valor patrimonial tributário do imóvel? 
                    </label>
                    <div class="inline-flex gap-4">
                        <div class="relative flex flex-row justify-center items-center">
                            <input 
                            type="radio"
                            name="govermentaid"
                            id="govermentAidTrue"
                            v-model="taxSettings.govermentAid"
                            value="true"
                            class="pr-11 font-comfortaa max-w-full text-sm w-full px-2 py-2 rounded-md border-2 border-gray-200 focus:outline-brand-red"
                            />
                            <label for="govermentAidTrue" class="pl-2">Sim</label>
                        </div>
                        <div class="relative flex flex-row justify-center items-center">
                            <input
                            type="radio"
                            name="govermentaid"
                            id="govermentAidFalse"
                            v-model="taxSettings.govermentAid"
                            value="false"
                            class="pr-11 font-comfortaa max-w-full text-sm w-full px-2 py-2 rounded-md border-2 border-gray-200 focus:outline-brand-red"
                            />
                            <label for="govermentAidFalse" class="pl-2">Não</label>
                        </div>
                    </div>

                    <div class="flex flex-row gap-4" v-if="taxSettings.govermentAid == 'true'">
                        <div class="relative flex flex-col mt-3 w-1/2">
                            <label for="govermentAidYear" class="pb-2">Ano</label>
                            <select 
                            class="font-comfortaa max-w-full w-full px-2 py-2 rounded-md border-2 border-gray-200 focus:outline-brand-red text-sm" 
                            name="govermentAidYear" 
                            id="govermentAidYear"
                            v-model="taxSettings.govermentAidYear"
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
                        <div class="relative flex flex-col mt-3 w-1/2">
                            <label for="govermentAidYear" class="pb-2">Mês</label>
                            <select 
                            class="font-comfortaa max-w-full w-full px-2 py-2 rounded-md border-2 border-gray-200 focus:outline-brand-red text-sm" 
                            name="govermentAidMonth" 
                            id="govermentAidMonth"
                            v-model="taxSettings.govermentAidMonth"
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

                </div>
                
            </div>
        </form>
        <GenericInfo
        title="Venda de um imóvel para habitação ao Estado, às Regiões Autónomas, às entidades públicas empresariais na área da habitação ou às autarquias locais."
        id="sellToStateWarning"
        v-if="taxSettings.soldToState == 'true'"
        >
            <p class="font-comfortaa mb-3 text-sm font-semibold">
                Os ganhos provenientes da venda de imóveis para habitação ao Estado, às Regiões Autónomas, às entidades públicas empresariais na área da habitação ou às autarquias locais estão isentos de tributação em IRS e IRC, com duas exceções:
            </p>
            <ul class="list-disc pl-7 mb-3">
                <li class="font-comfortaa mb-2 text-sm font-semibold">os ganhos realizados por residentes com domicílio fiscal em país, território ou região sujeito a um regime fiscal mais favorável, constante de lista aprovada por portaria do membro do Governo responsável pela área das finanças;</li>
                <li class="font-comfortaa mb-2 text-sm font-semibold">os ganhos decorrentes de alienações onerosas através do exercício de direito de preferência.</li>
            </ul>
            <p><strong>Atenção:</strong> Os rendimentos auferidos com estas vendas, apesar de ficarem isentos do pagamento de tributação de mais-valias, são englobados em sede de IRS para determinação da taxa a aplicar aos restantes rendimentos.</p>
        </GenericInfo>
     </div>
</template>