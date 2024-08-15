<template>
  <div ref="canvasContainer" class="w-full h-full block touch-none" :class="[cursorStyle]">
    <div
      ref="scrollableElement" class="fixed touch-none origin-top-left top-0 left-0" :style="{
        transform: `translate(${originX}px, ${originY}px) scale(${canvasScale})`,
      }"
    >
      <div class="absolute z-50 size-60 bg-gray-400">
        aa
      </div>
    </div>

    <svg width="100%" height="100%">
      <pattern id="grid-dot-pattern" :width="20 * canvasScale" :height="20 * canvasScale" patternUnits="userSpaceOnUse" :patternTransform="`translate(${originX},${originY})`">
        <circle :cx="canvasScale" :cy="canvasScale" :r=" canvasScale" fill-opacity="0.2" />
      </pattern>
      <rect width="100%" height="100%" fill="url(#grid-dot-pattern)" />
    </svg>
  </div>
</template>

<script setup>
import { onMounted, ref } from 'vue'
import { documentGestureBase } from './useCanvas'

const props = defineProps({
  width: {
    type: Number,
    default: 12500,
  },
  height: {
    type: Number,
    default: 12500,
  },
})
const { scrollableElement, canvasContainer, canvasScale, cursorStyle, originX, originY, patternX, patternY, patternSize, patternTransform } = documentGestureBase(props)
</script>

<style>
</style>
