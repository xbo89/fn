<template>
  <div
    class="card-content h-full relative border bg-white rounded-lg"
    @pointerdown.stop="handleDrag"
    @mousedown.stop="handleSelect"
    @mouseenter.stop="handleMouseEnter"
    @mouseleave.stop="handleMouseLeave"
    @contextmenu.stop.prevent="handleContextMenu"
  >
    <Transition name="fade">
      <div
        v-if="showToolBar"
        :class="[cursorStyle]"
        class="writer-toolbar p-1 flex space-x-1 justify-between absolute top-1 inset-x-1 rounded-md bg-gray-100 hover:bg-gray-200 transition-colors"
      >
        <div class="right-slot">
          <button class="size-6 hover:bg-gray-300 rounded-md flex justify-center items-center text-xl">
            <i class="i-ri-arrow-down-s-line" />
          </button>
        </div>
        <div class="right-slot flex space-x-1 justify-between">
          <button class="size-6 hover:bg-gray-300 rounded-md flex justify-center items-center text-xl">
            <i class="i-ri-information-line" />
          </button>
          <button class="size-6 hover:bg-gray-300 rounded flex justify-center items-center text-xl">
            <i class="i-ri-more-line" />
          </button>
        </div>
      </div>
    </Transition>
    <div class="absolute px-4 top-10 bottom-0 inset-x-0 " data-simplebar style="position: absolute;">
      <!-- <Writer /> -->
    </div>
  </div>
  <TheContextMenu v-model="showContextMenu" :position="contextMenuPosition">
    <TheMenuItem icon="i-ri-fullscreen-line">
      Default size
    </TheMenuItem>
    <TheMenuItem icon="i-ri-contract-up-down-line">
      Fold
    </TheMenuItem>
    <TheMenuItem icon="i-ri-expand-height-line">
      Fit to content
    </TheMenuItem>
    <TheMenuDivide />
    <TheMenuColorsItem />
    <TheMenuDivide />
    <TheMenuItem icon="i-ri-file-copy-line" hotkey="Cmd+C">
      Copy
    </TheMenuItem>
    <TheMenuItem icon="i-ri-delete-bin-7-line" hotkey="Del">
      Delete
    </TheMenuItem>
  </TheContextMenu>
</template>

<script setup>
// import { Writer } from '@floatnote/writer'
import '@floatnote/writer/dist/style.css'
import 'simplebar'
import 'simplebar/dist/simplebar.css'
import { ref } from 'vue'
import { useCanvasContextMenu } from '../useHooks/useContextMenu'

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
const emits = defineEmits(['handleDrag', 'handleSelect'])
const { showContextMenu, contextMenuPosition, handleContextMenu } = useCanvasContextMenu()
const showToolBar = ref(false)
let timer = null
function handleDrag(event) {
  emits('handleDrag', event)
}
function handleSelect() {
  emits('handleSelect')
}
function handleMouseEnter() {
  clearTimeout(timer)
  timer = setTimeout(() => {
    showToolBar.value = true
  }, 300)
}
function handleMouseLeave() {
  timer = setTimeout(() => {
    showToolBar.value = false
  }, 300)
}
</script>
