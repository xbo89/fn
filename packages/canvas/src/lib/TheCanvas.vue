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
        transform: `translate(${canvasBase.x}px, ${canvasBase.y}px) scale(${canvasBase.scale})`,
      }"
    >
      <template v-for="(node, index) in nodeData" :key="node.id">
        <TheCardContainer
          :position="node.position"
          :size="node.size"
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
              :scale="canvasBase.scale"
              :selected="isSelect"
              :cursor-style="cursorStyle"
              @handle-drag="pointerDown"
              @handle-select="handleNodeSelect(index)"
            />
            <TheWriter
              v-if="node.type === 'card'"
              :data="node"
              :scale="canvasBase.scale"
              :cursor-style="cursorStyle"
              @handle-drag="pointerDown"
              @handle-select="handleNodeSelect(index)"
            />
          </template>
        </TheCardContainer>
      </template>
      <TheCanvasSelectionArea />
    </div>
    <TheCanvasToolbar
      class="z-10"
      @on-zoom-in="zoomIn"
      @on-zoom-out="zoomOut"
    />
    <svg v-if="backgroundStyle.enable" width="100%" height="100%">
      <pattern id="grid-dot-pattern" :width="backgroundStyle.gap * canvasBase.scale" :height="backgroundStyle.gap * canvasBase.scale" patternUnits="userSpaceOnUse" :patternTransform="`translate(${canvasBase.x},${canvasBase.y})`">
        <circle :cx="backgroundStyle.size * canvasBase.scale" :cy="backgroundStyle.size * canvasBase.scale" :r="backgroundStyle.size * canvasBase.scale" :fill="backgroundStyle.color" :fill-opacity="backgroundStyle.opacity" />
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
import { storeToRefs } from 'pinia'
import TheCanvasToolbar from './TheCanvasToolbar.vue'
import { useCanvas } from '@/useHooks/useCanvas'
import { useNodeSelection, useSelectionArea } from '@/useHooks/useCanvasSelection'
import { useCanvasContextMenu } from '@/useHooks/useContextMenu'
import { useCanvasData } from '@/useHooks/useCanvasData'
import { useCanvasStore } from '@/useStore/useCanvasStore.js'

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
const nodeData = defineModel({ required: true })

const store = useCanvasStore()
const { nodes, canvasBase } = storeToRefs(store)
const { handleNodeSelect } = store
nodes.value = nodeData

const { updateNodePositionData, updateNodeSizeData, updateClear } = useCanvasData(nodes)
const { containerRef, cursor, zoomIn, zoomOut } = useCanvas()
useSelectionArea({
  target: containerRef,
})
useNodeSelection({
  nodes,
  target: containerRef,
})
const { showContextMenu, contextMenuPosition, handleContextMenu } = useCanvasContextMenu()
</script>
