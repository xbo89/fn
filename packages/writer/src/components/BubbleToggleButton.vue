<template>
  <div class="h-8 rounded-md hover:bg-gray-200 flex justify-center items-center cursor-pointer  flex-shrink-0"
    :class="[hasChild?'w-10':'w-8']">
    <i :class="[icon, 'text-xl']"></i>
    <div v-if="hasChild" class="i-ri-arrow-down-s-line text-gray-500"></div>
  </div>
</template>
<script setup>
  defineProps({
    icon: {
      type: String,
      default: 'i-ri-compass-2-line'
    },
    hasChild: {
      type: Boolean,
      default: false
    }
  })
</script>