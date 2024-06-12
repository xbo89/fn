<template>
  <div class="flex items-center w-full justify-between px-6 h-12 border-b">
    <h1 class="text-lg font-bold">Zettelkasten</h1>
    <Writer />
    <!-- <VMenu>
      <button>Documentation</button>

      <template #popper>
        <button>Guide</button>
        <button>API Reference</button>
      </template>
    </VMenu> -->
    <div class="flex space-x-1">
      <InboxFilter />
      <CreateCard />
    </div>
  </div>
  <Writer />
  <!-- <ScrollAreaRoot class="absolute top-12 bottom-0 inset-x-0" style="position: absolute;">
    <ScrollAreaViewport class="w-full h-full">
      <div class="list grid md:grid-cols-2 lg:grid-cols-3 gap-1.5 px-6 py-4">
        <CardItem v-for="(item,index) in data" :key="index" :data="item">
          {{item}}
        </CardItem>
      </div>
    </ScrollAreaViewport>
    <ScrollAreaScrollbar
      class="flex select-none touch-none p-0.5 data-[orientation=vertical]:w-2.5 data-[orientation=horizontal]:flex-col data-[orientation=horizontal]:h-2.5"
      orientation="vertical">
      <ScrollAreaThumb
        class="flex-1 bg-gray-400 rounded-[10px] relative before:content-[''] before:absolute before:top-1/2 before:left-1/2 before:-translate-x-1/2 before:-translate-y-1/2 before:w-full before:h-full before:min-w-[44px] before:min-h-[44px]" />
    </ScrollAreaScrollbar>
  </ScrollAreaRoot> -->


</template>
<script setup>
  import { Writer } from '@floatnote/writer'
  import { ScrollAreaRoot, ScrollAreaScrollbar, ScrollAreaThumb, ScrollAreaViewport } from 'radix-vue'
  const data = ref([
    {
      "id": "12345",
      "title": "社会影响力与从众行为",
      "content": "研究社会影响力的机制以及从众行为的表现和影响。",
      "tags": ["社会学", "心理学", "行为"],
      "created_date": "2024-06-09",
      "last_modified_date": "2024-06-10",
      "schema": "需要进一步探讨社会影响力与个体心理的互动机制。",
      "color": 'blue'
    },
    {
      "id": "12345",
      "title": "社会影响力与从众行为",
      "content": "研究社会影响力的机制以及从众行为的表现和影响。",
      "tags": ["社会学", "心理学", "行为"],
      "created_date": "2024-06-09",
      "last_modified_date": "2024-06-10",
      "schema": "需要进一步探讨社会影响力与个体心理的互动机制。",
      "color": 'yellow'
    },
    {
      "id": "12345",
      "title": "社会影响力与从众行为",
      "content": "研究社会影响力的机制以及从众行为的表现和影响。",
      "tags": ["社会学", "心理学", "行为"],
      "created_date": "2024-06-09",
      "last_modified_date": "2024-06-10",
      "schema": "需要进一步探讨社会影响力与个体心理的互动机制。",
      "color": 'blue'
    }, {
      "id": "12345",
      "title": "社会影响力与从众行为",
      "content": "研究社会影响力的机制以及从众行为的表现和影响。",
      "tags": ["社会学", "心理学", "行为"],
      "created_date": "2024-06-09",
      "last_modified_date": "2024-06-10",
      "schema": "需要进一步探讨社会影响力与个体心理的互动机制。",
      "color": 'blue'
    },
    {
      "id": "12345",
      "title": "社会影响力与从众行为",
      "content": "研究社会影响力的机制以及从众行为的表现和影响。",
      "tags": ["社会学", "心理学", "行为"],
      "created_date": "2024-06-09",
      "last_modified_date": "2024-06-10",
      "schema": "需要进一步探讨社会影响力与个体心理的互动机制。",
      "color": 'yellow'
    },
    {
      "id": "12345",
      "title": "社会影响力与从众行为",
      "content": "研究社会影响力的机制以及从众行为的表现和影响。",
      "tags": ["社会学", "心理学", "行为"],
      "created_date": "2024-06-09",
      "last_modified_date": "2024-06-10",
      "schema": "需要进一步探讨社会影响力与个体心理的互动机制。",
      "color": 'blue'
    }, {
      "id": "12345",
      "title": "社会影响力与从众行为",
      "content": "研究社会影响力的机制以及从众行为的表现和影响。",
      "tags": ["社会学", "心理学", "行为"],
      "created_date": "2024-06-09",
      "last_modified_date": "2024-06-10",
      "schema": "需要进一步探讨社会影响力与个体心理的互动机制。",
      "color": 'blue'
    },
    {
      "id": "12345",
      "title": "社会影响力与从众行为",
      "content": "研究社会影响力的机制以及从众行为的表现和影响。",
      "tags": ["社会学", "心理学", "行为"],
      "created_date": "2024-06-09",
      "last_modified_date": "2024-06-10",
      "schema": "需要进一步探讨社会影响力与个体心理的互动机制。",
      "color": 'yellow'
    },
    {
      "id": "12345",
      "title": "社会影响力与从众行为",
      "content": "研究社会影响力的机制以及从众行为的表现和影响。",
      "tags": ["社会学", "心理学", "行为"],
      "created_date": "2024-06-09",
      "last_modified_date": "2024-06-10",
      "schema": "需要进一步探讨社会影响力与个体心理的互动机制。",
      "color": 'blue'
    }, {
      "id": "12345",
      "title": "社会影响力与从众行为",
      "content": "研究社会影响力的机制以及从众行为的表现和影响。",
      "tags": ["社会学", "心理学", "行为"],
      "created_date": "2024-06-09",
      "last_modified_date": "2024-06-10",
      "schema": "需要进一步探讨社会影响力与个体心理的互动机制。",
      "color": 'blue'
    },
    {
      "id": "12345",
      "title": "社会影响力与从众行为",
      "content": "研究社会影响力的机制以及从众行为的表现和影响。",
      "tags": ["社会学", "心理学", "行为"],
      "created_date": "2024-06-09",
      "last_modified_date": "2024-06-10",
      "schema": "需要进一步探讨社会影响力与个体心理的互动机制。",
      "color": 'yellow'
    },
    {
      "id": "12345",
      "title": "社会影响力与从众行为",
      "content": "研究社会影响力的机制以及从众行为的表现和影响。",
      "tags": ["社会学", "心理学", "行为"],
      "created_date": "2024-06-09",
      "last_modified_date": "2024-06-10",
      "schema": "需要进一步探讨社会影响力与个体心理的互动机制。",
      "color": 'blue'
    }, {
      "id": "12345",
      "title": "社会影响力与从众行为",
      "content": "研究社会影响力的机制以及从众行为的表现和影响。",
      "tags": ["社会学", "心理学", "行为"],
      "created_date": "2024-06-09",
      "last_modified_date": "2024-06-10",
      "schema": "需要进一步探讨社会影响力与个体心理的互动机制。",
      "color": 'blue'
    },
    {
      "id": "12345",
      "title": "社会影响力与从众行为",
      "content": "研究社会影响力的机制以及从众行为的表现和影响。",
      "tags": ["社会学", "心理学", "行为"],
      "created_date": "2024-06-09",
      "last_modified_date": "2024-06-10",
      "schema": "需要进一步探讨社会影响力与个体心理的互动机制。",
      "color": 'yellow'
    },
    {
      "id": "12345",
      "title": "社会影响力与从众行为",
      "content": "研究社会影响力的机制以及从众行为的表现和影响。",
      "tags": ["社会学", "心理学", "行为"],
      "created_date": "2024-06-09",
      "last_modified_date": "2024-06-10",
      "schema": "需要进一步探讨社会影响力与个体心理的互动机制。",
      "color": 'blue'
    }, {
      "id": "12345",
      "title": "社会影响力与从众行为",
      "content": "研究社会影响力的机制以及从众行为的表现和影响。",
      "tags": ["社会学", "心理学", "行为"],
      "created_date": "2024-06-09",
      "last_modified_date": "2024-06-10",
      "schema": "需要进一步探讨社会影响力与个体心理的互动机制。",
      "color": 'blue'
    },
    {
      "id": "12345",
      "title": "社会影响力与从众行为",
      "content": "研究社会影响力的机制以及从众行为的表现和影响。",
      "tags": ["社会学", "心理学", "行为"],
      "created_date": "2024-06-09",
      "last_modified_date": "2024-06-10",
      "schema": "需要进一步探讨社会影响力与个体心理的互动机制。",
      "color": 'yellow'
    },
    {
      "id": "12345",
      "title": "社会影响力与从众行为",
      "content": "研究社会影响力的机制以及从众行为的表现和影响。",
      "tags": ["社会学", "心理学", "行为"],
      "created_date": "2024-06-09",
      "last_modified_date": "2024-06-10",
      "schema": "需要进一步探讨社会影响力与个体心理的互动机制。",
      "color": 'blue'
    }, {
      "id": "12345",
      "title": "社会影响力与从众行为",
      "content": "研究社会影响力的机制以及从众行为的表现和影响。",
      "tags": ["社会学", "心理学", "行为"],
      "created_date": "2024-06-09",
      "last_modified_date": "2024-06-10",
      "schema": "需要进一步探讨社会影响力与个体心理的互动机制。",
      "color": 'blue'
    },
    {
      "id": "12345",
      "title": "社会影响力与从众行为",
      "content": "研究社会影响力的机制以及从众行为的表现和影响。",
      "tags": ["社会学", "心理学", "行为"],
      "created_date": "2024-06-09",
      "last_modified_date": "2024-06-10",
      "schema": "需要进一步探讨社会影响力与个体心理的互动机制。",
      "color": 'yellow'
    },
    {
      "id": "12345",
      "title": "社会影响力与从众行为",
      "content": "研究社会影响力的机制以及从众行为的表现和影响。",
      "tags": ["社会学", "心理学", "行为"],
      "created_date": "2024-06-09",
      "last_modified_date": "2024-06-10",
      "schema": "需要进一步探讨社会影响力与个体心理的互动机制。",
      "color": 'blue'
    }, {
      "id": "12345",
      "title": "社会影响力与从众行为",
      "content": "研究社会影响力的机制以及从众行为的表现和影响。",
      "tags": ["社会学", "心理学", "行为"],
      "created_date": "2024-06-09",
      "last_modified_date": "2024-06-10",
      "schema": "需要进一步探讨社会影响力与个体心理的互动机制。",
      "color": 'blue'
    },
    {
      "id": "12345",
      "title": "社会影响力与从众行为",
      "content": "研究社会影响力的机制以及从众行为的表现和影响。",
      "tags": ["社会学", "心理学", "行为"],
      "created_date": "2024-06-09",
      "last_modified_date": "2024-06-10",
      "schema": "需要进一步探讨社会影响力与个体心理的互动机制。",
      "color": 'yellow'
    },
    {
      "id": "12345",
      "title": "社会影响力与从众行为",
      "content": "研究社会影响力的机制以及从众行为的表现和影响。",
      "tags": ["社会学", "心理学", "行为"],
      "created_date": "2024-06-09",
      "last_modified_date": "2024-06-10",
      "schema": "需要进一步探讨社会影响力与个体心理的互动机制。",
      "color": 'blue'
    }, {
      "id": "12345",
      "title": "社会影响力与从众行为",
      "content": "研究社会影响力的机制以及从众行为的表现和影响。",
      "tags": ["社会学", "心理学", "行为"],
      "created_date": "2024-06-09",
      "last_modified_date": "2024-06-10",
      "schema": "需要进一步探讨社会影响力与个体心理的互动机制。",
      "color": 'blue'
    },
    {
      "id": "12345",
      "title": "社会影响力与从众行为",
      "content": "研究社会影响力的机制以及从众行为的表现和影响。",
      "tags": ["社会学", "心理学", "行为"],
      "created_date": "2024-06-09",
      "last_modified_date": "2024-06-10",
      "schema": "需要进一步探讨社会影响力与个体心理的互动机制。",
      "color": 'yellow'
    },
    {
      "id": "12345",
      "title": "社会影响力与从众行为",
      "content": "研究社会影响力的机制以及从众行为的表现和影响。",
      "tags": ["社会学", "心理学", "行为"],
      "created_date": "2024-06-09",
      "last_modified_date": "2024-06-10",
      "schema": "需要进一步探讨社会影响力与个体心理的互动机制。",
      "color": 'blue'
    }, {
      "id": "12345",
      "title": "社会影响力与从众行为",
      "content": "研究社会影响力的机制以及从众行为的表现和影响。",
      "tags": ["社会学", "心理学", "行为"],
      "created_date": "2024-06-09",
      "last_modified_date": "2024-06-10",
      "schema": "需要进一步探讨社会影响力与个体心理的互动机制。",
      "color": 'blue'
    },
    {
      "id": "12345",
      "title": "社会影响力与从众行为",
      "content": "研究社会影响力的机制以及从众行为的表现和影响。",
      "tags": ["社会学", "心理学", "行为"],
      "created_date": "2024-06-09",
      "last_modified_date": "2024-06-10",
      "schema": "需要进一步探讨社会影响力与个体心理的互动机制。",
      "color": 'yellow'
    },
    {
      "id": "12345",
      "title": "社会影响力与从众行为",
      "content": "研究社会影响力的机制以及从众行为的表现和影响。",
      "tags": ["社会学", "心理学", "行为"],
      "created_date": "2024-06-09",
      "last_modified_date": "2024-06-10",
      "schema": "需要进一步探讨社会影响力与个体心理的互动机制。",
      "color": 'blue'
    },
  ])
</script>