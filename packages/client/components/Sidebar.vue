<template>
  <div
    class="border border-gray-200 dark:border-gray-800 flex-shrink-0 sm:w-52 md:w-52 lg:w-52 bg-white dark:bg-gray-900 rounded-lg"
  >
    <div class="text-xl flex items-center justify-between h-12 px-5">
      <span class="logo opacity-0">Cliption</span>
      <SidebarAvatar />
    </div>
    <CommandPalette />
    <div class="px-2 mt-3">
      <NuxtLink to="/clips/inbox">
        <div
          class="item rounded-lg px-3 py-1 flex items-center space-x-2.5 cursor-pointer hover:bg-gray-100 hover:dark:bg-gray-800"
        >
          <i class="i-ri-inbox-fill text-xl" />
          <span>Zettelkasten</span>
        </div>
      </NuxtLink>
    </div>
  </div>
</template>

<script setup>

</script>
