<template>
  <div
    v-if="selectionArea.enable"
    :style="{
      width: `${selectionArea.size.w}px`,
      height: `${selectionArea.size.h}px`,
      transform: `translate(${selectionArea.position.x}px,${selectionArea.position.y}px)`,
      borderWidth: `${1 / canvasBase.scale}px`,
      borderRadius: `${3 / canvasBase.scale}px`,
    }"
    class="border border-blue-600 bg-blue-600/10 fixed left-0 top-0 pointer-events-none origin-top-left z-50"
  />
</template>

<script setup>
import { storeToRefs } from 'pinia'
import { useCanvasStore } from '@/useStore/useCanvasStore.js'

const store = useCanvasStore()
const { selectionArea, canvasBase } = storeToRefs(store)
</script>
