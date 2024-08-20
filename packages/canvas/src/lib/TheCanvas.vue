<template>
  <div
    ref="containerRef"
    class="w-full h-full block touch-none overflow-hidden relative bg-slate-100"
    :class="[cursor]"
    @click="clickContainer"
  >
    <div
      class="absloute origin-top-left inset-0"
      :style="{
        transform: `translate(${x}px, ${y}px) scale(${scale})`,
      }"
    >
      <template v-for="(node, index) in nodeData" :key="node.id">
        <TheCardOfWriter
          v-if="node.type === 'card'"
          :data="node"
          :data-node-index="index"
          @on-update="updateNodeData"
          @on-move-end="cardMoveEnd"
        />
        <TheCardOfGroup
          v-if="node.type === 'group'"
          :data="node"
          :data-node-index="index"
          @on-update="updateNodeData"
          @on-move-end="cardMoveEnd"
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
import { provide, ref } from 'vue'
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

/**
 * 组件的核心数据
 * nodes:节点卡片
 * edges:连线数据
 */
const nodeData = defineModel('nodes', { required: true })
// const edgesData = defineModel('edges', { required: true })

const { scale, cursor, x, y, selectHelper, containerRef, zoomControl } = useCanvas(props)
const { updateNodeData, updateClear } = useCanvasData(nodeData)
/**
 * 全局提供的组件值传递
 */
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

function clickContainer() {
  // 清空选择
  nodeId.value = -1
}
function cardMoveEnd() {
  updateClear()
}
</script>

<style>
</style>
