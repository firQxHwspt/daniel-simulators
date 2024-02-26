<script setup>
    defineProps({
        title: String
    });
</script>

<template>
    <div class="py-6 px-4 bg-blue-500 border-2 border-blue-500 rounded-md text-white">
        <h3 class="font-comfortaa text-lg font-bold mb-6">
            {{ title }}
        </h3>
        <div id="message">
            <slot></slot>
        </div>
    </div>
</template>