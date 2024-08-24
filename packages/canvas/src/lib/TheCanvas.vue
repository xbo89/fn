<template>
  <div
    ref="containerRef"
    class="w-full h-full touch-none overflow-hidden absolute bg-slate-100"
    :class="[cursor]"
    @contextmenu.stop.prevent="handleContextMenu"
  >
    <div
      class="wangwenbo fixed origin-top-left left-0 top-0"
      :style="{
        transform: `translate(${x}px, ${y}px) scale(${scale})`,
      }"
    >
      <template v-for="(node, index) in nodeData" :key="node.id">
        <TheCardContainer
          :position="node.position"
          :size="node.size"
          :scale="scale"
          :card-index="index"
          @handle-move="({
            position,
            delta,
          }) => updateNodePositionData({
            id: node.id,
            position,
            delta,
          })"
          @handle-move-end="updateClear"
          @handle-resize-end="({
            size,
            position,
          }) => updateNodeSizeData({
            id: node.id,
            size,
            position,
          })"
        >
          <template #default="{ pointerDown, cursorStyle, isSelect }">
            <TheGroup
              v-if="node.type === 'group'"
              :data="node"
              :scale="scale"
              :selected="isSelect"
              :cursor-style="cursorStyle"
              @handle-drag="pointerDown"
              @handle-select="selectedNodeByIndex[0] = index"
            />
            <TheWriter
              v-if="node.type === 'card'"
              :data="node"
              :scale="scale"
              :selected="isSelect"
              :cursor-style="cursorStyle"
              @handle-drag="pointerDown"
              @handle-select="selectedNodeByIndex[0] = index"
            />
          </template>
        </TheCardContainer>
      </template>
      <div
        v-show="selection.display"
        :style="{
          width: `${selection.w}px`,
          height: `${selection.h}px`,
          transform: `translate(${selection.x}px,${selection.y}px)`,
        }"
        class="border border-blue-600 bg-blue-600/10 fixed left-0 top-0 pointer-events-none rounded-sm origin-top-left z-50"
      />
    </div>
    <TheCanvasToolbar
      class="z-10"
      :scale="scale"
      @on-zoom-in="zoomIn"
      @on-zoom-out="zoomOut"
    />
    <svg v-if="backgroundStyle.enable" width="100%" height="100%">
      <pattern id="grid-dot-pattern" :width="backgroundStyle.gap * scale" :height="backgroundStyle.gap * scale" patternUnits="userSpaceOnUse" :patternTransform="`translate(${x},${y})`">
        <circle :cx="backgroundStyle.size * scale" :cy="backgroundStyle.size * scale" :r="backgroundStyle.size * scale" :fill="backgroundStyle.color" :fill-opacity="backgroundStyle.opacity" />
      </pattern>
      <rect width="100%" height="100%" fill="url(#grid-dot-pattern)" />
    </svg>
  </div>
  <TheContextMenu v-model="showContextMenu" :position="contextMenuPosition">
    <TheMenuItem icon="i-ri-file-paper-line" hotkey="Ctrl+N">
      Card
    </TheMenuItem>
    <TheMenuItem icon="i-ri-layout-top-2-line" hotkey="Ctrl+G">
      Section
    </TheMenuItem>
  </TheContextMenu>
</template>

<script setup>
import { provide } from 'vue'
import { useCanvas } from './useHooks/useCanvas'
import { useCanvasSelection, useNodeSelection } from './useHooks/useCanvasSelection'
import { useCanvasContextMenu } from './useHooks/useContextMenu'
import { useCanvasData } from './useHooks/useCanvasData'
import TheCanvasToolbar from './TheCanvasToolbar.vue'

defineProps({
  backgroundStyle: {
    type: Object,
    default: () => {
      return {
        enable: true,
        gap: 24,
        color: '#64748b',
        opacity: 0.2,
        size: 1,
        scale: {
          default: 1,
          max: 2,
          min: 0.1,
          step: 0.1,
        },
      }
    },
  },
})
const nodeData = defineModel('nodes', { required: true })
const { updateNodePositionData, updateNodeSizeData, updateClear } = useCanvasData(nodeData)
const { containerRef, x, y, scale, cursor, zoomIn, zoomOut } = useCanvas()
const { selection } = useCanvasSelection({
  target: containerRef,
  position: { x, y },
  scale,
})
const { selectedNodeByIndex } = useNodeSelection({
  nodes: nodeData,
  container: containerRef,
})
const { showContextMenu, contextMenuPosition, handleContextMenu } = useCanvasContextMenu()
provide('canvasbase', {
  x,
  y,
  scale,
  selected: selectedNodeByIndex,
})
</script>
