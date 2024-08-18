<template>
  <div
    ref="canvasContainerRef"
    class="w-full h-full block touch-none overflow-hidden relative bg-slate-100"
    :class="[cursor]"
    @click="clickContainer"
  >
    <div
      ref="canvasRef"
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
    </div>
    <ToolBar
      :scale="scale"
      @on-zoom-in="zoomIn"
      @on-zoom-out="zoomOut"
    />
    <slot name="ui-extend" />
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
import ToolBar from './ToolBar.vue'
import TheCardOfWriter from './TheCardOfWriter.vue'
import TheCardOfGroup from './TheCardOfGroup.vue'

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

const { canvasRef, canvasContainerRef, scale, cursor, x, y, zoomIn, zoomOut } = useCanvas(props)
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
let cachepos = []
function updateNodeData({ id, position, delta }) {
  const node = nodeData.value.find(i => i.id === id)
  node.position.x = position.x
  node.position.y = position.y
  const nodeChild = nodeData.value.filter(i => i.pid === id)
  for (let i = 0; i < nodeChild.length; i++) {
    if (!cachepos[i]) {
      cachepos[i] = {
        x: nodeChild[i].position.x,
        y: nodeChild[i].position.y,
      }
    }
    else {
      nodeChild[i].position.x = cachepos[i].x + delta.x
      nodeChild[i].position.y = cachepos[i].y + delta.y
    }
  }
}
function cardMoveEnd() {
  cachepos = []
}
</script>

<style>
</style>
