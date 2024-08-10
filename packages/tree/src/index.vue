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
      :parent-offset-top="offsetTop"
      @add-item="add"
      @item-drop="drop"
      @item-fold="fold"
      @item-dragover="dragover"
    />
    <div
      v-if="helperState"
      :style="{ top: `${posTop}px`, left: `${posLeft}px` }"
      class="pos-helper absolute h-px bg-slate-600 inset-x-0 h-0.5"
    />
  </div>
</template>

<script setup>
import { onMounted, ref } from 'vue'
import { nanoid } from 'nanoid'
import { deleteById, findById, findIndexById } from './utils'
import Item from './item.vue'

defineProps({
  data: { type: Object },
})

const treeData = defineModel()
const posTop = ref(null)
const posLeft = ref(null)
const helperState = ref(false)
const container = ref(null)
const offsetTop = ref(0)
onMounted(() => {
  offsetTop.value = container.value.offsetTop
})
/**
 * tree container 相关 Event
 */
// let timer = null
function showHelper() {
  // clearTimeout(timer)
  // timer = setTimeout(() => {
  //   helperState.value = true
  // }, 400)
  helperState.value = true
}
function hideHelper() {
  // clearTimeout(timer)
  // timer = setTimeout(() => {
  //   helperState.value = false
  // }, 400)
  helperState.value = false
}

document.addEventListener('dragstart', (event) => {
  showHelper()
  offsetTop.value = container.value.offsetTop
})

function containerDragleave() {
  hideHelper()
}
function containerDrop() {
  hideHelper()
  offsetTop.value = 0
}
/**
 * item 相关 Event
 */
function dragover({ helperPosTop, helperPosLeft }) {
  posTop.value = helperPosTop
  console.log(helperPosTop)
  // eslint-disable-next-line ts/no-unused-expressions
  helperPosTop ? showHelper() : hideHelper()
  posLeft.value = helperPosLeft
}

function drop({ from, to, dir }) {
  moveItem(treeData.value, from, to, dir)
  hideHelper()
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
