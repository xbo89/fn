<template>
  <Item
    v-for="item in data"
    :key="item.id"
    :data="item"
    @context="handleContextmenu"
  />
  <f-contextmenu ref="treeContextmenu">
    <f-contextmenu-item icon="file-open-outline-rounded" @onclick="onOpen">
      打开
    </f-contextmenu-item>
    <f-contextmenu-devide />
    <f-contextmenu-item icon="info-outline-rounded" @onclick="onInfo">
      显示简介
    </f-contextmenu-item>
    <f-contextmenu-item icon="text-select-end-rounded" @onclick="onRenameStart">
      重命名
    </f-contextmenu-item>
    <f-contextmenu-item icon="file-copy-outline" @onclick="onDuplicate">
      创建副本
    </f-contextmenu-item>
    <f-contextmenu-item
      icon="folder-open-outline-rounded"
      shortkey="Alt + a"
      @onclick="onFolder"
    >
      文件夹打开
    </f-contextmenu-item>
    <f-contextmenu-devide />
    <f-contextmenu-item icon="delete-outline-rounded" @onclick="onDelete">
      移除
    </f-contextmenu-item>
  </f-contextmenu>
</template>

<script setup>
import { provide, ref } from 'vue'
import Item from './item.vue'

const props = defineProps({
  data: { type: Object },
})
const emits = defineEmits([
  'onRename',
  'onOpen',
  'onInfo',
  'onDuplicate',
  'onFolder',
  'onDelete',
  'onCreate',
  'onMove',
])
const treeContextmenu = ref([])
const renameId = ref()
provide('renameId', renameId)

function handleContextmenu(ev, data) {
  treeContextmenu.value.data = data
  treeContextmenu.value.toggle(true)
  treeContextmenu.value.position({
    x: ev.clientX,
    y: ev.clientY,
  })
}

function createDocument(data) {
  emits('onCreate', data)
}
provide('create', { createDocument })
function onRenameStart(data) {
  renameId.value = data.id
}
function moveDocument(from, to) {
  emits('onMove', { from, to })
}
provide('move', { moveDocument })
function handleRename(data) {
  renameId.value = null
  emits('onRename', data)
}
provide('rename', { handleRename })

const onOpen = data => emits('onOpen', data)
const onFolder = data => emits('onFolder', data)
const onDuplicate = data => emits('onDuplicate', data)
const onInfo = data => emits('onInfo', data)
const onDelete = data => emits('onDelete', data)
</script>

<style></style>
