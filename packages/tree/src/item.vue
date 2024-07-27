<template>
  <div
    draggable="true"
    class="pr-1 py-1 rounded-lg flex items-center text-sm w-full flex-1 relative"
    :class="[
      false
        ? 'hover:bg-blue-200 text-blue-700 active:bg-blue-100 bg-blue-200 font-medium'
        : 'hover:bg-gray-100 active:bg-gray-200',
      isDragover ? 'bg-blue-300 text-blue-800' : '',
    ]"
    :style="{
      paddingLeft: `${levelRef === 1 ? 4 : (levelRef - 1) * 22}px`,
    }"
    @dragstart="itemDragstart"
    @dragover.stop="itemDragover"
    @dragleave="itemDragleave"
    @drop="itemDrop"
    @mouseenter="mouseenter"
    @mouseleave="mouseleave"
  >
    <IconBtn
      icon="i-ri-arrow-drop-right-line"
      :visibility="data.children.length > 0"
      :transparent="true"
      :rotate="data.toggle"
      @click.stop.prevent="itemFold"
    />
    <i class="i-ri-file-3-line" />
    <div
      v-if="!isRename"
      class="pl-1 truncate"
      style="max-width: calc(100% - 3rem)"
    >
      {{ data.title }}
    </div>
    <input
      v-else
      ref="target"
      v-model="inputValue"
      type="text"
      spellcheck="false"
      class="absolute right-2 rounded px-1 outline-blue-700 text-gray-9"
      :style="{
        left: `${levelRef === 1 ? 4 + 48 : (levelRef - 1) * 24 + 4 + 48}px`,
      }"
      @keydown.enter="handleEnter"
      @dragstart.stop.prevent
    >
    <div class="ml-auto flex items-center space-x-1 pr-1">
      <IconBtn
        v-show="isHover && !isRename"
        icon="i-ri-add-line"
        @click.stop.prevent="addItem"
      />
    </div>
  </div>

  <template v-if="data.toggle">
    <Item
      v-for="child in data.children"
      :key="child.id"
      :data="child"
      :tree-level="levelRef"
      @item-dragstart="emits('itemDragstart')"
      @item-dragover="emits('itemDragover')"
      @item-dragleave="emits('itemDragleave')"
      @item-drop="emits('itemDrop')"
      @item-fold="emits('itemFold', child.id)"
      @add-item="emits('addItem', child.id)"
    />
  </template>
</template>

<script setup>
import { computed, inject, ref } from 'vue'

import IconBtn from './iconBtn.vue'
import { useItemHover, useRename } from './useItem'

const props = defineProps({
  data: { type: Object },
  treeLevel: { type: Number, default: 0 },
})

const emits = defineEmits([
  'itemDragstart',
  'itemDragover',
  'itemDragleave',
  'itemDrop',
  'itemFold',
  'addItem',
])
function debounce(fn, delay) {
  let timeoutId
  return function (...args) {
    clearTimeout(timeoutId)
    timeoutId = setTimeout(() => {
      fn.apply(this, args)
    }, delay)
  }
}
const dragOverItemId = ref(null)
function itemDragstart(ev) {
  ev.dataTransfer.setData('text/plain', JSON.stringify(props.data))
  emits('itemDragstart')
}

function itemDragover(ev) {
  ev.preventDefault()
  dragOverItemId.value = props.data.id
  console.log(ev.target.offsetHeight, ev.offsetY)
  emits('itemDragover')
}

function itemDragleave(ev) {
  ev.preventDefault()
  dragOverItemId.value = null
  emits('itemDragleave')
}

function itemDrop(ev) {
  itemDragleave(ev)
  ev.preventDefault()
  const dragData = JSON.parse(ev.dataTransfer.getData('text/plain'))
  if (props.data.id === dragData.id)
    return
  console.log(dragData)
  emits('itemDrop')
}
function itemFold() {
  emits('itemFold', props.data.id)
}
function addItem() {
  emits('addItem', props.data.id)
}
const isDragover = computed(() => {
  return dragOverItemId.value === props.data.id
})

const levelRef = ref(props.treeLevel)
levelRef.value += 1

const target = ref(null)
const { isRename, inputValue, handleEnter } = useRename(target, props.data)
const { isHover, mouseenter, mouseleave } = useItemHover()
// const { createDocument } = inject('create')

// function handleContextmenu(ev, data) {
//   emits('context', ev, data)
// }
</script>

<style scoped></style>
