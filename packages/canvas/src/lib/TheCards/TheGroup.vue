<template>
  <div class="border border-teal-600 bg-teal-700/30 h-full relative rounded-md">
    <div
      class="bg-teal-700/30 border border-teal-600 rounded py-1 pl-2 pr-1 font-bold flex items-center text-sm space-x-2 absolute -top-2 origin-top-left"
      :class="[cursorStyle]"
      :style="{
        transform: ` scale(${1 / scale})`,
        left: `${0}px`,
        top: `calc(-36px / ${scale} )`,
        height: `${28}px`,
      }"
      @pointerdown="dragHandleEvent"
    >
      <span>
        <input v-model="label" type="text" class="bg-transparent" @mousemove.prevent>
      </span>
      <button class="size-5 hover:bg-green-500 rounded-sm flex justify-center items-center text-xl">
        <i class="i-ri-more-line" />
      </button>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'

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
const label = ref(props.data.title)
</script>
