<template>
  <div ref="target" class="dragger-plugin size-12 bg-slate-300" :style="{ transform: `translate(${position.x}px, ${position.y}px)` }">
    <slot />
    <div
      class="resize-handle-border absolute top !w-full left-1/2 transform -translate-x-1/2 cursor-ns-resize"
      :style="{
        height: `${config.handleSize}px`,
        top: `-${config.handleSize / 2 + 2}px`,
        background: `${debugMode && '#b942745f'}`,
      }"
      @pointerdown.stop.prevent="resizeStart($event, 'top')"
    />
    <div
      class="resize-handle-border absolute bottom !w-full left-1/2 transform -translate-x-1/2 cursor-ns-resize"
      :style="{
        height: `${config.handleSize}px`,
        bottom: `-${config.handleSize / 2 + 2}px`,
        background: `${debugMode && '#b942745f'}`,
      }"
      @pointerdown.stop.prevent="resizeStart($event, 'bottom')"
    />
    <div
      class="resize-handle-border absolute left !h-full top-1/2 transform -translate-y-1/2 cursor-ew-resize"
      :style="{
        width: `${config.handleSize}px`,
        left: `-${config.handleSize / 2 + 2}px`,
        background: `${debugMode && '#b942745f'}`,
      }"
      @pointerdown.stop.prevent="resizeStart($event, 'left')"
    />
    <div
      class="resize-handle-border absolute right !h-full top-1/2 transform -translate-y-1/2 cursor-ew-resize"
      :style="{
        width: `${config.handleSize}px`,
        right: `-${config.handleSize / 2 + 2}px`,
        background: `${debugMode && '#b942745f'}`,
      }"
      @pointerdown.stop.prevent="resizeStart($event, 'right')"
    />
    <!-- 各个角的 resize handle -->
    <div
      class="resize-handle-corner size-4 absolute top-left cursor-nwse-resize"
      :style="{
        top: `-${config.handleSize / 2 + 2}px`,
        left: `-${config.handleSize / 2 + 2}px`,
        background: `${debugMode && '#0d622d5f'}`,
      }"
    />
    <div
      class="resize-handle-corner size-4 absolute top-right cursor-nesw-resize"
      :style="{
        top: `-${config.handleSize / 2 + 2}px`,
        right: `-${config.handleSize / 2 + 2}px`,
        background: `${debugMode && '#0d622d5f'}`,
      }"
      @pointerdown.stop.prevent="resizeStart($event, 'top-right')"
    />
    <div
      class="resize-handle-corner size-4 absolute bottom-left cursor-nesw-resize"
      :style="{
        bottom: `-${config.handleSize / 2 + 2}px`,
        left: `-${config.handleSize / 2 + 2}px`,
        background: `${debugMode && '#0d622d5f'}`,
      }"
      @pointerdown.stop.prevent="resizeStart($event, 'bottom-left')"
    />
    <div
      class="resize-handle-corner size-4 absolute bottom-right cursor-nwse-resize"
      :style="{
        bottom: `-${config.handleSize / 2 + 2}px`,
        right: `-${config.handleSize / 2 + 2}px`,
        background: `${debugMode && '#0d622d5f'}`,
      }"
      @pointerdown.stop.prevent="resizeStart($event, 'bottom-right')"
    />
  </div>
</template>

<script setup>
import { onMounted, reactive, ref } from 'vue'
import { useDragger } from './useDragger'

const props = defineProps({
  enable: {
    type: Boolean,
    default: true,
  },
  scale: {
    type: Number,
    default: 1,
  },
  debugMode: {
    type: Boolean,
    default: true,
  },
  config: {
    type: Object,
    default: () => {
      return {
        handleSize: 16,
        radius: 8,
      }
    },
  },
})

const emit = defineEmits(['moveStart', 'move', 'moveEnd'])

const target = ref(null)
const position = reactive({
  x: 110,
  y: 110,
})

onMounted(() => {
  useDragger({
    enable: props.enable,
    target: target.value,
    onMoveStart: (event, start) => {
      emit('moveStart', event, start)
    },
    onMove: (event, delta) => {
      position.x = delta.x
      position.y = delta.y
      emit('move', event, delta)
    },
    onMoveEnd: (event) => {
      emit('moveEnd', event)
    },
  })
})
</script>
