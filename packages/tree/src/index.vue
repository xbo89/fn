<template>
  <Item
    v-for="item in data"
    :key="item.id"
    :data="item"
    @item-drop="drop"
    @item-fold="fold"
    @add-item="add"
  />
  <!-- <f-contextmenu ref="treeContextmenu">
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
  </f-contextmenu> -->
</template>

<script setup>
import { provide, ref } from 'vue'
import { nanoid } from 'nanoid'
import Item from './item.vue'

defineProps({
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
const treeData = defineModel()

// const treeContextmenu = ref([])
const renameId = ref()
provide('renameId', renameId)
provide('create', { createDocument })
provide('rename', { handleRename })
provide('move', { moveDocument })

function drop({ from, to, dir }) {
  moveItem(treeData.value, from, to, dir)
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
// function handleContextmenu(ev, data) {
//   treeContextmenu.value.data = data
//   treeContextmenu.value.toggle(true)
//   treeContextmenu.value.position({
//     x: ev.clientX,
//     y: ev.clientY,
//   })
// }

// function onRenameStart(data) {
//   renameId.value = data.id
// }
function createDocument(data) {
  emits('onCreate', data)
}

function moveDocument(from, to) {
  emits('onMove', { from, to })
}

function handleRename(data) {
  renameId.value = null
  emits('onRename', data)
}

function moveItem(tree, source, target, index) {
  const obj = findById(tree, target.id)
  const deep = JSON.parse(JSON.stringify(source))
  deleteById(tree, source.id)
  if (index === 0) {
    obj.children.push(deep)
  }
  if (index === -1) {
    const parent = findParentById(tree, target.id)
    const i = findIndexById(tree, target.id)
    if (parent) {
      parent.splice(i + 1, 0, deep)
    }
    else {
      tree.splice(i + 1, 0, deep)
    }
  }
  if (index === 1) {
    const parent = findParentById(tree, target.id)
    const i = findIndexById(tree, target.id)
    if (parent) {
      parent.splice(i - 1, 0, deep)
    }
  }
  // console.log(obj)
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

function findParentById(array, id, parent = null) {
  for (const item of array) {
    if (item.id === id) {
      return parent // 找到对象，返回其父对象
    }
    if (item.children.length > 0) {
      const foundParent = findParentById(item.children, id, item)
      if (foundParent) {
        return foundParent // 如果在子级中找到，返回其父对象
      }
    }
  }
  return null // 如果未找到对象，返回 null
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
// const onOpen = data => emits('onOpen', data)
// const onFolder = data => emits('onFolder', data)
// const onDuplicate = data => emits('onDuplicate', data)
// const onInfo = data => emits('onInfo', data)
// const onDelete = data => emits('onDelete', data)
</script>

<style></style>
