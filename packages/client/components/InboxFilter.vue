<script setup lang="ts">
  import { ref } from 'vue'
  import { ComboboxAnchor, ComboboxContent, ComboboxEmpty, ComboboxGroup, ComboboxInput, ComboboxItem, ComboboxItemIndicator, ComboboxLabel, ComboboxRoot, ComboboxSeparator, ComboboxTrigger, ComboboxViewport, ComboboxCancel } from 'radix-vue'

  const v = ref([])
  const options = ['Apple', 'Banana', 'Blueberry', 'Grapes', 'Pineapple']
  const vegetables = ['Aubergine', 'Broccoli', 'Carrot', 'Courgette', 'Leek']
  const people = [
    { id: 1, name: 'Durward Reynolds' },
    { id: 2, name: 'Kenton Towne' },
    { id: 3, name: 'Therese Wunsch' },
    { id: 4, name: 'Benedict Kessler' },
    { id: 5, name: 'Katelyn Rohan' },
  ]
  const selectedPeople = ref([people[0], people[1]])
</script>

<template>
  <ComboboxRoot v-model="selectedPeople" class="relative" multiple>
    <ComboboxAnchor
      class="border rounded-lg px-4 p-1 font-medium cursor-pointer flex items-center space-x-2 hover:bg-gray-100 text-sm bg-white">
      <ComboboxInput class="!bg-transparent outline-none" placeholder="Filter" />
      <ComboboxTrigger>
        <i class="ri-arrow-down-s-line"></i>
      </ComboboxTrigger>
      <ComboboxCancel><i class="ri-arrow-down-s-line"></i></ComboboxCancel>
    </ComboboxAnchor>

    <ComboboxContent class="border absolute right-0 z-10 min-w-60 mt-px  bg-white overflow-hidden rounded-lg ">
      <ComboboxViewport class="p-1">
        <ComboboxEmpty class="text-xs font-medium text-center py-2" />
        <ComboboxGroup>
          <ComboboxLabel class="px-6 text-xs text-gray-400">
            Fruits
          </ComboboxLabel>

          <ComboboxItem v-for="(option, index) in people" :key="index"
            class="text-sm px-6 py-1 hover:bg-gray-100 rounded-lg cursor-pointer" :value="option">
            <ComboboxItemIndicator class="absolute left-3">
              <i class="ri-check-line"></i>
            </ComboboxItemIndicator>
            <span>
              {{ option.name }}
            </span>
          </ComboboxItem>
        </ComboboxGroup>
        <ComboboxSeparator class="h-px bg-gray-200 my-2" />
        <ComboboxGroup>
          <ComboboxLabel class="px-6 text-xs text-gray-400">
            Vegetables
          </ComboboxLabel>
          <ComboboxItem v-for="(option, index) in vegetables" :key="index"
            class="text-sm px-6 py-1 hover:bg-gray-100 rounded-lg cursor-pointer" :value="option">
            <ComboboxItemIndicator class="absolute left-0 w-[25px] inline-flex items-center justify-center">
              <i class="ri-check-line"></i>
            </ComboboxItemIndicator>
            <span>
              {{ option }}
            </span>
          </ComboboxItem>
        </ComboboxGroup>
      </ComboboxViewport>
    </ComboboxContent>
  </ComboboxRoot>
</template>