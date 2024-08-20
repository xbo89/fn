<template>
  <CardContainer
    class="border bg-white"
    :pos="data.position"
    :size="{ w: data.size.w, h: data.size.h }"
    :selected="isSelected"
    :style="{ zIndex: isSelected ? 166 : 1 }"
    @click.stop.prevent="selectNode(data.id)"
    @move="cardMove"
    @move-end="cardMoveEnd"
  >
    <template #default="{ pointerDown, cursorStyle, mousenter }">
      <div class="card-content h-full relative">
        <Transition name="fade">
          <div
            v-show="mousenter"
            :class="[cursorStyle]"
            class="border p-1 flex space-x-1 absolute top-1 inset-x-1 rounded-md bg-gray-50"
            @pointerdown.stop.prevent="pointerDown"
          >
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
        </Transition>
        <div class="absolute px-4 top-10 bottom-0 inset-x-0">
          <Writer />
        </div>
      </div>
    </template>
  </CardContainer>
</template>

<script setup>
import { computed, inject } from 'vue'
import { Writer } from '@floatnote/writer'
import CardContainer from './TheCardContainer.vue'
import '@floatnote/writer/dist/style.css'

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
</script>
