<template>
  <div class="flex items-center justify-between px-2 py-1 hover:bg-gray-200 rounded-md w-52 text-base cursor-pointer">
    <div class="flex items-center space-x-2 text-gray-600">
      <i class="text-gray-500" :class="[icon]" />
      <span class="title "><slot /></span>
    </div>
    <span v-if="hotkey !== ''" class="hotkey text-gray-400 text-xs">{{ hotkey }}</span>
  </div>
</template>

<script setup>
defineProps({
  icon: {
    type: String,
    default: 'ri-square-line',
    required: false,
  },
  hotkey: {
    type: String,
    default: '',
    required: false,
  },
})
</script>
