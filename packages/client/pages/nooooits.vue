<template>
  <div class="list w-full h-full bg-gray-100 flex">
    <Sidebar />
    <div class="w-full h-full">
      <NuxtPage />
    </div>
  </div>
</template>
<script setup>
  import {
    SplitterGroup, SplitterPanel, SplitterResizeHandle
  } from 'radix-vue'
  const user = await $fetch('/api-v1/auth/userinfo')
  console.log(user)
</script>