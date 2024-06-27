<template>
  <div class="text-sm px-2 py-1 bg-white flex items-center rounded-lg space-x-2 cursor-pointer hover:bg-gray-100"
    :class="[active&&'bg-primary-500 text-white hover:bg-primary-400']">
    <i :class="icon"></i>
    <span>
      <slot />
    </span>
  </div>
</template>
<script setup>
  defineProps({
    icon: {
      type: String,
      default: ''
    },
    active: {
      type: Boolean,
      default: false
    }
  })
</script>
<style>

</style>