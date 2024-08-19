<template>
  <Resize
    class="border border-green-600 bg-green-100 relative"
    :pos="data.position"
    :size="{ w: data.size.w, h: data.size.h }"
    :selected="isSelected"
    :style="{ zIndex: isSelected ? 166 : 1 }"
    @click.stop.prevent="selectNode(data.id)"
    @move="cardMove"
    @move-end="cardMoveEnd"
  >
    <template #drag-element="{ pointerDown, cursorStyle }">
      <div
        :class="[cursorStyle]" class=" bg-green-500 border border-green-800 rounded-lg p-1 flex space-x-1 absolute -top-2" :style="{
          transform: ` scale(${1 / scale})`, left: `${0}px`,
        }" @pointerdown="pointerDown"
      >
        a test green group
        <!-- <button class="size-8 hover:bg-gray-200 rounded-md flex justify-center items-center text-xl">
          <i class="i-ri-arrow-down-s-line" />
        </button>
        <button class="size-8 hover:bg-gray-200 rounded-md flex justify-center items-center text-xl">
          <i class="i-ri-information-line" />
        </button>
        <button class="size-8 hover:bg-gray-200 rounded-md flex justify-center items-center text-xl">
          <i class="i-ri-more-line" />
        </button> -->
      </div>
    </template>
    <template #default>
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
const emits = defineEmits(['onUpdate', 'onMoveEnd'])
const selectedId = inject('selectedNodeId')
const { scale } = inject('canvasBaseInfo')
// const { isDragging } = inject('cardDraging')
const isSelected = computed(() => {
  return selectedId.value === props.data.id
})

function selectNode(nodeid) {
  selectedId.value = nodeid
}
function cardMove({ position, delta }) {
  emits('onUpdate', { id: props.data.id, position, delta })
}
function cardMoveEnd() {
  emits('onMoveEnd')
}
// function mouseenter() {
//   console.log('start')
//   if (isDragging.value) {
//     console.log('enter')
//   }
// }
</script>
