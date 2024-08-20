<template>
  <CardContainer
    class="border border-teal-600 bg-teal-700/30 relative"
    :pos="data.position"
    :size="{ w: data.size.w, h: data.size.h }"
    :selected="isSelected"
    :style="{ zIndex: isSelected ? 166 : 1 }"
    @click.stop.prevent="selectNode(data.id)"
    @move="cardMove"
    @move-end="cardMoveEnd"
    @resize-end="cardResizeEnd"
  >
    <template #default="{ pointerDown, cursorStyle }">
      <div
        class="bg-teal-700/30 border border-teal-600 rounded py-1 pl-2 pr-1 font-bold flex items-center text-sm space-x-2 absolute -top-2 origin-top-left"
        :class="[cursorStyle]"
        :style="{
          transform: ` scale(${1 / scale})`,
          left: `${0}px`,
          top: `calc(-36px / ${scale} )`,
          height: `${28}px`,
        }"
        @pointerdown="pointerDown"
      >
        <span>a test green group</span>
        <button class="size-5 hover:bg-green-500 rounded-sm flex justify-center items-center text-xl">
          <i class="i-ri-more-line" />
        </button>
      </div>
    </template>
  </CardContainer>
</template>

<script setup>
import { computed, inject } from 'vue'
import CardContainer from './TheCardContainer.vue'

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
const emits = defineEmits(['onUpdate', 'onMoveEnd', 'onResizeEnd'])
const selectedId = inject('selectedNodeId')
const { scale } = inject('canvasBaseInfo')

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
function cardResizeEnd({ size }) {
  emits('onResizeEnd', { id: props.data.id, size })
}
</script>
