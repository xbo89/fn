<template>
  <div class="canvas-toolbar absolute right-4 bottom-4 border rounded-lg p-1 flex items-center space-x-2 bg-white">
    <button class="size-6 bg-gray-50 rounded-md" @click="zoomIn">
      +
    </button>
    <span class="text-sm w-10 text-center">{{ parseInt(scale * 100) }}%</span>
    <button class="size-6 bg-gray-50 rounded-md" @click="zoomOut">
      -
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
