<template>
  <div class="w-full px-2 py-2 border-b dark:border-gray-800 ">
    <div class="flex space-x-2 items-center">
      <FeedViewManage />

      <div class="w-px h-4 bg-gray-300 dark:bg-gray-600" />

      <div class="flex space-x-1">
        <UPopover :popper="{ placement: 'bottom',strategy:'absolute',offsetDistance: 4}">
          <UButton icon="i-ri-filter-line" size="sm" color="white" variant="solid" />
          <template #panel>
            <FeedFilter />
          </template>
        </UPopover>
        <UPopover :popper="{ placement: 'bottom',strategy:'absolute',offsetDistance: 4}">
          <UButton icon="i-ri-sort-alphabet-asc" size="sm" color="white" variant="solid" />
          <template #panel>
            <FeedSorter />
          </template>
        </UPopover>
      </div>
      <div class="w-px h-4 bg-gray-300 dark:bg-gray-600" />
      <UTooltip text="Save Current View" :shortcuts="['⌘', 'Enter']" :popper="{ placement: 'top',strategy:'absolute' }">
        <UButton label="Save" variant="solid" color="white" icon="i-ri-save-2-line" />
      </UTooltip>
      <UTooltip text="Create new note card" :shortcuts="['⌘', 'Enter']"
        :popper="{ placement: 'top',strategy:'absolute' }">
        <UButton label="New Card" variant="soft" icon="i-ri-add-line" />
      </UTooltip>
    </div>
  </div>

  <Simplebar class="inset-x-0 top-[50px] bottom-0 " style="position:absolute">
    <div class="px-2 py-3">

      <div class="list grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-1.5">
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



</template>
<script setup>
  import Simplebar from 'simplebar-vue';

  const tabitems = [{
    label: 'Tab1',
  }, {
    label: 'Tab2',
  }]


  const items = [

    [{
      label: 'Edit',
      icon: 'i-ri-edit-box-fill'
    }, {
      label: 'Duplicate',
      icon: 'i-ri-file-copy-fill'
    }],
    [{
      label: 'Generate Share Image',
      icon: 'i-ri-share-fill'
    }],
    [{
      label: 'Delete',
      icon: 'i-ri-delete-bin-fill',
      class: 'group/delete hover:text-red-500 hover:bg-red-100 hover:dark:bg-red-900',
      iconClass: 'group-hover/delete:text-red-500 group-hover/delete:dark:text-white'
    }]
  ]

</script>