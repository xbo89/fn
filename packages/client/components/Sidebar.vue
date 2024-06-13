<template>
  <div class="sidebar h-full border-r border-gray-200 dark:border-gray-800 flex-shrink-0 sm:w-48 md:w-60 lg:w-60 ">
    <div class="text-lg flex items-center justify-between h-12 px-6">
      <span>Float Note</span>
      <SidebarAvatar />
    </div>

    <div class="menus px-6 mt-2">
      <NuxtLink to="/nooooits/inbox">
        <div
          class="item rounded-lg px-3 py-1 flex items-center space-x-2.5 cursor-pointer hover:bg-gray-100 hover:dark:bg-gray-800">
          <i class="ri-inbox-fill text-xl"></i>
          <span>Zettelkasten</span>
        </div>
      </NuxtLink>
    </div>
  </div>
</template>
<script setup>
</script>