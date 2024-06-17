<template>
  <div
    class="border border-gray-100 rounded-lg px-2 py-1 flex items-center  mx-2 cursor-pointer justify-between hover:bg-gray-50 hover:dark:bg-gray-800 dark:border-gray-700"
    @click="isOpen = true">
    <div class="flex items-center gap-2">
      <UIcon name="i-ri-search-line text-gray-500"></UIcon>
      <span class="text-gray-400">search</span>
    </div>
    <div class="flex items-center gap-0.5">
      <UKbd>{{ metaSymbol }}</UKbd>
      <UKbd>K</UKbd>
    </div>
    <!-- <UButton icon="i-ri-search-line" size="xs" color="white" variant="solid" @click="isOpen = true" /> -->
  </div>
  <UModal v-model="isOpen">
    <UCommandPalette v-model="selected2" multiple nullable :groups="[{ key: 'people', commands: people2 }]" />
  </UModal>
</template>
<script setup>
  const { metaSymbol } = useShortcuts()
  defineShortcuts({
    meta_k: {
      usingInput: true,
      handler: () => {
        isOpen.value = !isOpen.value
      }
    }
  })
  const isOpen = ref(false)
  const selected2 = ref([])
  const people2 = [
    { id: 1, label: 'Wade Cooper' },
    { id: 2, label: 'Arlene Mccoy' },
    { id: 3, label: 'Devon Webb' },
    { id: 4, label: 'Tom Cook' },
    { id: 5, label: 'Tanya Fox' },
    { id: 6, label: 'Hellen Schmidt' },
    { id: 7, label: 'Caroline Schultz' },
    { id: 8, label: 'Mason Heaney' },
    { id: 9, label: 'Claudie Smitham' },
    { id: 10, label: 'Emil Schaefer' }
  ]
</script>