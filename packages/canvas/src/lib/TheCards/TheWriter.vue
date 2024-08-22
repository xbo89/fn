<template>
  <div class="card-content h-full relative border bg-white rounded-lg">
    <div
      :class="[cursorStyle]"
      class="border p-1 flex space-x-1 absolute top-1 inset-x-1 rounded-md bg-gray-50"
      @pointerdown="dragHandleEvent"
    >
      <button class="size-6 hover:bg-gray-200 rounded-md flex justify-center items-center text-xl">
        <i class="i-ri-arrow-down-s-line" />
      </button>
      <button class="size-6 hover:bg-gray-200 rounded-md flex justify-center items-center text-xl">
        <i class="i-ri-information-line" />
      </button>
      <button class="size-6 hover:bg-gray-200 rounded-md flex justify-center items-center text-xl">
        <i class="i-ri-more-line" />
      </button>
    </div>
    <div class="absolute px-4 top-10 bottom-0 inset-x-0 " data-simplebar style="position: absolute;" @wheel.stop>
      <Writer />
    </div>
  </div>
</template>

<script setup>
import { Writer } from '@floatnote/writer'
import '@floatnote/writer/dist/style.css'
import 'simplebar'
import 'simplebar/dist/simplebar.css'

defineProps({
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
  scale: {
    type: Number,
    default: 1,
  },
  cursorStyle: {
    type: String,
    default: 'cursor-grab active:cursor-grabbing select-none',
  },
})
const emits = defineEmits(['dragHandleEvent'])
function dragHandleEvent(event) {
  emits('dragHandleEvent', event)
}
</script>
