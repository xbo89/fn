<template>
  <div
    ref="containerRef"
    class="w-full h-full touch-none overflow-hidden absolute bg-slate-100"
    :class="[cursor]"
    @mousedown="clickContainer"
  >
    <div
      class="fixed origin-top-left left-0 top-0"
      :style="{
        transform: `translate(${x}px, ${y}px) scale(${scale})`,
      }"
    >
      <template v-for="(node, index) in nodeData" :key="node.id">
        <TheCardOfWriter
          v-if="node.type === 'card'"
          :data="node"
          :data-node-index="index"
          @on-update="updateNodePositionData"
          @on-move-end="cardMoveEnd"
          @on-resize-end="updateNodeSizeData"
        />
        <TheCardOfGroup
          v-if="node.type === 'group'"
          :data="node"
          :data-node-index="index"
          @on-update="updateNodePositionData"
          @on-move-end="cardMoveEnd"
          @on-resize-end="updateNodeSizeData"
        />
      </template>
      <div
        v-show="selectHelper.display"
        :style="{
          width: `${selectHelper.w}px`,
          height: `${selectHelper.h}px`,
          transform: `translate(${selectHelper.x}px,${selectHelper.y}px)`,
        }"
        class="border border-blue-400 bg-blue-800/10 absolute pointer-events-none rounded-sm origin-top-left z-50"
      />
    </div>
    <ToolBar
      class="z-10"
      :scale="scale"
      @on-zoom-in="zoomControl(true)"
      @on-zoom-out="zoomControl(false)"
    />
    <svg v-if="pattern" width="100%" height="100%">
      <pattern id="grid-dot-pattern" :width="patternStyle.gap * scale" :height="patternStyle.gap * scale" patternUnits="userSpaceOnUse" :patternTransform="`translate(${x},${y})`">
        <circle :cx="patternStyle.size * scale" :cy="patternStyle.size * scale" :r="patternStyle.size * scale" :fill="patternStyle.color" :fill-opacity="patternStyle.opacity" />
      </pattern>
      <rect width="100%" height="100%" fill="url(#grid-dot-pattern)" />
    </svg>
  </div>
</template>

<script setup>
import { provide, ref, watch } from 'vue'
import { useCanvas } from './useCanvas'
import { useCanvasData } from './useCanvasData'
import ToolBar from './TheCanvasToolbar.vue'
import TheCardOfWriter from './TheCardTypeofWriter.vue'
import TheCardOfGroup from './TheCardTypeofGroup.vue'

const props = defineProps({
  pattern: {
    type: Boolean,
    default: true,
  },
  patternStyle: {
    type: Object,
    default: () => {
      return {
        gap: 36,
        color: '#060709',
        opacity: 0.2,
        size: 1.2,
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
// const edgesData = defineModel('edges', { required: true })

const { scale, cursor, x, y, selectHelper, containerRef, zoomControl } = useCanvas(props)
const { updateNodePositionData, updateNodeSizeData, updateClear } = useCanvasData(nodeData)

const nodeId = ref(-1)
provide('selectedNodeId', nodeId)
provide('canvasBaseInfo', {
  scale,
  x,
  y,
})
provide('cardDraging', {
  isDragging: ref(false),
  deltaX: ref(0),
  deltaY: ref(0),
})
const selectedNodeIndices = ref([])
watch(selectHelper, (v) => {
  if (v.w !== 0 || v.h !== 0) {
    selectedNodeIndices.value = []
    nodeData.value.forEach((node, index) => {
      const nodeBox = {
        position: node.position,
        size: node.size,
      }
      if (node.type === 'card' && isIntersecting(selectHelper, nodeBox)) {
        selectedNodeIndices.value.push(index)
      }

      if (node.type === 'group' && isCompletelyInside(nodeBox, selectHelper)) {
        selectedNodeIndices.value.push(index)
      }
    })
  }
})
function isIntersecting(box1, box2) {
  return !(
    box1.x + box1.w < box2.position.x // box1 is to the left of box2
    || box1.x > box2.position.x + box2.size.w // box1 is to the right of box2
    || box1.y + box1.h < box2.position.y // box1 is above box2
    || box1.y > box2.position.y + box2.size.h // box1 is below box2
  )
}
function isCompletelyInside(innerBox, outerBox) {
  return (
    innerBox.position.x >= outerBox.x
    && innerBox.position.x + innerBox.size.w <= outerBox.x + outerBox.w
    && innerBox.position.y >= outerBox.y
    && innerBox.position.y + innerBox.size.h <= outerBox.y + outerBox.h
  )
}
function clickContainer() {
  // 清空选择
  nodeId.value = -1
  selectedNodeIndices.value = []
}
function cardMoveEnd() {
  updateClear()
}
</script>

<style>
</style>
