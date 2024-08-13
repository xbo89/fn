<template>
  <div
    ref="container"
    class="tree relative pt-0.5"
    @dragleave="containerDragleave"
    @drop="containerDrop"
  >
    <Item
      v-for="item in data"
      :key="item.id"
      :data="item"

      @add-item="add"
      @item-drop="drop"
      @item-fold="fold"
    />
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { nanoid } from 'nanoid'
import { deleteById, findById, findIndexById } from './utils'
import Item from './item.vue'

defineProps({
  data: { type: Object },
})

const treeData = defineModel()
const container = ref(null)

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
</script>

<style></style>
