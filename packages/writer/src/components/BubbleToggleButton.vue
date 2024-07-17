<template>
  <div
    class="h-8 rounded-md hover:bg-gray-200 hover:dark:bg-gray-900 flex justify-center items-center cursor-pointer  flex-shrink-0"
    :class="[hasChild ? 'w-10' : 'w-8', active && 'bg-gray-50 hover:bg-primary-50 text-primary-500']"
  >
    <i class="text-xl" :class="[icon, active && 'text-primary-500']" />
    <div v-if="hasChild" class="i-ri-arrow-down-s-line text-gray-500" />
  </div>
</template>

<script setup>
defineProps({
  icon: {
    type: String,
    default: 'i-ri-compass-2-line',
  },
  hasChild: {
    type: Boolean,
    default: false,
  },
  active: {
    type: Boolean,
    default: false,
    required: false,
  },
})
</script>
