<template>
  <div
    ref="canvasContainerRef"
    class="w-full h-full block touch-none overflow-hidden relative"
    :class="[cursor]"
  >
    <div
      ref="canvasRef"
      class="absloute origin-top-left inset-0"
      :style="{
        transform: `translate(${x}px, ${y}px) scale(${scale})`,
      }"
    >
      <div class="absolute z-50 size-60 bg-gray-400">
        aa
      </div>
    </div>
    <ToolBar :scale="scale" @on-zoom-in="zoomIn" @on-zoom-out="zoomOut" />
    <slot name="ui-extend" />
    <svg v-if="pattern" width="100%" height="100%">
      <pattern id="grid-dot-pattern" :width="patternGap * scale" :height="patternGap * scale" patternUnits="userSpaceOnUse" :patternTransform="`translate(${x},${y})`">
        <circle :cx="patternSize * scale" :cy="patternSize * scale" :r="patternSize * scale" :fill="patternColor" :fill-opacity="patternOpacity" />
      </pattern>
      <rect width="100%" height="100%" fill="url(#grid-dot-pattern)" />
    </svg>
  </div>
</template>

<script setup>
import { onMounted, ref } from 'vue'
import { useCanvas } from './useCanvas'
import ToolBar from './ToolBar.vue'

const props = defineProps({
  patternGap: {
    type: Number,
    default: 36,
  },
  patternColor: {
    type: String,
    default: '#060709',
  },
  patternOpacity: {
    type: Number,
    default: 0.2,
  },
  patternSize: {
    type: Number,
    default: 1.2,
  },
  pattern: {
    type: Boolean,
    default: true,
  },
  scaleMax: {
    type: Number,
    default: 2,
  },
  scaleMin: {
    type: Number,
    default: 0.1,
  },
  scaleStep: {
    type: Number,
    default: 0.1,
  },
})
const { canvasRef, canvasContainerRef, scale, cursor, x, y, zoomIn, zoomOut } = useCanvas(props)
</script>

<style>
</style>
