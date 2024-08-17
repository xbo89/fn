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
        <Resize
          v-if="node.type === 'card'"
          :config="{
            defaultX: node.position.x,
            defaultY: node.position.y,
            defaultWidth: node.size.w,
            defaultHeight: node.size.h,
            minWidth: 100,
            minHeight: 100,
            resizeHandleRange: 16,
            debugMode: false,
            radius: 8,
          }"
          :selected="currentSelectNodeId === node.id"
          :scale="scale"
          class=" border bg-white"
          @click.stop.prevent="selectNode(node.id)"
        >
          <template #drag-element>
            <div class="border-b p-1 flex space-x-1">
              <button class="size-8 hover:bg-gray-200 rounded-md flex justify-center items-center text-xl">
                <i class="i-ri-arrow-down-s-line" />
              </button>
              <button class="size-8 hover:bg-gray-200 rounded-md flex justify-center items-center text-xl">
                <i class="i-ri-information-line" />
              </button>
              <button class="size-8 hover:bg-gray-200 rounded-md flex justify-center items-center text-xl">
                <i class="i-ri-more-line" />
              </button>
            </div>
          </template>
          <template #default>
            <!-- <Writer /> -->
            aa
          </template>
        </Resize>
        <Resize
          v-if="node.type === 'group'"
          :config="{
            defaultX: node.position.x,
            defaultY: node.position.y,
            defaultWidth: node.size.w,
            defaultHeight: node.size.h,
            minWidth: 100,
            minHeight: 100,
            resizeHandleRange: 16,
            debugMode: false,
            radius: 8,
          }"
          :selected="currentSelectNodeId === node.id"
          :scale="scale"
          class="border border-green-700 bg-green-100"
          @click.stop.prevent="selectNode(node.id)"
        >
          <div>
            group
          </div>
        </Resize>
      </template>
    </div>
    <ToolBar :scale="scale" @on-zoom-in="zoomIn" @on-zoom-out="zoomOut" />
    <slot name="ui-extend" />
    <svg v-if="pattern" width="100%" height="100%">
      <pattern id="grid-dot-pattern" :width="patternGap * scale" :height="patternGap * scale" patternUnits="userSpaceOnUse" :patternTransform="`translate(${x},${y})`">
        <circle :cx="patternSize * scale" :cy="patternSize * scale" :r="patternSize * scale" :fill="patternColor" :fill-opacity="patternOpacity" />
      </pattern>
      <rect width="100%" height="100%" fill="url(#grid-dot-pattern)" />
    </svg>
  </div>
</template>

<script setup>
import { onMounted, ref } from 'vue'
import { Writer } from '@floatnote/writer'
import { useCanvas } from './useCanvas'
import ToolBar from './ToolBar.vue'
import Resize from './Resize.vue'
import '@floatnote/writer/dist/style.css'

const props = defineProps({
  patternGap: {
    type: Number,
    default: 36,
  },
  patternColor: {
    type: String,
    default: '#060709',
  },
  patternOpacity: {
    type: Number,
    default: 0.2,
  },
  patternSize: {
    type: Number,
    default: 1.2,
  },
  pattern: {
    type: Boolean,
    default: true,
  },
  scaleMax: {
    type: Number,
    default: 2,
  },
  scaleMin: {
    type: Number,
    default: 0.1,
  },
  scaleStep: {
    type: Number,
    default: 0.1,
  },
})
const { canvasRef, canvasContainerRef, scale, cursor, x, y, zoomIn, zoomOut } = useCanvas(props)
const nodeData = defineModel()
const currentSelectNodeId = ref(-1)
function selectNode(nodeid) {
  currentSelectNodeId.value = nodeid
}
function clickContainer() {
  currentSelectNodeId.value = -1
}
</script>

<style>
</style>
