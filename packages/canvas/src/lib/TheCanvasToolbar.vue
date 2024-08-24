<template>
  <div class="canvas-toolbar select-none absolute right-4 bottom-4 border rounded-lg p-1 flex items-center space-x-2 bg-white">
    <button class="size-8 hover:bg-gray-200 rounded-md flex justify-center items-center text-xl" @click="zoomIn">
      <i class="i-ri-add-line" />
    </button>
    <span class="text-sm w-10 text-center pointer-events-none">{{ parseInt(canvasBase.scale * 100) }}%</span>
    <button class="size-8 hover:bg-gray-200 rounded-md flex justify-center items-center text-xl" @click="zoomOut">
      <i class="i-ri-subtract-line" />
    </button>
  </div>
</template>

<script setup>
import { storeToRefs } from 'pinia'
import { useCanvasStore } from '@/useStore/useCanvasStore.js'

const emits = defineEmits(['onZoomIn', 'onZoomOut'])
const store = useCanvasStore()
const { canvasBase } = storeToRefs(store)
function zoomIn() {
  emits('onZoomIn')
}
function zoomOut() {
  emits('onZoomOut')
}
</script>
