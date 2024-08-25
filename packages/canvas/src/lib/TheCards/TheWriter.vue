<template>
  <div
    class="card-content h-full relative border bg-white rounded-lg transition-colors"
    :style="{
      background: colors[data.color].background,
      borderColor: colors[data.color].border,
    }"
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
        class="writer-toolbar p-1 flex space-x-1 justify-between absolute top-1 inset-x-1 rounded-md bg-black/5 hover:bg-black/10 transition-colors"
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
      <Writer />
    </div>
  </div>
  <TheContextMenu v-model="showContextMenu" :position="contextMenuPosition">
    <TheMenuItem
      icon="i-ri-fullscreen-line"
      @click="() => {
        updateNode(data.id, { size: { w: 380, h: 180 } });
        showContextMenu = false
      }"
    >
      Default size
    </TheMenuItem>
    <TheMenuItem
      icon="i-ri-contract-up-down-line"
      @click="() => {
        updateNode(data.id, { fold: !data.fold });
        showContextMenu = false
      }"
    >
      Fold
    </TheMenuItem>
    <TheMenuItem icon="i-ri-expand-height-line">
      Fit to content
    </TheMenuItem>
    <TheMenuDivide />
    <TheMenuColorsItem :color-index="data.color" @handle-color="handleColor" />
    <TheMenuDivide />
    <TheMenuItem icon="i-ri-file-copy-line" hotkey="Cmd+C">
      Copy
    </TheMenuItem>
    <TheMenuItem icon="i-ri-delete-bin-7-line" hotkey="Del" @click="removeNode(data.id)">
      Delete
    </TheMenuItem>
  </TheContextMenu>
</template>

<script setup>
import { Writer } from '@floatnote/writer'
import '@floatnote/writer/dist/style.css'
import 'simplebar'
import 'simplebar/dist/simplebar.css'
import { ref } from 'vue'
import { storeToRefs } from 'pinia'
import { useCanvasContextMenu } from '../useHooks/useContextMenu'
import { useCanvasStore } from '../useStore/useCanvasStore'

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
        color: 0,
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
const store = useCanvasStore()
const { colors } = storeToRefs(store)
const { removeNode, updateNode } = store

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
function handleColor(index) {
  updateNode(props.data.id, { color: index })
}
</script>
