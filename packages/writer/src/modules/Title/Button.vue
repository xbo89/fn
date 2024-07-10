<template>
  <div
    class="border text-sm px-2.5 py-1 bg-white flex items-center rounded-lg space-x-2 cursor-pointer hover:bg-gray-100"
    :class="[active&&'text-primary-500 hover:bg-primary-100 ']">
    <i :class="[icon,active?'':'text-gray-500']"></i>
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