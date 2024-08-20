<template>
  <div
    ref="draggableRef"
    class="absolute box-border"
    :class="[selected ? 'outline outline-2 outline-blue-500' : '']"
    :style="{
      ...style,
      borderRadius: `${config.radius}px`,
      minWidth: `${limitMin.minW}px`,
      minHeight: `${limitMin.minH}px`,
      maxWidth: `${limitMax.maxW}px`,
      maxHeight: `${limitMax.maxH}px`,
    }"
  >
    <slot name="drag-element" :pointer-down="onPointerDown" :cursor-style="cursorStyle">
      <div class="w-full h-6 " />
    </slot>

    <div class="w-full h-full" @click.stop.prevent @dragover.prevent="dragover">
      <slot />
    </div>
    <template v-if="selected">
      <!-- 各个边的 resize handle -->
      <div class="resize-handle-border top" @pointerdown.stop.prevent="onResizePointerDown($event, 'top')" />
      <div class="resize-handle-border bottom" @pointerdown.stop.prevent="onResizePointerDown($event, 'bottom')" />
      <div class="resize-handle-border left" @pointerdown.stop.prevent="onResizePointerDown($event, 'left')" />
      <div class="resize-handle-border right" @pointerdown.stop.prevent="onResizePointerDown($event, 'right')" />
      <!-- 各个角的 resize handle -->
      <div class="resize-handle-corner top-left cursor-nwse-resize" @pointerdown.stop.prevent="onResizePointerDown($event, 'top-left')" />
      <div class="resize-handle-corner top-right cursor-nesw-resize" @pointerdown.stop.prevent="onResizePointerDown($event, 'top-right')" />
      <div class="resize-handle-corner bottom-left cursor-nesw-resize" @pointerdown.stop.prevent="onResizePointerDown($event, 'bottom-left')" />
      <div class="resize-handle-corner bottom-right cursor-nwse-resize" @pointerdown.stop.prevent="onResizePointerDown($event, 'bottom-right')" />
    </template>
  </div>
</template>

<script setup>
import { ref, watchEffect } from 'vue'
import { useResize } from './useResize'

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
  selected: {
    type: Boolean,
    default: false,
  },
})
const emits = defineEmits(['change', 'moveStart', 'move', 'moveEnd', 'resizeStart', 'resize', 'resizeEnd'])
const { draggableRef, onPointerDown, onResizePointerDown, style, position } = useResize(props, emits)
const cursorStyle = ref('cursor-grab active:cursor-grabbing select-none')

watchEffect(() => {
  position.x = props.pos.x
  position.y = props.pos.y
})
</script>

<style scoped>
.resize-handle-corner,
.resize-handle-border {
  position: absolute;
  width: v-bind('`${config.handleSize}px`');
  height: v-bind('`${config.handleSize}px`');
}
.resize-handle-corner {
  background-color:v-bind('`${debugMode && "#0d622d5f"}`');
}
.resize-handle-border {
  background-color:v-bind('`${debugMode && "#b942745f"}`');
}
.resize-handle-corner.top-left,
.resize-handle-corner.top-right,
.resize-handle-border.top{
  top: v-bind('`-${config.handleSize / 2 + 2}px`');
}
.resize-handle-corner.bottom-left,
.resize-handle-corner.bottom-right,
.resize-handle-border.bottom{
  bottom: v-bind('`-${config.handleSize / 2 + 2}px`');
}
.resize-handle-corner.top-left,
.resize-handle-corner.bottom-left,
.resize-handle-border.left {
  left: v-bind('`-${config.handleSize / 2 + 2}px`');
}
.resize-handle-corner.top-right,
.resize-handle-corner.bottom-right,
.resize-handle-border.right {
  right: v-bind('`-${config.handleSize / 2 + 2}px`');
}

.resize-handle-border.top,
.resize-handle-border.bottom {
  left: 50%;
  transform: translateX(-50%);
  width: 100%;
  height: v-bind('`${config.handleSize}px`');
  cursor: ns-resize;
}

.resize-handle-border.left,
.resize-handle-border.right {
  top: 50%;
  transform: translateY(-50%);
  width: v-bind('`${config.handleSize}px`');
  height: 100%;
  cursor: ew-resize;
}
</style>
