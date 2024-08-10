<template>
  <div
    draggable="true"
    class="pr-1 py-1 rounded-lg flex items-center text-sm w-full flex-1 relative  "
    :class="[
      isDragover && itemDirectionIndex === 0 ? 'bg-blue-50 outline-1 outline-dashed outline-blue-600 text-blue-800' : '',
      itemStartDrag ? '' : 'hover:bg-gray-100 active:bg-gray-200 ',
    ]"
    :style="{
      paddingLeft: `${levelRef === 1 ? 4 : (levelRef - 1) * 16 + 4}px`,
    }"
    @drag="itemDrag"
    @dragstart="itemDragstart"
    @dragover="itemDragover"
    @dragleave="itemDragleave"
    @drop="itemDrop"
    @mouseenter="mouseenter"
    @mouseleave="mouseleave"
    @dragend="itemDragend"
  >
    <div
      v-if="itemDirectionIndex === -1"
      class="helper h-0.5 inset-x-0 absolute bg-blue-600 -top-px pointer-events-none before:content-[' '] before:block before:size-2.5 before:rounded-full before:border-2 before:border-blue-600 before:absolute before:-left-2 before:-top-[3.5px]"
      :style="{ left: `${levelRef === 1 ? 4 : (levelRef - 1) * 16 + 4}px` }"
    />
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
      class="pl-1 truncate" :class="[itemStartDrag ? 'opacity-20' : 'opacity-100']"
      style="max-width: calc(100% - 3rem)"
    >
      {{ data.title }}{{ itemStartDrag }}
    </div>
    <div class="ml-auto flex items-center space-x-1 pr-1">
      <IconBtn
        v-show="isHover && !itemIsRename"
        icon="i-ri-add-line"
        @click.stop.prevent="addItem"
      />
    </div>
    <div v-if="(data.children.length > 0 || data.toggle === false) && itemDirectionIndex === 1 " class="helper h-0.5 inset-x-0 absolute bg-blue-600 -bottom-px pointer-events-none before:content-[' '] before:block before:size-2.5 before:rounded-full before:border-2 before:border-blue-600 before:absolute before:-left-2 before:-top-[3.5px]" :style="{ left: `${levelRef === 1 ? 4 : (levelRef - 1) * 16 + 4}px` }" />
  </div>

  <template v-if="data.toggle">
    <Item
      v-for="child in data.children"
      :key="child.id"
      :data="child"
      :tree-level="levelRef"
      @item-drag="emits('itemDrag')"
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
})

const emits = defineEmits([
  'itemDrag',
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
  itemStartDrag,
  isHover,
  itemDrag,
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
