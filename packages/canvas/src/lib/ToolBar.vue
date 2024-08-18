<template>
  <div class="canvas-toolbar absolute right-4 bottom-4 border rounded-lg p-1 flex items-center space-x-2 bg-white">
    <button class="size-8 hover:bg-gray-200 rounded-md flex justify-center items-center text-xl" @click="zoomIn">
      <i class="i-ri-add-line" />
    </button>
    <span class="text-sm w-10 text-center pointer-events-none">{{ parseInt(scale * 100) }}%</span>
    <button class="size-8 hover:bg-gray-200 rounded-md flex justify-center items-center text-xl" @click="zoomOut">
      <i class="i-ri-subtract-line" />
    </button>
  </div>
</template>

<script setup>
defineProps({
  scale: {
    type: Number,
    default: 1,
  },
})
const emits = defineEmits(['onZoomIn', 'onZoomOut'])
function zoomIn() {
  emits('onZoomIn')
}
function zoomOut() {
  emits('onZoomOut')
}
</script>
