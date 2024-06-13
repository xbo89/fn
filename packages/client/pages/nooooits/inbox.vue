<template>
  <!-- <div class="w-full h-full relative overflow-hidden flex flex-col"> -->
  <div class="flex items-center w-full justify-between px-6 h-12 border-b border-gray-200 dark:border-gray-800">
    <h1 class="text-lg font-bold">Zettelkasten</h1>
    <div class="flex space-x-1">
      <UButton icon="ri-search-line" size="sm" color="gray" variant="solid" @click="isOpen = true" />
      <USelectMenu v-model="selected" :options="people" multiple placeholder="Filter">
        <template #leading>
          <i class="ri-filter-3-line"></i>
        </template>
      </USelectMenu>
      <USelectMenu v-model="selected" :options="people" multiple placeholder="Sort">
        <template #leading>
          <i class="ri-sort-alphabet-asc"></i>
        </template>
      </USelectMenu>
      <CreateCard />
    </div>
  </div>
  <Simplebar class="top-12 bottom-0 inset-x-0 " style="position:absolute">
    <div class="p-6 ">
      <div class="list grid md:grid-cols-2 lg:grid-cols-3 gap-1.5">
        <UCard v-for="(item,index) in 30" :key="index" :ui="{
        shadow: 'none',
        base:'min-h-40',
        body: {
          base:'cursor-pointer',
          padding: 'px-2 py-2 sm:p-2',
        },
        footer: {
          base: '',
          background: '',
          padding: 'px-2 py-2 sm:px-2',
        },
      }">

          as
          <template #footer>
            <UBadge color="gray" variant="solid">Badge</UBadge>
          </template>
        </UCard>
      </div>
    </div>
  </Simplebar>
  <!-- </div> -->
  <UModal v-model="isOpen">
    <UCommandPalette v-model="selected2" multiple nullable :groups="[{ key: 'people', commands: people2 }]" />
  </UModal>


</template>
<script setup>
  import Simplebar from 'simplebar-vue';
  import 'simplebar-vue/dist/simplebar.min.css';
  const people = ['Wade Cooper', 'Arlene Mccoy', 'Devon Webb', 'Tom Cook', 'Tanya Fox', 'Hellen Schmidt', 'Caroline Schultz', 'Mason Heaney', 'Claudie Smitham', 'Emil Schaefer']
  const selected = ref([])
  const isOpen = ref(false)

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

  const selected2 = ref([])
</script>