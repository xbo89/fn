<template>
  <div ref="canvasContainerRef" class="w-full h-full block touch-none overflow-hidden relative" :class="[cursorStyle]">
    <div
      ref="canvasRef" class="absloute origin-top-left inset-0" :style="{
        transform: `translate(${x}px, ${y}px) scale(${scale})`,
      }"
    >
      <div class="absolute z-50 size-60 bg-gray-400">
        aa
      </div>
    </div>

    <svg width="100%" height="100%">
      <pattern id="grid-dot-pattern" :width="20 * scale" :height="20 * scale" patternUnits="userSpaceOnUse" :patternTransform="`translate(${x},${y})`">
        <circle :cx="scale" :cy="scale" :r=" scale" fill-opacity="0.2" />
      </pattern>
      <rect width="100%" height="100%" fill="url(#grid-dot-pattern)" />
    </svg>
  </div>
</template>

<script setup>
import { onMounted, ref } from 'vue'
import { useCanvas } from './useCanvas'

const { canvasRef, canvasContainerRef, scale, cursorStyle, x, y } = useCanvas()
</script>

<style>
</style>
