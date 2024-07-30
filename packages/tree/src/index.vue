<template>
  <div class="tree relative">
    <Item
      v-for="item in data"
      :key="item.id"
      :data="item"
      @item-drop="drop"
      @item-fold="fold"
      @add-item="add"
      @item-dragstart="dragstart"
      @item-dragover="dragover"
    />
    <div v-show="showHelper" class="pos-helper absolute h-px bg-slate-600 inset-x-0" :style="{ top: `${posTop}px`, left: `${posLeft}px` }" />
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { nanoid } from 'nanoid'
import Item from './item.vue'

defineProps({
  data: { type: Object },
})

// const emits = defineEmits([
//   'onRename',
//   'onOpen',
//   'onInfo',
//   'onDuplicate',
//   'onFolder',
//   'onDelete',
//   'onCreate',
//   'onMove',
// ])
const treeData = defineModel()
const posTop = ref(null)
const posLeft = ref(null)
const showHelper = ref(false)

// const renameId = ref()
// provide('renameId', renameId)
// provide('create', { createDocument })
// provide('rename', { handleRename })
// provide('move', { moveDocument })
function dragstart() {
  showHelper.value = true
}
function dragover({ helperPosTop, helperPosLeft }) {
  posTop.value = helperPosTop
  posLeft.value = helperPosLeft
}
function drop({ from, to, dir }) {
  moveItem(treeData.value, from, to, dir)
  showHelper.value = false
}

function fold(id) {
  const obj = findById(treeData.value, id)
  obj.toggle = !obj.toggle
}

function add(id) {
  const obj = findById(treeData.value, id)
  obj.toggle = true
  obj.children.unshift({
    id: nanoid(),
    title: `Untitled_${nanoid(6)}`,
    toggle: false,
    children: [],
  })
}

// function createDocument(data) {
//   emits('onCreate', data)
// }

// function moveDocument(from, to) {
//   emits('onMove', { from, to })
// }

// function handleRename(data) {
//   renameId.value = null
//   emits('onRename', data)
// }

function moveItem(tree, source, target, index) {
  const obj = findById(tree, target.id)
  const deep = JSON.parse(JSON.stringify(source))
  deleteById(tree, source.id)
  if (index === 0) {
    obj.children.push(deep)
  }
  if (index === -1) {
    const { index, parent } = findIndexById(tree, target.id)
    if (parent) {
      parent.children.splice(index, 0, deep)
    }
    else {
      // 根目录
      tree.splice(index, 0, deep)
    }
  }
  if (index === 1) {
    const { index, parent } = findIndexById(tree, target.id)
    if (parent) {
      parent.children.splice(index + 1, 0, deep)
    }
    else {
      // 根目录
      tree.splice(index + 1, 0, deep)
    }
  }
}
function findIndexById(array, id, parent = null) {
  for (let i = 0; i < array.length; i++) {
    if (array[i].id === id) {
      return parent ? i : { index: i, parent: null } // 返回索引及父对象
    }
    if (array[i].children.length > 0) {
      const result = findIndexById(array[i].children, id, array[i])
      if (result !== null) {
        return parent ? result : { index: i, parent: array[i] } // 如果找到返回索引及父对象
      }
    }
  }
  return null // 如果未找到，返回 null
}

function findById(array, id) {
  for (const item of array) {
    if (item.id === id) {
      return item
    }
    if (item.children.length > 0) {
      const found = findById(item.children, id)
      if (found) {
        return found
      }
    }
  }
  return null // 如果没有找到匹配的对象，返回 null
}

function deleteById(array, id) {
  for (let i = 0; i < array.length; i++) {
    if (array[i].id === id) {
      array.splice(i, 1)
      return true // 找到并删除对象后返回 true
    }
    if (array[i].children.length > 0) {
      const deleted = deleteById(array[i].children, id)
      if (deleted) {
        return true // 如果在子级中找到并删除对象，返回 true
      }
    }
  }
  return false // 如果未找到对象，返回 false
}
</script>

<style></style>
