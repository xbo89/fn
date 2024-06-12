<template>
  <UButton label="New Card" @click="isOpen = true" icon="ri-add-line" />

  <UModal v-model="isOpen">
    <UCard :ui="{ ring: '', divide: 'divide-y divide-gray-100 dark:divide-gray-800' }">
      <template #header>
        New Card
      </template>

      <!-- <Placeholder class="h-32" /> -->
      <Writer />

      <template #footer>
        <Placeholder class="h-8" />
      </template>
    </UCard>
  </UModal>

</template>
<script setup>
  import { Writer } from '@floatnote/writer'
  const isOpen = ref(false)
</script>