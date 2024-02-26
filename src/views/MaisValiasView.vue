<script setup>
  import MaisValiasForm from '@/components/mais-valias/MaisValiasForm.vue';
  import MaisValiasDetails from '@/components/mais-valias/MaisValiasDetails.vue';
  import MaisValiaTaxSettings from '@/components/mais-valias-taxes/MaisValiasTaxSettings.vue';
  import MaisValiaTaxes from '@/components/mais-valias-taxes/MaisValiasTaxes.vue';

  import { ref } from 'vue';

  let calculationData = ref({});
  let taxSettings = ref({});

</script>

<template>
  <div class="pt-9 flex flex-wrap flex-col items-center">
    <div class="max-w-4xl w-5/6">
      <div id="mais-valia-info">
        <MaisValiasForm v-model="calculationData" />
        <MaisValiasDetails 
          class="mt-6"
          v-if="calculationData.purchaseCost > 0 && calculationData.sellValue > 0" 
          :simulationData="calculationData" 
        />
      </div>
      <div id="mais-valia-taxes">
        <MaisValiaTaxSettings 
        class="mt-6"
        v-if="calculationData.totalProfit > 0"
        :simulationData="calculationData"
        v-model="taxSettings"
        />
        <MaisValiaTaxes
        class="mt-6"
        v-if="calculationData.totalProfit > 0"
        :simulationData="calculationData"
        :taxSettings="taxSettings"
        />
      </div>
    </div>
  </div>
</template>