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
    @dragend="itemDragend"
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
      v-if="!itemIsRename"
      class="pl-1 truncate"
      style="max-width: calc(100% - 3rem)"
    >
      {{ data.title }}
    </div>
    <div class="ml-auto flex items-center space-x-1 pr-1">
      <IconBtn
        v-show="isHover && !itemIsRename"
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
import { useItem } from './useItem.js'
import IconBtn from './iconBtn.vue'

const props = defineProps({
  data: { type: Object },
  treeLevel: { type: Number, default: 0 },
  parentOffsetTop: { type: Number, default: 0 },
})

const emits = defineEmits([
  'itemDragstart',
  'itemDragover',
  'itemDragleave',
  'itemDragend',
  'itemDrop',
  'itemFold',
  'addItem',
])

const {
  levelRef,
  isDragover,
  itemIsRename,
  itemDirectionIndex,
  isHover,
  itemDragstart,
  itemDragover,
  itemDragleave,
  itemDrop,
  childrenDrop,
  childrenFold,
  childrenAdd,
  itemFold,
  itemDragend,
  addItem,
  mouseenter,
  mouseleave,
} = useItem(props, emits)
</script>
