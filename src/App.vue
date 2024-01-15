<script setup>
import { RouterView } from 'vue-router'
</script>

<template>
  <div class="flex flex-row mb-5 gap-3 items-center justify-center">
    <RouterLink to="/">IMT</RouterLink>
    <RouterLink to="/mais-valias">Mais Valias</RouterLink>
  </div>
  <RouterView />
</template>
