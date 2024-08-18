<template>
  <Resize
    :pos="pos"
    class="border bg-white"
    :size="{ w: data.size.w, h: data.size.h }"
    :selected="isSelected"
    :style="{ zIndex: isSelected ? 166 : 1 }"
    @click.stop.prevent="selectNode(data.id)"
    @move="cardMove"
  >
    <template #drag-element="{ pointerDown, cursorStyle }">
      <div :class="[cursorStyle]" class="border-b p-1 flex space-x-1" @pointerdown="pointerDown">
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
      pos:{{ pos.x }},{{ pos.y }}<br>
      id:{{ data.id }}
    </template>
  </Resize>
</template>

<script setup>
import { computed, inject, reactive, watch, watchEffect } from 'vue'
import Resize from './Resize.vue'

const props = defineProps({
  data: {
    type: Object,
    default: () => {
      return {
        id: 'X3v9pFq7',
        pid: 'b7gO3uPc',
        type: 'card',
        title: '',
        position: {
          x: 0,
          y: 0,
        },
        size: {
          w: 600,
          h: 400,
        },
        color: {
          border: 1,
          background: 2,
        },
        fold: false,
      }
    },
  },
})
const emits = defineEmits(['onUpdate'])
// const cardDelta = reactive({ x: 0, y: 0 })
const selectedId = inject('selectedNodeId')
const { isDragging, deltaX, deltaY } = inject('cardDraging')
const isSelected = computed(() => {
  return selectedId.value === props.data.id
})

let x = props.data.position.x
let y = props.data.position.y
const pos = computed(() => {
  if (props.data.pid === selectedId.value && isDragging.value) {
    x = deltaX.value + props.data.position.x
    y = deltaY.value + props.data.position.y
    return { x, y }
  }
  else {
    return { x: props.data.position.x, y: props.data.position.y }
  }
})

watchEffect(() => {
  if (props.data.pid === selectedId.value && !isDragging.value) {
    console.log(x, y)
    emits('onUpdate', { id: props.data.id, position: { x, y } })
  }
})

function selectNode(nodeid) {
  selectedId.value = nodeid
}
function cardMove({ position }) {
  emits('onUpdate', { id: props.data.id, position })
}
</script>
