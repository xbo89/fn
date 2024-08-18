<template>
  <Resize
    :position="{ x: pos.x, y: pos.y }"
    :size="{ w: data.size.w, h: data.size.h }"
    :selected="isSelected"
    class="border border-green-600 bg-green-100"
    :style="{ zIndex: isSelected ? 166 : 1 }"
    @click.stop.prevent="selectNode(data.id)"
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
      aa
    </template>
  </Resize>
</template>

<script setup>
import { computed, inject } from 'vue'
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

const selectedId = inject('selectedNodeId')
const { isDragging, deltaX, deltaY } = inject('cardDraging')
const isSelected = computed(() => {
  return selectedId.value === props.data.id
})
const pos = computed(() => {
  if (isDragging.value && props.data.pid === selectedId.value) {
    return { x: deltaX.value + props.data.position.x, y: deltaY.value + props.data.position.y }
  }
  else {
    return { x: props.data.position.x, y: props.data.position.y }
  }
})
function selectNode(nodeid) {
  selectedId.value = nodeid
}

// function testchange(v) {
//   // console.log(v.position.x, v.position.y, v.size.width, v.size.height, v.isDragging.value)
// }
</script>
