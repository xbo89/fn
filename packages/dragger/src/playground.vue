<template>
  <div class="w-[800px] h-[800px] bg-slate-200 pt-1 mx-auto flex justify-center items-center">
    <div class=" relative w-[600px] h-[600px] bg-slate-300 overflow-hidden border border-blue-600">
      <DraggerPlugin />
    </div>
  </div>
</template>

<script setup lang="ts">
import DraggerPlugin from './lib/plugin.vue'
</script>

<style scoped>

</style>
