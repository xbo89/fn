<template>
  <div
    class="flex items-center w-full justify-between px-6 h-12 z-10 absolute inset-x-0 backdrop-blur bg-white/60 dark:bg-gray-900/60">
    <h1 class="text-lg font-bold">Zettelkasten</h1>

    <div class="flex space-x-1">
      <UButton icon="ri-search-line" size="sm" color="white" variant="solid" @click="isOpen = true" />
      <USelectMenu v-model="selected" :options="people" multiple placeholder="Filter">
        <template #leading>
          <i class="ri-filter-3-line"></i>
        </template>
      </USelectMenu>
      <USelectMenu v-model="sortSelected" :options="sort" placeholder="Sort">
        <template #leading>
          <i class="ri-sort-alphabet-asc"></i>
        </template>
      </USelectMenu>

      <CreateCard />
    </div>
  </div>

  <Simplebar class="inset-0 top-12" style="position:absolute">
    <div class="px-6 py-3">
      <div class="list grid md:grid-cols-2 lg:grid-cols-3 gap-1.5">
        <UCard v-for="(item,index) in 30" :key="index" :ui="{
        shadow: 'shadow-none',
        base:'group',
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
          <div class="min-h-40">
            as
          </div>
          <template #footer>
            <div class="flex justify-between">
              <UBadge color="purple" variant="soft">Badge</UBadge>
              <UDropdown :items="items" :popper="{ placement: 'top-end' }">
                <UButton icon="ri-more-2-line" size="2xs" color="white" variant="solid"
                  class="ml-1 hidden group-hover:inline-flex" />
              </UDropdown>
            </div>
          </template>
        </UCard>
      </div>
    </div>
  </Simplebar>
  <UModal v-model="isOpen">
    <UCommandPalette v-model="selected2" multiple nullable :groups="[{ key: 'people', commands: people2 }]" />
  </UModal>


</template>
<script setup>
  import Simplebar from 'simplebar-vue';
  import 'simplebar-vue/dist/simplebar.min.css';
  const people = ['Wade Cooper', 'Arlene Mccoy', 'Devon Webb', 'Tom Cook', 'Tanya Fox', 'Hellen Schmidt', 'Caroline Schultz', 'Mason Heaney', 'Claudie Smitham', 'Emil Schaefer']
  const sort = ['Created Date', 'Updated Date']
  const sortSelected = ref(sort[0])
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
  const items = [

    [{
      label: 'Edit',
      icon: 'ri-edit-box-line'
    }, {
      label: 'Duplicate',
      icon: 'ri-file-copy-line'
    }],
    [{
      label: 'Generate Share Image',
      icon: 'ri-share-line'
    }],
    [{
      label: 'Delete',
      icon: 'ri-delete-bin-line',
      class: 'group/delete hover:text-red-500 hover:bg-red-100 hover:dark:bg-red-900',
      iconClass: 'group-hover/delete:text-red-500 group-hover/delete:dark:text-white'
    }]
  ]
  const selected2 = ref([])
</script>