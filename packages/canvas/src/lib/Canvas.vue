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
      <div
        v-show="selectHelper.display"
        :style="{
          width: `${selectHelper.w}px`,
          height: `${selectHelper.h}px`,
          transform: `translate(${selectHelper.x}px,${selectHelper.y}px)`,
        }"
        class="border border-blue-400 bg-blue-800/10 absolute pointer-events-none rounded-sm"
      />
      <!-- <svg width="284.4309383881681" height="311.05503576432693"><defs><linearGradient id="100001_-145026_" x1="0%" y1="100%" x2="100%" y2="100%" gradientUnits="userSpaceOnUse"><stop stop-color="#4d53e8" offset="0%" /><stop stop-color="#4d53e8" offset="100%" /></linearGradient></defs><g><path d="M22 299.05503576432693 C 142.215469194084 299.05503576432693,142.215469194084 12, 262.4309383881681 12" fill="none" stroke="url(#100001_-145026_)" stroke-width="2" class="" /><path d="M 256.4309383881681,6 L 262.4309383881681,12 L 256.4309383881681,18" stroke-linecap="round" stroke="url(#100001_-145026_)" fill="none" stroke-width="2" /></g></svg> -->
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
import { useCanvas } from './useCanvax'
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

const { canvasRef, canvasContainerRef, scale, cursor, x, y, selectHelper, zoomIn, zoomOut } = useCanvas(props)
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
