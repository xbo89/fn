<template>
  <UContainer :ui="{
    base: 'flex h-full lg:border-x lg:border-gray-200 lg:dark:border-gray-800',
    padding: 'p-0 sm:px-0 lg:px-0',
    constrained: 'max-w-5xl',
  }">
    <!-- <div class="list w-full h-full flex"> -->
    <Sidebar />
    <div class="w-full h-full relative overflow-hidden">
      <NuxtPage />
    </div>
    <!-- </div> -->
  </UContainer>
</template>
<script setup>

</script>