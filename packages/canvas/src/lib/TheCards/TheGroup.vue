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
      @pointerdown.stop="(event) => { !isEdit && handleDrag(event) }"
      @mousedown.stop="handleSelect"
    >
      <i class="i-ri-layout-top-2-line text-xl text-gray-600" />
      <div
        class="w-full relative"
        @dblclick.stop="handleEdit"
      >
        <input
          v-model="label"
          type="text"
          class="bg-transparent absolute inset-x-0 outline-none z-10 rounded p-0.5"
          :class="[selected && isEdit ? 'bg-white/60' : 'pointer-events-none']"
          @keydown.esc="handleCancelEdit"
          @blur="handleCancelEdit"
        >
        <span :class="[isEdit ? 'opacity-0' : 'opacity-100']" class="pointer-events-none p-0.5 block">{{ label }}</span>
      </div>
      <Dropdown
        :distance="6"
      >
        <button class="size-6 hover:bg-black/20 rounded flex justify-center items-center text-xl">
          <i class="i-ri-more-line" />
        </button>
        <template #popper>
          <div class="p-1 space-y-1">
            <TheMenuItem icon="i-ri-edit-line">
              Rename
            </TheMenuItem>
            <TheMenuColorsItem />
            <TheMenuItem icon="i-ri-file-copy-line" hotkey="Cmd+C">
              Copy
            </TheMenuItem>
            <TheMenuItem icon="i-ri-delete-bin-7-line" hotkey="Del">
              Delete
            </TheMenuItem>
          </div>
        </template>
      </Dropdown>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { Dropdown } from 'floating-vue'
import TheMenuItem from '../TheMenuItem.vue'
import TheMenuColorsItem from '../TheMenuColorsItem.vue'

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
  selected: {
    type: Boolean,
    default: false,
  },
  cursorStyle: {
    type: String,
    default: 'cursor-grab active:cursor-grabbing select-none',
  },
})
const emits = defineEmits(['handleDrag', 'handleSelect'])
const isEdit = ref(false)
function handleDrag(event) {
  emits('handleDrag', event)
}
function handleSelect() {
  emits('handleSelect')
}
function handleEdit(event) {
  isEdit.value = true
  event.target.children[0].focus()
  event.target.children[0].select()
}
function handleCancelEdit(event) {
  event.target.blur()
  isEdit.value = false
}
const label = ref(props.data.title)
</script>
