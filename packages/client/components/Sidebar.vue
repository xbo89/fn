<template>
  <div class="h-full border-r border-gray-200 dark:border-gray-800 flex-shrink-0 sm:w-52 md:w-52 lg:w-52 ">
    <div class="text-xl flex items-center justify-between h-12 px-5">
      <span class="logo">Cliption</span>
      <UButton icon="i-ri-search-line" size="xs" color="white" variant="solid" @click="isOpen = true" />
      <SidebarAvatar />
    </div>
    <div class="px-2 mt-3">
      <NuxtLink to="/clips/inbox">
        <div
          class="item rounded-lg px-3 py-1 flex items-center space-x-2.5 cursor-pointer hover:bg-gray-100 hover:dark:bg-gray-800">
          <i class="i-ri-inbox-fill text-xl"></i>
          <span>Zettelkasten</span>
        </div>
      </NuxtLink>
    </div>
  </div>
  <UModal v-model="isOpen">
    <UCommandPalette v-model="selected2" multiple nullable :groups="[{ key: 'people', commands: people2 }]" />
  </UModal>
</template>
<script setup>
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