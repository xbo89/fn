<template>
  <ClientOnly fallback="Loading comments...">
    <VueFlow
      v-bind="flowOptions"
      @pane-click="onPaneClick"
      @pane-drag-start="onPaneDragStart"
      @pane-drag="onPaneDrag"
      @pane-drag-stop="onPaneDragStop"
      @node-select="onNodeSelect"
    >
      <template #node-flownote="props">
        <FlownoteNode v-bind="props" />
      </template>
      <Background />
    </VueFlow>
  </ClientOnly>
</template>

<script setup>
import { ref } from 'vue'
import { VueFlow } from '@vue-flow/core'
import { Background } from '@vue-flow/background'

const router = useRouter()
router.replace({ path: '/clips/inbox' })
const flowOptions = ref({
  nodes: [
    // 示例节点
    { id: '1', label: 'Node 1', position: { x: 0, y: 0 } },
    { id: '2', label: 'Node 2', position: { x: 100, y: 100 } },
    {
      id: '3',
      data: { label: 'Node 3' },
      // this will create the node-type `custom`
      type: 'flownote',
      position: { x: 50, y: 50 },
    },
  ],
  edges: [],
  zoomOnScroll: true,
  panOnDrag: false, // 默认关闭画布拖动
  selectNodesOnDrag: true, // 启用框选功能
  selectionKeyCode: true,
})
const spacePressed = ref(false)
function onNodeSelect(event) {
  console.log('Selected nodes:', event.nodes)
}

function handleKeyDown(event) {
  if (event.code === 'Space') {
    spacePressed.value = true
    flowOptions.value.panOnDrag = true
    flowOptions.value.selectionKeyCode = false
  }
}

function handleKeyUp(event) {
  if (event.code === 'Space') {
    spacePressed.value = false
    flowOptions.value.panOnDrag = false
    flowOptions.value.selectionKeyCode = true
  }
}

onMounted(() => {
  window.addEventListener('keydown', handleKeyDown)
  window.addEventListener('keyup', handleKeyUp)
})

onBeforeUnmount(() => {
  window.removeEventListener('keydown', handleKeyDown)
  window.removeEventListener('keyup', handleKeyUp)
})

function onPaneClick() {
  // 可在此处理画布点击事件
}

function onPaneDragStart() {
  if (spacePressed.value) {
    // 处理拖动开始
  }
}

function onPaneDrag() {
  if (spacePressed.value) {
    // 处理拖动中
  }
}

function onPaneDragStop() {
  if (spacePressed.value) {
    // 处理拖动停止
  }
}
</script>

<style>
/* import the necessary styles for Vue Flow to work */
@import '@vue-flow/core/dist/style.css';

/* import the default theme, this is optional but generally recommended */
@import '@vue-flow/core/dist/theme-default.css';
</style>
