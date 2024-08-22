<template>
  <div
    ref="containerRef"
    class="absolute box-border"
    :class="[isSelect ? 'outline outline-2 outline-blue-600' : '']"
    :style="style"
  >
    <slot
      :pointer-down="dragStart"
      :scale="scale"
      cursor-style="cursor-grab active:cursor-grabbing select-none"
    />
    <template v-if="isSelect">
      <!-- 各个边的 resize handle -->
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
        @pointerdown.stop.prevent="resizeStart($event, 'top-left')"
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
    </template>
  </div>
</template>

<script setup>
import { inject, ref } from 'vue'
import { useResize } from './useCardContainer'

const props = defineProps({
  pos: {
    type: Object,
    default: () => {
      return {
        x: 0,
        y: 0,
      }
    },
  },
  size: {
    type: Object,
    default: () => {
      return {
        w: 360,
        h: 280,
      }
    },
  },
  cardIndex: {
    type: Number,
    default: -1,
  },
  limitMin: {
    type: Object,
    default: () => {
      return {
        minW: 160,
        minH: 180,
      }
    },
  },
  limitMax: {
    type: Object,
    default: () => {
      return {
        maxW: undefined,
        maxH: undefined,
      }
    },
  },
  debugMode: {
    type: Boolean,
    default: false,
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
const emits = defineEmits([
  'change',
  'moveStart',
  'move',
  'moveEnd',
  'resizeStart',
  'resize',
  'resizeEnd',
])
const { scale } = inject('canvasbase')
const {
  containerRef,
  style,
  isSelect,
  dragStart,
  resizeStart,
} = useResize(props, emits)
</script>
