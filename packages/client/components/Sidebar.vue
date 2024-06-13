<template>
  <div class="sidebar h-full border-r border-gray-200 dark:border-gray-800 flex-shrink-0 w-60 ">
    <div class="text-lg flex items-center justify-between h-12 px-4">
      <span>Float Note</span>
      <SidebarAvatar />
    </div>

    <div class="menus px-2 mt-2">
      <NuxtLink to="/nooooits/inbox">
        <div class="item rounded-lg px-3 py-1 flex items-center space-x-1.5 cursor-pointer hover:bg-gray-100">
          <i class="ri-inbox-fill text-xl"></i>
          <span>Zettelkasten</span>
        </div>
      </NuxtLink>
    </div>
  </div>
</template>
<script setup>
</script>