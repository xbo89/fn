<template>
  <div
    draggable="true"
    class="pr-1 py-1 rounded-lg flex items-center text-sm w-full flex-1 relative"
    :class="[
      false
        ? 'hover:bg-blue-200 text-blue-700 active:bg-blue-100 bg-blue-200 font-medium'
        : 'hover:bg-gray-100 active:bg-gray-200',
      isDragover && itemDirectionIndex === 0 ? 'bg-blue-300 text-blue-800' : '',
    ]"
    :style="{
      paddingLeft: `${levelRef === 1 ? 4 : (levelRef - 1) * 16 + 4}px`,
    }"
    @dragstart="itemDragstart"
    @dragover="itemDragover"
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
      @click.prevent.stop="itemFold"
    />
    <i class="i-ri-file-3-line text-gray-400" />
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
      @item-drop="childrenDrop"
      @item-fold="childrenFold"
      @add-item="childrenAdd"
    />
  </template>
</template>

<script setup>
import { computed, ref } from 'vue'

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

const dragStartItemId = ref(null)
const dragOverItemId = ref(null)
const itemDirectionIndex = ref(null)
const levelRef = ref(props.treeLevel)
levelRef.value += 1

function itemDragstart(ev) {
  ev.dataTransfer.setData('text/plain', JSON.stringify(props.data))
  dragStartItemId.value = props.data.id
  emits('itemDragstart')
}

function itemDragover(ev) {
  ev.preventDefault()

  const itemHeight = ev.target.offsetHeight
  const itemInnerPosY = ev.offsetY

  if (itemInnerPosY <= itemHeight * 0.25) {
    itemDirectionIndex.value = -1
  }
  if (itemInnerPosY > itemHeight * 0.25 && itemInnerPosY < itemHeight - itemHeight * 0.25) {
    itemDirectionIndex.value = 0
  }
  if (itemInnerPosY >= itemHeight - itemHeight * 0.25) {
    itemDirectionIndex.value = 1
  }

  dragOverItemId.value = props.data.id
  emits('itemDragover')
}

function itemDragleave(ev) {
  ev.preventDefault()
  emits('itemDragleave')
}

function itemDrop(ev) {
  ev.preventDefault()
  const dragData = JSON.parse(ev.dataTransfer.getData('text/plain'))
  if (props.data.id === dragData.id)
    return
  emits('itemDrop', { from: dragData, to: props.data, dir: itemDirectionIndex.value })
  dragOverItemId.value = null
  dragStartItemId.value = null
}

function childrenDrop({ from, to, dir }) {
  emits('itemDrop', { from, to, dir })
}
function childrenFold(id) {
  emits('itemFold', id)
}
function childrenAdd(id) {
  emits('addItem', id)
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

const target = ref(null)
const { isRename, inputValue, handleEnter } = useRename(target, props.data)
const { isHover, mouseenter, mouseleave } = useItemHover()
// const { createDocument } = inject('create')

// function handleContextmenu(ev, data) {
//   emits('context', ev, data)
// }
</script>

<style scoped></style>
