<template>
  <UContainer :ui="{
    base: 'flex h-full',
    padding: 'p-0 sm:px-0 lg:px-0',
    constrained: 'max-w-5xl',
  }">
    <Sidebar />
    <div class="w-full h-full relative overflow-hidden">
      <NuxtPage />
    </div>
  </UContainer>
</template>
<script setup>

</script>