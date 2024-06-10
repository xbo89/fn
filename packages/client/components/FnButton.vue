<template>
  <div
    class="border rounded-lg px-3 p-1 font-medium cursor-pointer flex items-center space-x-2 hover:bg-gray-100 text-sm bg-white">
    <i :class="icon" class="text-base"></i>
    <span v-if="slotDefault">
      <slot />
    </span>
  </div>
</template>
<script setup>
  const slotDefault = !!useSlots().default;
  const props = defineProps({
    icon: String
  })
</script>
<style>

</style>