<template>
  <a
    draggable="true"
    @dragstart="handleDragstart($event, data)"
    @dragover.stop="handleDragover($event, data)"
    @dragleave="handleDragleave($event, data)"
    @drop="handleDrop($event, data)"
  >
    <div
      class="pr-1 py-1 rounded-lg flex items-center text-sm w-full flex-1 relative"
      :class="[
        false
          ? ' hover:bg-blue-200 text-blue-700 active:bg-blue-100 bg-blue-200 font-medium'
          : 'hover:bg-gray-300 active:bg-gray-200',
        isDragover ? 'bg-purple-3 text-purple-8' : '',
      ]"
      :style="{
        paddingLeft: `${levelRef === 1 ? 4 : (levelRef - 1) * 24 + 4}px`,
      }"
      @mouseenter="mouseenter"
      @mouseleave="mouseleave"
      @contextmenu.prevent="handleContextmenu($event, data)"
    >
      <IconBtn
        icon="play-arrow-rounded"
        :visibility="data.children.length > 0"
        :transparent="true"
        size="15"
        :rotate="data.toggle"
        @click.stop.prevent="useItemFold(data)"
      />
      <IconBtn
        v-if="!false"
        icon="text-snippet-outline-rounded"
        :transparent="true"
      />
      <IconBtn v-else icon="text-snippet-rounded" :transparent="true" />
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
          icon="add"
          @click="createDocument(data)"
        />
        <div
          v-if="data.state === 1"
          class="w-2 h-2 rounded-full bg-violet-300"
        />
      </div>
    </div>
  </a>
  <Item
    v-for="child in data.children"
    v-if="data.toggle"
    :key="child.id"
    :data="child"
    :tree-level="levelRef"
    @context="handleContextmenu"
  />
</template>

<script setup>
import { inject, ref } from 'vue'

import IconBtn from './iconBtn.vue'
import { useDnd, useItemFold, useItemHover, useRename } from './useItem'

const props = defineProps({
  data: { type: Object },
  treeLevel: { type: Number, default: 0 },
})
const emits = defineEmits(['context'])

const target = ref(null)
const {
  isDragover,
  handleDragstart,
  handleDragover,
  handleDragleave,
  handleDrop,
} = useDnd(props.data)
const { isRename, inputValue, handleEnter } = useRename(target, props.data)
const { isHover, mouseenter, mouseleave } = useItemHover()
const { createDocument } = inject('create')

const levelRef = ref(props.treeLevel)
levelRef.value += 1

function handleContextmenu(ev, data) {
  emits('context', ev, data)
}
</script>

<style scoped></style>
