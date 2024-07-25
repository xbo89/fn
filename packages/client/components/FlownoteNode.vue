<script setup>
import { Handle, Position } from '@vue-flow/core'
import { Writer } from '@floatnote/writer'
import '@floatnote/writer/dist/style.css'
import { NodeResizer } from '@vue-flow/node-resizer'
import '@vue-flow/node-resizer/dist/style.css'

// import CardEditor from './CardEditor.vue'
// props were passed from the slot using `v-bind="customNodeProps"`
// const props = defineProps(['label'])
</script>

<template>
  <NodeResizer min-width="100" min-height="30" />
  <div>
    <span>a</span>
    <div class="nodrag cursor-pointer">
      <Handle type="target" :position="Position.Left" />
      <UCard :ui="{ base: 'min-h-80 h-full', shadow: 'shadow-none', body: { padding: 'sm:p-4' } }">
        <Writer />
      </UCard>
      <Handle type="source" :position="Position.Right" />
    </div>
  </div>
</template>
