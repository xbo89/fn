<template>
  <div ref="canvasContainer" class="w-full h-full block touch-none" :class="[cursorStyle]">
    <div
      ref="scrollableElement" class="fixed touch-none origin-top-left top-0 left-0" :style="{

        transform: `translate(${originX}px, ${originY}px) scale(${canvasScale})`,
      }"
    >
      <div class="z-50 size-60 bg-red-400">
        aa
      </div>
      <svg class="absolute left-0 top-0" style="height: 100%; width: 100%;"><pattern id="pattern-vue-flow-0" x="-5.691166989039337" y="0.9687298517085381" width="9.38749194068343" height="9.38749194068343" patternTransform="translate(-0.2933591231463572,-0.2933591231463572)" patternUnits="userSpaceOnUse"><circle cx="0.2933591231463572" cy="0.2933591231463572" r="0.2933591231463572" fill="#aaa" /><!----></pattern><rect x="0" y="0" width="100%" height="100%" fill="url(#pattern-vue-flow-0)" /></svg>
    </div>
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
const { scrollableElement, canvasContainer, canvasScale, cursorStyle, originX, originY } = documentGestureBase(props)
</script>

<style>
</style>
