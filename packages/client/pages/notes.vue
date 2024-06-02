<template>
  <div class="list w-full h-full bg-gray-100 flex">
    <Sidebar />
    <div class="w-full h-full">
      <NuxtPage />
    </div>
  </div>
</template>
<script setup>
  const { data: { user, error } } = await $fetch('/api-v1/auth/islogin')
  console.log(user)
</script>