<script setup>
  import MaisValiasForm from '@/components/mais-valias/MaisValiasForm.vue';
  import MaisValiasDetails from '@/components/mais-valias/MaisValiasDetails.vue';
  import { ref } from 'vue';

  let calculationData = ref({});

</script>

<template>
  <div class="pt-9 min-h-screen flex flex-wrap flex-col items-center">
    <div class="max-w-4xl">
      <MaisValiasForm v-model="calculationData" />
      <MaisValiasDetails class="mt-6" v-if="calculationData.purchaseCost > 0 && calculationData.sellValue > 0" :simulationData="calculationData" />
    </div>
  </div>
</template>