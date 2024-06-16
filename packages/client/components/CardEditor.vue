<template>
  <div
    class="w-full h-full box-border border-r dark:border-gray-800 relative overflow-hidden min-w-[360px] bg-gray-50 dark:bg-gray-800/[.2]">

    <Simplebar class="inset-0 py-2 pb-56" style="position:absolute">
      <UContainer :ui="{
      base: 'mx-auto',
      padding: 'px-2 sm:px-2 md:px-2 lg:px-2',
      constrained: 'max-w-2xl',
    }">
        <UCard :ui="{base:'min-h-80',shadow:'shadow-none',body:{padding:'sm:p-4'}}">
          <Writer />
        </UCard>
      </UContainer>
    </Simplebar>
    <PromptToolbar />
  </div>

</template>
<script setup>
  import Simplebar from 'simplebar-vue';
  import { Writer } from '@floatnote/writer'
  import '@floatnote/writer/dist/style.css'
</script>