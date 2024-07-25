<template>
  <NodeResizer min-width="380" min-height="260" />

  <div class="note-container overflow-hidden relative bg-white border rounded-md min-h-[260px] h-full">
    <div class="note-header h-12 border-b w-full" />
    <Simplebar class="nodrag nowheel cursor-auto top-12 left-6 bottom-0 pr-6 right-0 pb-12" style="position:absolute">
      <Writer />
    </Simplebar>
  </div>

  <Handle type="target" :position="Position.Left" />
  <Handle type="source" :position="Position.Right" />
</template>

<script setup>
import Simplebar from 'simplebar-vue'
import { Handle, Position } from '@vue-flow/core'
import { Writer } from '@floatnote/writer'
import '@floatnote/writer/dist/style.css'
import { NodeResizer } from '@vue-flow/node-resizer'
import '@vue-flow/node-resizer/dist/style.css'
// import CardEditor from './CardEditor.vue'
// props were passed from the slot using `v-bind="customNodeProps"`
// const props = defineProps(['label'])
</script>

<style>
.note-container{
  @apply outline-offset-0 outline-2 outline-none hover:outline hover:outline-blue-200
}
.vue-flow__node.selected .note-container{
  @apply !outline !outline-offset-0 !outline-2 !outline-blue-600 ;
}
.vue-flow__resize-control.line{
  border-color: transparent!important;
  border-width: 4px;
}
.vue-flow__resize-control.handle{
  background-color: transparent!important;
  border-color: transparent!important;
}
</style>
