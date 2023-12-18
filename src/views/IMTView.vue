<script setup>
  import IMTForm from '@/components/imt/IMTForm.vue';
  import IMTDetails from '@/components/imt/IMTDetails.vue';
  import { ref } from 'vue';

  let calculationData = ref({});

</script>

<template>
  <div class="pt-9 min-h-screen flex flex-wrap flex-col items-center">
    <div class="max-w-xl">
      <IMTForm v-model="calculationData" />
      <IMTDetails class="mt-6" v-if="calculationData.total > 0" :simulationData="calculationData" />
    </div>
  </div>
</template>