<template>
  <UTooltip text="Create new note card" :shortcuts="['⌘', 'n']" :popper="{ placement: 'bottom',strategy:'absolute' }">
    <UButton label="New Card" @click="isOpen = true" icon="ri-add-line" />
  </UTooltip>
  <UModal v-model="isOpen">
    <div
      class="sticky top-0 mx-2 px-2 py-4 bg-white dark:bg-gray-900 flex justify-between items-cente z-50 border-b border-gray-200 dark:border-gray-800 ">
      <span class="text-xl font-medium">New Card</span>
      <div class="flex space-x-1">
        <UButton icon="ri-more-2-line" size="sm" color="white" variant="solid" @click="isOpen = true" />
        <UButton label="Save" @click="isOpen = true" color="white" variant="solid" />
        <UButton label="Save & Close" @click="isOpen = true" />
      </div>
    </div>
    <UCard :ui="{ ring: '', divide: 'divide-y divide-gray-100 dark:divide-gray-800' ,base:'min-h-80'}">
      <Writer />
    </UCard>
  </UModal>

</template>
<script setup>
  import { Writer } from '@floatnote/writer'
  const isOpen = ref(false)
</script>