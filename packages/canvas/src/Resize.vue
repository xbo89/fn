<template>
  <div
    ref="draggableRef"
    class="dragContainer"
    :class="[selected ? 'outline outline-2 outline-blue-500' : '']"
    :style="{ ...style, borderRadius: `${config.radius}px` }"
  >
    <div class="draggable" @pointerdown="onPointerDown">
      <slot name="drag-element">
        <div class="w-full h-6 " />
      </slot>
    </div>
    <div class="p-2" @click.stop.prevent>
      <slot />
    </div>
    <template v-if="selected">
      <!-- 各个边的 resize handle -->
      <div class="resize-handle-border top" @pointerdown="onResizePointerDown($event, 'top')" />
      <div class="resize-handle-border bottom" @pointerdown="onResizePointerDown($event, 'bottom')" />
      <div class="resize-handle-border left" @pointerdown="onResizePointerDown($event, 'left')" />
      <div class="resize-handle-border right" @pointerdown="onResizePointerDown($event, 'right')" />
      <!-- 各个角的 resize handle -->
      <div class="resize-handle-corner top-left" @pointerdown="onResizePointerDown($event, 'top-left')" />
      <div class="resize-handle-corner top-right" @pointerdown="onResizePointerDown($event, 'top-right')" />
      <div class="resize-handle-corner bottom-left" @pointerdown="onResizePointerDown($event, 'bottom-left')" />
      <div class="resize-handle-corner bottom-right" @pointerdown="onResizePointerDown($event, 'bottom-right')" />
    </template>
  </div>
</template>

<script setup>
import { onMounted, reactive, ref } from 'vue'
import { useResize } from './useResize'

const props = defineProps({
  config: {
    type: Object,
    default: () => {
      return {
        defaultX: 320,
        defaultY: 460,
        defaultWidth: 300,
        defaultHeight: 300,
        minWidth: 100,
        minHeight: 100,
        resizeHandleRange: 16,
        debugMode: false,
        radius: 8,
      }
    },
  },
  scale: {
    type: Number,
    default: 1,
  },
  selected: {
    type: Boolean,
    default: false,
  },
})
const { draggableRef, onPointerDown, styleForMove, onResizePointerDown, style } = useResize(props)
</script>

<style scoped>
.dragContainer {

  box-sizing: border-box;
  position: absolute;
}
.draggable{
  cursor: grab;
  user-select: none;
}
.draggable:active {
  cursor: grabbing;
}
.resize-handle-corner,
.resize-handle-border {
  position: absolute;
  width: v-bind('`${config.resizeHandleRange}px`');
  height: v-bind('`${config.resizeHandleRange}px`');
}
.resize-handle-corner {
  background-color:v-bind('`${config.debugMode && '#0d622d5f'}`');
}
.resize-handle-border {
  background-color:v-bind('`${config.debugMode && '#b942745f'}`');
}

.resize-handle-corner.top-left {
  top: v-bind('`-${config.resizeHandleRange / 2 + 2}px`');
  left: v-bind('`-${config.resizeHandleRange / 2 + 2}px`');
  cursor: nwse-resize;
}

.resize-handle-corner.top-right {
  top: v-bind('`-${config.resizeHandleRange / 2 + 2}px`');
  right: v-bind('`-${config.resizeHandleRange / 2 + 2}px`');
  cursor: nesw-resize;
}

.resize-handle-corner.bottom-left {
  bottom: v-bind('`-${config.resizeHandleRange / 2 + 2}px`');
  left: v-bind('`-${config.resizeHandleRange / 2 + 2}px`');
  cursor: nesw-resize;
}

.resize-handle-corner.bottom-right {
  bottom: v-bind('`-${config.resizeHandleRange / 2 + 2}px`');
  right: v-bind('`-${config.resizeHandleRange / 2 + 2}px`');
  cursor: nwse-resize;
}

.resize-handle-border.top {
  top: v-bind('`-${config.resizeHandleRange / 2 + 2}px`');
  left: 50%;
  transform: translateX(-50%);
  width: 100%;
  height: v-bind('`${config.resizeHandleRange}px`');
  cursor: ns-resize;
}

.resize-handle-border.bottom {
  bottom: v-bind('`-${config.resizeHandleRange / 2 + 2}px`');
  left: 50%;
  transform: translateX(-50%);
  width: 100%;
  height: v-bind('`${config.resizeHandleRange}px`');
  cursor: ns-resize;
}

.resize-handle-border.left {
  left: v-bind('`-${config.resizeHandleRange / 2 + 2}px`');
  top: 50%;
  transform: translateY(-50%);
  width: v-bind('`${config.resizeHandleRange}px`');
  height: 100%;
  cursor: ew-resize;
}

.resize-handle-border.right {
  right: v-bind('`-${config.resizeHandleRange / 2 + 2}px`');
  top: 50%;
  transform: translateY(-50%);
  width: v-bind('`${config.resizeHandleRange}px`');
  height: 100%;
  cursor: ew-resize;
}
</style>
